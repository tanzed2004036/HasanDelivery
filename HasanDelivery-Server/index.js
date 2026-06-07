const express = require("express");
const cors = require("cors");

require("dotenv").config();
//stripe API
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();

const port = process.env.PORT || 3000;

//firebase service center
const admin = require("firebase-admin");

// const serviceAccount = require("./hasvery--firebase-adminsdk.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
serviceAccount.private_key =
  serviceAccount.private_key.replace(/\\n/g, "\n");

// const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
// const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// middleware
app.use(cors());
app.use(express.json());

// tokwn verification middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
};

// Tracking ID generation function
function generateTrackingId() {
  const prefix = "HAS";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
}

// mongodb connection

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@clusterone.z9ed22c.mongodb.net/?appName=ClusterOne`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const myDB = client.db("HasVery_DB"); //Database
    const parcelsCollection = myDB.collection("parcels");
    const paymentsCollection = myDB.collection("payemnts");
    const usersCollection = myDB.collection("users");
    const ridersCollection = myDB.collection("riders");
    const trackingsCollection = myDB.collection("trackings");

    // admin verification middleware
    const verifyAdmin = async (req, res, next) => {
      try {
        const email = req.decoded.email;

        const user = await usersCollection.findOne({ email });

        if (!user || user.role !== "admin") {
          return res.status(403).send({
            message: "Forbidden Access",
          });
        }

        next();
      } catch (error) {
        return res.status(500).send({
          message: "Internal Server Error",
        });
      }
    };
    // rider verification middleware
    const verifyRider = async (req, res, next) => {
      try {
        const email = req.decoded.email;

        const user = await usersCollection.findOne({ email });

        if (!user || user.role !== "rider") {
          return res.status(403).send({
            message: "Forbidden Access",
          });
        }

        next();
      } catch (error) {
        return res.status(500).send({
          message: "Internal Server Error",
        });
      }
    };

    // tracking
    const logTracking = async (trackingId, status) => {
      const log = {
        trackingId,
        status,
        details: status.split("_").join(" "),
        createdAt: new Date(),
      };
      const result = await trackingsCollection.insertOne(log);
      return result;
    };

    // rider related API
    app.post("/riders", async (req, res) => {
      const newRider = req.body;
      newRider.status = "pending";
      newRider.createdAt = new Date();
      const result = await ridersCollection.insertOne(newRider);
      res.send(result);
    });

    app.get("/riders", async (req, res) => {
      const { status, region, workingStatus } = req.query;
      const query = {};
      if (req.query.status) {
        query.status = status;
      }
      if (req.query.region) {
        query.region = region;
      }
      if (req.query.workingStatus) {
        query.workingStatus = workingStatus;
      }
      const result = await ridersCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });

    app.patch("/riders/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
          workingStatus: "available",
        },
      };
      const result = await ridersCollection.updateOne(query, updateDoc);

      if (status === "approved") {
        const email = req.body.email;
        const userQuery = { email };
        const updateUserDoc = {
          $set: {
            role: "rider",
          },
        };
        await usersCollection.updateOne(userQuery, updateUserDoc);
      }
      res.send(result);
    });

    app.delete("/riders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ridersCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/riders/delivery-per-day", async (req, res) => {
      const email = req.query.email;

      const pipeline = [
        {
          $match: {
            riderEmail: email,
            deliveryStatus: "parcel_delivered",
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$atCreated" },
              month: { $month: "$atCreated" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.month": 1, "_id.day": 1 },
        },
      ];

      const result = await parcelsCollection.aggregate(pipeline).toArray();
      res.send(result);
    });

    //user related api

    app.get("/users", verifyToken, async (req, res) => {
      const searchText = req.query.searchText;
      const query = {};
      if (searchText) {
        query.$or = [
          { name: { $regex: searchText, $options: "i" } },
          { email: { $regex: searchText, $options: "i" } },
        ];
      }

      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      newUser.role = "customer";
      newUser.createdAt = new Date();

      const existingUser = await usersCollection.findOne({
        email: newUser.email,
      });

      if (existingUser) {
        return res.send({ message: "User already exists" });
      }

      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    app.patch("/users/:id/role", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const role = req.body.role;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: role,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/users/:email/role", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send({ role: user?.role || "customer" });
    });

    // GET all parcel or specific user parcel
    app.get("/parcels", async (req, res) => {
      const { email, deliveryStatus } = req.query;

      const query = {};
      if (email) {
        query.senderEmail = email;
      }
      if (deliveryStatus) {
        query.deliveryStatus = deliveryStatus;
      }
      const result = await parcelsCollection
        .find(query)
        .sort({ atCreated: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/parcels/rider", async (req, res) => {
      const { riderEmail, deliveryStatus } = req.query;
      const query = {};
      if (riderEmail) {
        query.riderEmail = riderEmail;
      }
      if (deliveryStatus !== "parcel_delivered") {
        // query.deliveryStatus = { $in: ["assigned", "rider_arriving"] };
        query.deliveryStatus = { $nin: ["pending", "parcel_delivered"] };
      } else {
        query.deliveryStatus = deliveryStatus;
      }
      const result = await parcelsCollection
        .find(query)
        .sort({ atCreated: -1 })
        .toArray();
      res.send(result);
    });
    // parcel post API
    app.post("/parcels", async (req, res) => {
      const newParcel = req.body;
      newParcel.atCreated = new Date();
      const trackingId = generateTrackingId();
      newParcel.trackingId = trackingId;
      // logTracking(trackingId, "parcel_created");
      const result = await parcelsCollection.insertOne(newParcel);
      res.send(result);
    });

    //get single parcel
    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelsCollection.findOne(query);
      res.send(result);
    });

    app.patch("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const { riderId, riderName, riderEmail, trackingId } = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          riderId: riderId,
          riderName: riderName,
          riderEmail: riderEmail,
          deliveryStatus: "assigned",
        },
      };
      const result = await parcelsCollection.updateOne(query, updateDoc);

      // update rider working status
      const riderQuery = { _id: new ObjectId(riderId) };
      const updateRiderDoc = {
        $set: {
          workingStatus: "in_delivery",
        },
      };
      await ridersCollection.updateOne(riderQuery, updateRiderDoc);
      logTracking(trackingId, "assigned");
      res.send(result);
    });

    app.patch("/parcels/:id/status", async (req, res) => {
      const id = req.params.id;
      const { deliveryStatus, riderId, trackingId } = req.body;

      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          deliveryStatus: deliveryStatus,
        },
      };
      if (deliveryStatus === "parcel_delivered") {
        // update rider working status
        const riderQuery = { _id: new ObjectId(riderId) };
        const updateRiderDoc = {
          $set: {
            workingStatus: "available",
          },
        };
        await ridersCollection.updateOne(riderQuery, updateRiderDoc);
      }

      const result = await parcelsCollection.updateOne(query, updateDoc);
      logTracking(trackingId, deliveryStatus);
      res.send(result);
    });

    // Delete parcel api
    app.delete("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelsCollection.deleteOne(query);
      res.send(result);
    });

    // Stripe api
    app.post("/create-checkout-session", async (req, res) => {
      try {
        const paymentInfo = req.body;

        const amount = parseInt(paymentInfo.cost) * 100;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",

          line_items: [
            {
              price_data: {
                currency: "usd",
                unit_amount: 1500,
                product_data: {
                  name: paymentInfo.parcelName,
                },
              },
              quantity: 1,
            },
          ],

          metadata: {
            parcelId: paymentInfo.parcelId,
            parcelName: paymentInfo.parcelName,
          },

          customer_email: paymentInfo.senderEmail,

          success_url: `${process.env.YOUR_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.YOUR_DOMAIN}/dashboard/payment-canceled`,
        });

        res.send({ url: session.url });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Payment session failed" });
      }
    });

    //mongodb pipeline and aggregation
    app.get("/parcels/delivery-stats/stats", async (req, res) => {
      const pipeline = [
        {
          $group: {
            _id: "$deliveryStatus",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id",
            count: 1,
          },
        },
      ];
      const result = await parcelsCollection.aggregate(pipeline).toArray();
      res.send(result);
    });

    // update payment dtatus
    app.patch("/payment-success", async (req, res) => {
      try {
        const sessionid = req.query.session_id;

        const session = await stripe.checkout.sessions.retrieve(sessionid);
        const trackingId = generateTrackingId();
        const transactionId = session.payment_intent;

        // ✅ duplicate protection
        const existingPayment = await paymentsCollection.findOne({
          transactionId: transactionId,
        });

        if (existingPayment) {
          return res.send({
            success: false,
            message: "Payment already exists",
            trackingId: existingPayment.trackingId,

            transactionId: existingPayment.transactionId,
          });
        }

        // ✅ payment status check
        if (session.payment_status === "paid") {
          const parcelId = session.metadata.parcelId;

          // update parcel
          const updateResult = await parcelsCollection.updateOne(
            { _id: new ObjectId(parcelId) },
            {
              $set: {
                paymentStatus: "paid",
                deliveryStatus: "pending",
                trackingId: trackingId,
              },
            },
          );

          // payment history
          const paymentHistory = {
            amount: session.amount_total / 100,
            currency: session.currency,
            customer_email: session.customer_email,
            parcelId: parcelId,
            parcelName: session.metadata.parcelName,
            transactionId: transactionId,
            paymentStatus: session.payment_status,
            paidAt: new Date(),
            trackingId,
          };

          // save payment
          const paymentResult =
            await paymentsCollection.insertOne(paymentHistory);

          logTracking(trackingId, "panding");
          // ✅ SINGLE RESPONSE
          return res.send({
            success: true,
            trackingId,
            paymentHistory,
            transactionId,
            paymentResult,
            updateResult,
          });
        }

        return res.send({
          success: false,
          message: "Payment not completed",
        });
      } catch (error) {
        console.error(error);

        res.status(500).send({
          success: false,
          error: error.message,
        });
      }
    });

    // get email specific payment history
    app.get("/payments", verifyToken, async (req, res) => {
      try {
        const email = req.query.email;

        const query = { customer_email: email };

        if (req.decoded.email !== email) {
          return res.status(403).send({ message: "Forbidden access" });
        }

        const payments = await paymentsCollection
          .find(query)
          .sort({ paidAt: -1 })
          .toArray();

        res.send(payments);
      } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    });

    // tracking API
    app.get("/trackings/:trackingId/logs", async (req, res) => {
      const trackingId = req.params.trackingId;
      const query = { trackingId };
      const result = await trackingsCollection
        .find(query)
        .sort({ createdAt: 1 })
        .toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from HasVery's backend!");
});

app.listen(port, () => {
  console.log(`App start hoise on port ${port}`);
});
