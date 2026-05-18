import React from "react";

const Service = ({ service, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card p-6 cursor-pointer transition-all duration-300 border rounded-xl aspect-square justify-center
      ${active ? "bg-emerald-200 text-black shadow-2xl scale-105" : "bg-base-100 hover:bg-gray-100"}
      `}
    >
      <img src={service.logo} alt={service.title} className="w-16 mx-auto" />

      <h2 className="text-xl font-bold text-center mt-4">
        {service.title}
      </h2>

      <p className="text-center text-sm mt-2">
        {service.description}
      </p>
    </div>
  );
};

export default Service;