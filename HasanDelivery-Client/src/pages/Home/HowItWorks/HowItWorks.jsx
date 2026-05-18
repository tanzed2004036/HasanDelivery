import React from "react";
import { Works } from "./Works";
const HowItWorks = () => {
  return (
    <div className="py-6 px-15">
        <h1 className="text-2xl font-bold text-gray-800">How It Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-18 pt-3">
        {Works.map((works) => (
          <div
            key={works.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-3 shadow-sm transition hover:shadow-md aspect-square justify-center"
          >
           
             <div className="flex h-10 w-10 items-center justify-center">
              <img
                src={works.icon}
                alt={works.title}
                className="h-10 w-10 object-contain"
              />
            </div>
             <div>
                <h2 className="text-lg font-bold text-gray-800">{works.title}</h2>
            </div>

            <div>
              <p className="text-xs leading-relaxed text-gray-500">
                {works.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
