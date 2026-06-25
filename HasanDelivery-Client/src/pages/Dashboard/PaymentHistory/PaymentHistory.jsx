import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function PaymentHistory() {
  const { user } = UseAuth();
  const axiosInstance = useAxiosSecure();
  const { data: payments = [], isLoading,refetch  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  //  delete payment history
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This payment will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosInstance.delete(`/payments/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Payment has been removed.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-4">
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
      Payment History
    </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Tracking Id</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, key) => (
              <tr key={payment._id || key}>
                <td>{key + 1}</td>
                <td>{payment.parcelName}</td>
                <td>{payment.trackingId}</td>
                <td>{payment.transactionId}</td>
                <td>
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleString()
                    : "N/A"}
                </td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(payment._id)}
                  >
                    Delete
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
