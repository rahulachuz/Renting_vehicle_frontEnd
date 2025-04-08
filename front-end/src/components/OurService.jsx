import React from "react";
import serv1 from "../assets/serv1.png";
import serv2 from "../assets/serv2.png";
import serv3 from "../assets/serv3.png";

function OurService() {
  return (
    <>
      <div className="bg-black text-white py-10 flex flex-col items-center ">
        <h1 className="font-bold text-4xl">Our Services & Benefits</h1>
        <p className="mt-4 flex flex-col items-start text-left">
          To make renting easy and hassle-free, we provide a variety of services
          and advantages.
          <span className="block w-full text-center">
            We have you covered with a variety of vehicles and flexible rental
            terms.
          </span>
        </p>
        <div className="flex flex-wrap justify-center mt-10">
          <img src={serv1} alt="" />
          <img src={serv2} alt="" />
          <img src={serv3} alt="" />
        </div>
      </div>
    </>
  );
}

export default OurService;
