import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";

export default function CompletedDeliveries() {
  const axiosInstance = useAxiosSecure();
  const { user } = UseAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  const calculateEarning = (parcel) => {
    if(parcel.senderDistrict === parcel.receiverDistrict){
      return parcel.cost * 0.1;
    }
    else{
        return parcel.cost * 0.3; 
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Completed Deliveries
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Price (Earning)</th>
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
                  <td>{calculateEarning(parcel).toFixed(2)}</td>
                  <td>{parcel.riderName}</td>
                  <td>
                    <span className="badge badge-success">
                      {parcel.deliveryStatus}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info">
                      cashout
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No completed deliveries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}