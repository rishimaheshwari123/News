import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
import Footer from "../components/comman/Footer";
import Reels from "../components/core/HomePage/Reels";
import PollAns from "../components/core/HomePage/PollAns";
import Category from "../components/core/HomePage/Category";
import Tab from "../components/core/HomePage/Tab";
import VIdeos from "../components/home/VIdeos";
import AddSlideBar from "../components/comman/AddSlideBar"
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <AddSlideBar />
        <BreakingNews />
        <br />
        <News />
        <br />
        <VIdeos />
        <Category />
        <Reels />
        <PollAns />
        <Tab />
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
