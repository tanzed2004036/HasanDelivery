import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import bannerImg1 from "../../../assets/banner/b1.png";
import bannerImg2 from "../../../assets/banner/b2.png";
import bannerImg3 from "../../../assets/banner/b3.png";

export default function Banner() {
  return (
    <Carousel
    autoPlay
    infiniteLoop
    interval={3000}
     showStatus={false}
     className="mt-2"
    >
      <div >
        <img className="rounded-xl"  src={bannerImg1} />
      </div>
      <div>
        <img className="rounded-xl"className="rounded-xl" src={bannerImg2} />
      </div>
      <div>
        <img className="rounded-xl" src={bannerImg3} />
      </div>
    </Carousel>
  );
}
