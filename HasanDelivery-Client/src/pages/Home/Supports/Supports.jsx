import React from "react";
import trackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";

const SupportArray = [
  {
    img: trackingImg,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: safeDeliveryImg,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: safeDeliveryImg,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];
const Supports = () => {
  return (
    <div className=" py-10 px-20">
      {SupportArray.map((support, index) => (
        <div
          key={index}
          className="flex my-3 items-center  bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 gap-4"
        >
          {/* Icon */}
          <div className=" rounded-xl p-4">
            <img
              className="h-25 w-25 object-contain"
              src={support.img}
              alt={support.title}
            />
          </div>

          {/* Divider */}
            <div className="border-l-2 border-dashed border-gray-300 h-16"></div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-gray-800">
              {support.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {support.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Supports;
