import React from "react";
import banner from "../../assets/images/banner2.jpg";

function Home() {
  return (
    <div
      className="relative bg-cover bg-center h-[100vh] w-full"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Heading */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-5xl font-bold font-montserrat ">
          Welcome to KHAO-PEYO
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center  space-x-4 font-montserrat">
        <button className="bg-white text-black px-4 py-2 rounded">
          View Recipe
        </button>
        <button className="bg-white text-black px-4 py-2 rounded">
          Add Recipe
        </button>
      </div>
    </div>
  );
}

export default Home;
