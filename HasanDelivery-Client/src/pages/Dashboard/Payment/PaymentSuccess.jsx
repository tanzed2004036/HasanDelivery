import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const sessionId = searchParams.get("session_id");
const axiosInstance = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo(res.data);
        });
    }
  }, [sessionId]);

  return (
    <div>
      <h1 className="text-4xl text-green-600 text-center">
        Payment Successfull
      </h1>

      <div className="flex items-center justify-center mt-10">
        <h2 className="m-3 p-5 border">
          <span className="font-bold text-xl">tracking id : </span>
          {paymentInfo?.trackingId}
        </h2>

        <h2 className="m-3 p-5 border">
          <span className="font-bold text-xl">transaction id :</span>
          {paymentInfo?.transactionId}
        </h2>
      </div>

      <div className="flex justify-center mt-6">
        <Link to={"/dashboard/payment-history"}>
          <button className="btn btn-error">Go to Payment History</button>
        </Link>
      </div>
    </div>
  );
}
