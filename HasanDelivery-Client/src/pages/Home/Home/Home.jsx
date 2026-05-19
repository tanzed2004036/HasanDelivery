import React from "react";
import Banner from "../Banner/Banner";
import AllService from "../Services/Allservice/Allservice";
import HowItWorks from "../HowItWorks/HowItWorks";
import Brands from "../Brands/Brands";
import Supports from "../Supports/Supports";
import Reviews from "../Reviews/Reviews";
import FAQ from "../FAQ/FAQ";

const ReviewData = fetch("/reviews.json").then((res) => res.json())

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <AllService></AllService>
      <Brands></Brands>
      <Supports></Supports>
      <Reviews ReviewData = {ReviewData}></Reviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
