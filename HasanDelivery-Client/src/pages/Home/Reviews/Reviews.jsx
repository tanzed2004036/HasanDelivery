import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ ReviewData }) => {
  const Reviews = use(ReviewData);

  return (
    <div>
      <div>
        <h1>Reviews</h1>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        //  loopedSlides={3}  
        coverflowEffect={{
          rotate: 30,
          stretch: 50,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
         autoplay={{
          delay:2000,       
          disableOnInteraction: true, 
        }}
        pagination={true}
        navigation={true}
        modules={[EffectCoverflow, Pagination,Autoplay, Navigation]}
        className="mySwiper"
      >
        {Reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
