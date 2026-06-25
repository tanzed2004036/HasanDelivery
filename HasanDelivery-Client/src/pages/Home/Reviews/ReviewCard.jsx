import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-2 md:p-6 shadow-sm hover:shadow-md transition">
        <FaQuoteLeft className="text-[6px] md:text-2xl text-red-400" />

        <p className="text-[7px] md:text-sm text-gray-500 leading-relaxed">
          {review.review}
        </p>
        <div className="border-t border-dashed border-gray-200"></div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
  
  {/* Left: image + name/email */}
  <div className="flex items-center gap-3">
    <img
      src={review.user_photoURL}
      alt={review.userName}
      className="h-5 w-5 md:h-10 md:w-10 rounded-full object-cover"
    />

    <div>
      <p className="text-xs md:text-sm font-semibold text-gray-800">
        {review.userName}
      </p>

      <p className="hidden sm:block md:text-xs text-gray-400">
        {review.user_email}
      </p>
    </div>
  </div>

  {/* Date */}
  
  <p className="text-[10px]  md:text-xs text-gray-400 md:ml-auto ml-2">
    {new Date(review.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}
  </p>
</div>
      </div>
    </>
  );
};

export default ReviewCard;
