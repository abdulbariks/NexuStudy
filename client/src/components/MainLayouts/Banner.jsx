import React from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 md:px-16 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
          Limitless learning at your <br />
          <span className="relative inline-block">
            <span className="z-10 relative">fingertips</span>
            <span className="absolute left-0 bottom-1 w-full h-2 bg-yellow-300 dark:bg-yellow-500 z-0 transform -skew-y-2"></span>
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-lg">
          Online learning and teaching marketplace with 5K+ courses & 10M+
          students. Taught by experts to help you acquire new skills.
        </p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
            Learn with experts
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
            Get certificate
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
            Get membership
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow transition-colors duration-300">
            Get Started
          </button>
          <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300">
            <FaPlay />
            Watch video
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="relative flex-1 max-w-md w-full">
        {/* Background Elements */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full z-0" />
        <div className="absolute top-1/3 -right-10 w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full z-0" />
        <div className="absolute -bottom-6 left-1/3 w-28 h-28 bg-blue-100 dark:bg-blue-900 rounded-full z-0" />
        <div className="absolute top-30 -left-12 w-24 h-24 bg-pink-100 dark:bg-pink-900 rounded-full z-0" />
        <div className="absolute top-2/3 -right-5 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full z-0" />
        <div className="absolute -bottom-12 left-2/3 w-28 h-28 bg-yellow-100 dark:bg-yellow-900 rounded-full z-0" />
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
