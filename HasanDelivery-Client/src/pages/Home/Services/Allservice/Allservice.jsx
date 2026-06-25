import React, { useState } from "react";
import { services } from "../Services";
import Service from "../Service/Service";

const AllService = () => {

  const [activeId, setActiveId] = useState(null);

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-18 bg-primary">

      <h1 className="text-md md:text-3xl font-bold text-center mb-2 md:mb-8">
        Our Services
      </h1>
      <p className=' text-xs md:text-base  mb-2'>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-13">

        {services.map((item) => (
          <Service
            key={item.id}
            service={item}
            active={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          />
        ))}

      </div>

    </div>
  );
};

export default AllService;




