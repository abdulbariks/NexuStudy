import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/MainLayouts/Navbar";
import Footer from "../components/MainLayouts/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar + Content */}
      <div className="flex-grow">
        <Navbar />
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
