import React from "react";
import Banner from "../Banner/Banner";
import AllService from "../Services/Allservice/Allservice";
import HowItWorks from "../HowItWorks/HowItWorks";
import Brands from "../Brands/Brands";
import Supports from "../Supports/Supports";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <AllService></AllService>
      <Brands></Brands>
      <Supports></Supports>
    </div>
  );
};

export default Home;
