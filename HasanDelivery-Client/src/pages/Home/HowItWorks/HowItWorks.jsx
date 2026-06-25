import React from "react";
import { Works } from "./Works";
const HowItWorks = () => {
  return (
    <div className="py-6 px-2 md:px-15">
        <h1 className="text-2xl font-bold text-gray-800">How It Works</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10 pt-3">
        {Works.map((works) => (
          <div
  key={works.id}
  className="flex flex-col gap-1 sm:gap-3 rounded-xl border border-gray-100 bg-white p-2 sm:p-5 shadow-sm transition hover:shadow-md"
>
  <div className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center">
    <img
      src={works.icon}
      alt={works.title}
      className="h-7 w-7 sm:h-10 sm:w-10 object-contain"
    />
  </div>

  <h2 className="text-xs sm:text-lg font-bold text-gray-800">
    {works.title}
  </h2>

  <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-3">
    {works.description}
  </p>
</div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
