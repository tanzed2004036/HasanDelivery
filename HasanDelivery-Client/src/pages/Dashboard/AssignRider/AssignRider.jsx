import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AssignRider() {
  const axiosInstance = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: allparcels = [], isLoading,refetch: refetchParcels } = useQuery({
    queryKey: ["allparcels", "pending"],
    queryFn: async () => {
      const res = await axiosInstance.get("/parcels?deliveryStatus=pending");
      return res.data;
    },
  });

  const { data: riders = [] , refetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/riders?status=approved&region=${selectedParcel.senderDistrict}&workingStatus=available`,
      );
      return res.data;
    },
  });

  const handleAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("my_modal_1").showModal();
  };

  const handleRiderAssign = (rider) => {
    const AssignRiderInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
      trackingId:selectedParcel.trackingId,
    };
    axiosInstance.patch(`/parcels/${selectedParcel._id}`, AssignRiderInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        refetchParcels();
        alert("Rider assigned successfully");
        document.getElementById("my_modal_1").close();
      }
      })
    
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Assign Riders
      </h2>
      
      <h1>Total parcel : {allparcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actons</th>
            </tr>
          </thead>
          <tbody>
            {allparcels.map((Parcel, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{Parcel.parcelName}</td>
                <td>{Parcel.parcelType}</td>
                <td>{Parcel.cost}</td>
                <td>
                  {Parcel.paymentStatus ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Unpaid</span>
                  )}
                </td>
                <td>{Parcel.deliveryStatus}</td>
                <td className="flex gap-2">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleAssignRiderModal(Parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">
              Available Riders for {selectedParcel?.senderDistrict}
            </h3>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {riders.length > 0 ? (
                    riders.map((rider, index) => (
                      <tr key={rider._id}>
                        <td>{index + 1}</td>
                        <td>{rider.name}</td>
                        <td>{rider.email}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleRiderAssign(rider)}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No available riders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
