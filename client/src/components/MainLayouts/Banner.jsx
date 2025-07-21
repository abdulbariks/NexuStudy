import React from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 md:px-16 py-12 bg-white">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Limitless learning at your <br />
          <span className="relative inline-block">
            <span className="z-10 relative">fingertips</span>
            <span className="absolute left-0 bottom-1 w-full h-2 bg-yellow-300 z-0 transform -skew-y-2"></span>
          </span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-lg">
          Online learning and teaching marketplace with 5K+ courses & 10M+
          students. Taught by experts to help you acquire new skills.
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            Learn with experts
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            Get certificate
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            Get membership
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow">
            Get Started
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded text-blue-600 hover:bg-blue-50">
            <FaPlay />
            Watch video
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="relative flex-1 max-w-md w-full">
        {/* Background Elements */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-100 rounded-full z-0" />
        <div className="absolute top-1/3 -right-10 w-16 h-16 bg-pink-100 rounded-full z-0" />
        <div className="absolute -bottom-6 left-1/3 w-28 h-28 bg-blue-100 rounded-full z-0" />
        <div className="absolute top-30 -left-12 w-24 h-24 bg-pink-100 rounded-full z-0" />
        <div className="absolute top-2/3 -right-5 w-16 h-16 bg-blue-100 rounded-full z-0" />
        <div className="absolute -bottom-12 left-2/3 w-28 h-28 bg-yellow-100  rounded-full z-0" />
        <img
          src="https://i.ibb.co/S4RWRr36/07-CK3-Zr-Eu-H.png"
          alt="Student"
          className="relative z-10 w-full"
        />
      </div>
    </section>
  );
};

export default Banner;
