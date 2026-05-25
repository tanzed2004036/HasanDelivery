const express = require("express");
const cors = require("cors");

require("dotenv").config();
//stripe API
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

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

    // GET all parcel or specific user parcel
    app.get("/parcels", async (req, res) => {
      const email = req.query.email;

      const query = email ? { senderEmail: email } : {};
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
    app.get("/payments", async (req, res) => {
      try {
        const email = req.query.email;

        const query = { customer_email: email };

        const payments = await paymentsCollection
          .find(query)
          .sort({ paidAt: -1 })
          .toArray();

        res.send( payments,);
      } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: error.message,
        });
      }
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
