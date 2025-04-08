import React from "react";
import navbgimg from "../assets/navbgimg.png";

function Hero() {
  return (
    <>
      <div className="bg-black h-screen w-full relative overflow-hidden">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover absolute top-0 left-0 sm:w-full sm:h-auto md:h-screen"
          src={navbgimg}
          alt="Hero Background"
        />

        {/* Hero Text */}
        <h1 className="flex flex-col justify-center items-center h-full text-gray-300 text-4xl sm:text-6xl font-bold relative z-10 text-center px-4 mt-[-200px] ">
          Discover the world on wheels
          <br />
          with our car rental service
        </h1>
      </div>
    </>
  );
}

export default Hero;
