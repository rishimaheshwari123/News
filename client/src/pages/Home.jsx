import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
import Footer from "../components/comman/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <BreakingNews />
        <News />
        <News />
        <News />
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
