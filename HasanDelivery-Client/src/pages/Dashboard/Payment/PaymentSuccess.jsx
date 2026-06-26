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
          setPaymentInfo(res.data);
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 md:p-8 text-center">

        {/* Success Icon */}
        <div className="text-green-500 text-5xl mb-4">✅</div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Your payment has been completed successfully
        </p>

        {/* Info Box */}
        <div className="mt-6 space-y-4 text-left">

          <div className="p-3 rounded-lg bg-gray-100">
            <p className="text-xs text-gray-500">Tracking ID</p>
            <p className="font-semibold break-all">
              {paymentInfo?.trackingId || "Loading..."}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-100">
            <p className="text-xs text-gray-500">Transaction ID</p>
            <p className="font-semibold break-all">
              {paymentInfo?.transactionId || "Loading..."}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Link to="/dashboard/payment-history">
            <button className="btn btn-success w-full">
              Go to Payment History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}