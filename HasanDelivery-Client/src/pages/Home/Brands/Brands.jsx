import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules'; // ✅ Autoplay add
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


// import comapany logos 
import amazon from '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import ranstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'


const companies = [amazon, casio, moonstar, amazon_vector, ranstad, star, start_people]


const Brands = () => {
  return (
    <div className='py-2 px-2 md:px-20'>

        <h1 className='text-[10px] text-center md:text-2xl font-bold pb-8'>We have helps thousands of sales feams</h1>
      <Swiper
        modules={[ Autoplay]} // ✅ Autoplay add
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        autoplay={{
          delay:0,       
          disableOnInteraction: true, 
        }}
        loop={true}         
        speed={10000}           
      >
        {companies.map((company, index) => (
          <SwiperSlide key={index}>
            <img src={company} alt={`Company ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <hr class="border-t border-dashed border-gray-400 my-8"  />
    </div>
  )
}

export default Brands