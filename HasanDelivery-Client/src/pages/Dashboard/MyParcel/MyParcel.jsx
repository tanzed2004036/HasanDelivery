import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

export default function MyParcel() {
  const { user } = UseAuth();
  const axiosInstance = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // handle details button
  const handleDetails = (parcel) => {
    Swal.fire({
      title: parcel.parcelName,
      html: `
      <div style="text-align:left">
        <p><b>Type:</b> ${parcel.parcelType}</p>
        <p><b>Price:</b> ${parcel.cost} BDT</p>
        <p><b>Payment Status:</b> ${
          parcel.paymentStatus ? "Paid" : "Unpaid"
        }</p>
        <p><b>Delivery Status:</b> ${parcel.deliveryStatus}</p>
        <p><b>Tracking ID:</b> ${parcel.trackingId}</p>
      </div>
    `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  // handle delete
  const HandleDelet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosInstance.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            //refreah the table
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  //handel pay
  const handlePayButton = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
    };

    const res = await axiosInstance.post(
      "/create-checkout-session",
      paymentInfo,
    );
    window.location.href = res.data.url;
  };

  return (
    <div>
      my parcel
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
            {parcels.map((Parcel, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>
                  <Link to={`/track-parcel/${Parcel.trackingId}`}>
                    {Parcel.parcelName}
                  </Link>
                </td>
                <td>{Parcel.parcelType}</td>
                <td>{Parcel.cost}</td>
                <td>
                  {Parcel.paymentStatus ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayButton(Parcel)}
                      className="btn btn-primary btn-sm"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{Parcel.deliveryStatus}</td>
                <td className="flex gap-2">
                  {/* Details */}
                  <button className="btn btn-sm btn-success" title="Details" onClick={() => handleDetails(Parcel)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    className="btn btn-sm btn-error"
                    title="Delete"
                    onClick={() => HandleDelet(Parcel._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
