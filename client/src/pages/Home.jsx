import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
import Footer from "../components/comman/Footer";
import Reels from "../components/core/HomePage/Reels";
import PollAns from "../components/core/HomePage/PollAns";
import Category from "../components/core/HomePage/Category";


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <BreakingNews />
        <br />
        <News />
        <br />
        <Category />
        <Reels />
        <PollAns />
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
