import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";

export default function AssignedParcels() {
  const axiosInstance = useAxiosSecure();
  const { user } = UseAuth();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedParcels", user?.email, "assigned"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=assigned`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleView = (parcel) => {
    Swal.fire({
      title: parcel.parcelName,
      html: `
      <div style="text-align:left">
        <p><strong>Type:</strong> ${parcel.parcelType}</p>
        <p><strong>Price:</strong> ৳${parcel.cost}</p>
        <p><strong>Sender:</strong> ${parcel.senderName}</p>
        <p><strong>Sender Phone:</strong> ${parcel.senderContactNumber}</p>
        <p><strong>Sender District:</strong> ${parcel.senderDistrict}</p>
        <hr/>
        <p><strong>Receiver:</strong> ${parcel.receiverName}</p>
        <p><strong>Receiver Phone:</strong> ${parcel.receiverContactNumber}</p>
        <p><strong>Receiver District:</strong> ${parcel.receiverDistrict}</p>
        <p><strong>Status:</strong> ${parcel.deliveryStatus}</p>
      </div>
    `,
      icon: "info",
      confirmButtonText: "Close",
      width: 700,
    });
  };

  const handleAccept = async (parcel, status) => {
    const updatedInfo = {
      deliveryStatus: status,
      riderId:parcel.riderId,
      trackingId: parcel.trackingId,
    };

    try {
      const res = await axiosInstance.patch(
        `/parcels/${parcel._id}/status`,
        updatedInfo,
      );

      if (res.data.modifiedCount) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to accept parcel",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleReject = async (parcel) => {
    const updateInfo = {
      deliveryStatus: "pending",
      riderId: null,
      riderName: null,
      riderEmail: null,
    };

    try {
      const res = await axiosInstance.patch(
        `/parcels/${parcel._id}/status`,
        updateInfo,
      );

      if (res.data.modifiedCount) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel rejected successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Parcels Assigned To Me</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Rider</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.cost}</td>
                  <td>{parcel.riderName}</td>
                  <td>
                    <span className="badge badge-warning">
                      {parcel.deliveryStatus}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleView(parcel)}
                    >
                      View
                    </button>

                    {/* ASSIGNED STATE */}
                    {parcel.deliveryStatus === "assigned" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleAccept(parcel, "rider_arriving")}
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleReject(parcel)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* RIDER ARRIVING STATE */}
                    {parcel.deliveryStatus === "rider_arriving" && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleAccept(parcel, "parcel_picked_up")}
                      >
                        Mark Picked Up
                      </button>
                    )}
                    {parcel.deliveryStatus === "parcel_picked_up" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleAccept(parcel, "parcel_delivered")}
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No assigned parcels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
