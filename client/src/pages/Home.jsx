import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
import Footer from "../components/comman/Footer";
import Reels from "../components/core/HomePage/Reels";
import PollAns from "../components/core/HomePage/PollAns";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <BreakingNews />
        <br />
        <News />
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
