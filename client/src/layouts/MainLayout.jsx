import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/MainLayouts/Navbar";
import Footer from "../components/MainLayouts/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
