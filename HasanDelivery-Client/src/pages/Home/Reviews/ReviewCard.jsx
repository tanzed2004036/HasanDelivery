import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({review}) => {
  return (
    <>
       <div
          className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
        >
         <FaQuoteLeft className="text-2xl text-red-400" />

          <p className="text-sm text-gray-500 leading-relaxed">{review.review}</p>
          <div className="border-t border-dashed border-gray-200"></div>

          <div className="flex items-center gap-3">
            <img
              src={review.user_photoURL}
              alt={review.userName}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{review.userName}</p>
              <p className="text-xs text-gray-400">{review.user_email}</p>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-400 ml-auto">
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
