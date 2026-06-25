import React from "react";

const Service = ({ service, active, onClick }) => {
  const Icon = service.icon;

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
      {/* ICON instead of image */}
      <div className="flex justify-center">
        <Icon className="text-3xl lg:text-5xl text-emerald-600" />
      </div>

      <h2 className="text-xs lg:text-xl font-bold text-center mt-2 sm:mt-4">
        {service.title}
      </h2>

      <p className="text-[10px] lg:text-sm text-center mt-1 sm:mt-2">
        {service.description}
      </p>
    </div>
  );
};

export default Service;