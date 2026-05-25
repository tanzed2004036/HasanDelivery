import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axiosInstance from "../../hooks/UserAxios";
import UseAuth from "../../hooks/UseAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = UseAuth();
  const navigate  = useNavigate()

  // region array
  const ServiceCenters = useLoaderData();
  const regions = [
    ...new Set(ServiceCenters.map((item) => item.district)),
  ].sort();

  // form submit handling
  const onSubmit = (data) => {
    try {
      console.log("Parcel Data:", data);
      const isSameDistrict = data.senderDistrict === data.receiverDistrict;
      const isDocument = data.parcelType === "Document";
      const Weight = parseFloat(data.parcelWeight);

      let cost = 0;
      if (isDocument) {
        cost = isSameDistrict ? 60 : 80;
      } else {
        if (Weight <= 3) {
          cost = isSameDistrict ? 120 : 180;
        } else {
          cost = isSameDistrict ? Weight * 30 : Weight * 30 + 50;
        }
      }
      data.cost = cost;

      //confirm parcel
      Swal.fire({
        title: "Are you sure?",
        text: `You have to pay ${cost}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then((result) => {
        if (result.isConfirmed)
          // save parcel details in database
          axiosInstance
            .post("/parcels", data)
            .then((res) => {
              console.log("after saving", res.data);
              Swal.fire("Success!", "Parcel saved! continue to payment", "success").then(() => {
                navigate("/dashboard/my-parcel");
              });
            })
            .catch((err) => {
              Swal.fire("Error!", err.message, "error");
            });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Send your parcel
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Fill in the details below to book your delivery
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 w-full border-2"
      >
        {/* Parcel Type */}
        <div className="flex rounded-xl p-4 mb-4">
          <label className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500 bg-blue-50 text-blue-800 text-sm font-semibold cursor-pointer">
            <input
              type="radio"
              name="parcelType"
              value="Document"
              defaultChecked
              required
              {...register("parcelType")}
            />
            📄 Document
          </label>

          <label className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-500 text-sm cursor-pointer">
            <input
              type="radio"
              name="parcelType"
              value="Non Document"
              required
              {...register("parcelType")}
            />
            📦 Non Document
          </label>
        </div>

        {/* Parcel Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Parcel name
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday gift"
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("parcelName")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Parcel Weight (kg)
              </label>
              <input
                type="number"
                placeholder="0.5"
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("parcelWeight")}
              />
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-600 my-5" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Sender */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Sender name
                </label>
                <input
                  type="text"
                  required
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Sender Email
                </label>
                <input
                  type="tel"
                  required
                  {...register("senderEmail")}
                  placeholder="+880 1X XX XXX XXX"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Sender phone number
                </label>
                <input
                  type="tel"
                  required
                  {...register("senderPhone")}
                  placeholder="+880 1X XX XXX XXX"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Sender District
                </label>
                <select
                  required
                  {...register("senderDistrict")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                >
                  <option value="">Select district</option>
                  {regions.map((region, idx) => (
                    <option key={idx} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Sender Address
                </label>
                <textarea
                  required
                  {...register("senderAddress")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg min-h-[70px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Pickup instructions
                </label>
                <textarea
                  required
                  {...register("pickupInstructions")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg min-h-[60px]"
                />
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Receiver name
                </label>
                <input
                  type="text"
                  required
                  {...register("receiverName")}
                  placeholder="Karim Hossain"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Receiver Email
                </label>
                <input
                  type="tel"
                  required
                  {...register("receiverEmail")}
                  placeholder=" XX XXX XXX @ XX.com"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Receiver number
                </label>
                <input
                  type="tel"
                  required
                  {...register("receiverPhone")}
                  placeholder="+880 1X XX XXX XXX"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Receiver District
                </label>
                <select
                  required
                  {...register("receiverDistrict")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                >
                  <option value="">Select district</option>
                  {regions.map((region, idx) => (
                    <option key={idx} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Receiver Address
                </label>
                <textarea
                  required
                  {...register("receiverAddress")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg min-h-[70px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Delivery instructions
                </label>
                <textarea
                  required
                  {...register("deliveryInstructions")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg min-h-[60px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="p-3 rounded-xl btn btn-error hover:bg-blue-500 text-black text-sm font-semibold"
          >
            🚚 Confirm & Book Delivery
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
