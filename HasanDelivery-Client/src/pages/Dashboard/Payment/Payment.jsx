import React from "react";
import axiosInstance from "../../../hooks/UserAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Payment() {
  const { parcelId } = useParams();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const hanndlePayButton = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
    };

    const res = await axiosInstance.post('/create-checkout-session',paymentInfo);
    window.location.href = res.data.url
  };

  return (
    <div>
      pay {parcel?.parcelName}
      <button onClick={hanndlePayButton} className="btn btn-error ">
        pay
      </button>
    </div>
  );
}
