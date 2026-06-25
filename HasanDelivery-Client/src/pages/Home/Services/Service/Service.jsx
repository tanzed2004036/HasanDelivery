import React from "react";

const Service = ({ service, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card p-2 sm:p-4 lg:p-6 cursor-pointer transition-all duration-300 border rounded-xl justify-center
      ${
        active
          ? "bg-emerald-200 text-black shadow-xl scale-105"
          : "bg-base-100 hover:bg-gray-100"
      }`}
    >
      <img
        src={service.logo}
        alt={service.title}
        className="w-5 lg:w-16 mx-auto"
      />

      <h2 className="text-xs lg:text-xl font-bold text-center mt-2 sm:mt-4">
        {service.title}
      </h2>

      <p className="text-[10px]  lg:text-sm text-center mt-1 sm:mt-2 ">
        {service.description}
      </p>
    </div>
  );
};

export default Service;