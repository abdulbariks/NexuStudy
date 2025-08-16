import React from "react";
import Banner from "../../components/MainLayouts/Banner";
import Sessions from "../../components/MainLayouts/Sessions";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home | NexuStudy ");
  return (
    <div className="pt-20">
      <Banner />
      <Sessions />
      <AboutUs />
      <Contact />
    </div>
  );
};

export default Home;
