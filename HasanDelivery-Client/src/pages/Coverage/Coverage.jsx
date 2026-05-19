import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
const Coverage = () => {
  const position = [23.8103, 90.4125]; // Dhaka coordinates
  const serviceCenters = useLoaderData();
  const mapRef = useRef();

  const searchHandle = event =>{
    event.preventDefault();
    const location = event.target.location.value;
    const district = serviceCenters.find(center => center.district.toLowerCase().includes(location.toLowerCase()));
    if(district){
      const coordinates = [district.latitude, district.longitude];
      console.log(district)
      mapRef.current.flyTo(coordinates);
    }else{
      alert("Sorry, we do not have service in that location.");
    }
  }

  return (
    <div>
      <div>
        <h1>We are available in 64 districts</h1>
      </div>
      {/* searchbar */}
      <div>
        <form onSubmit={searchHandle}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input name="location" type="search" className="grow" placeholder="Search" />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
        </form>
      </div>
      {/* map */}
      <div>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-[500px] w-full rounded-xl" 
          ref={mapRef}

        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker position={[center.latitude, center.longitude]} key={index}>
              <Popup>
                {center.district} <br /> Service area:{" "}
                {center.covered_area.join(",")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
