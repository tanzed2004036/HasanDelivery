import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


export default function PaymentHistory() {
  const { user } = UseAuth();
  const axiosInstance = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/payments?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <h2>Payment History</h2>

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
                <td>{payment.date}</td>

                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info">Edit</button>
                  <button className="btn btn-sm btn-success">Details</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}