import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
import Footer from "../components/comman/Footer";
import Reels from "../components/core/HomePage/Reels";
import PollAns from "../components/core/HomePage/PollAns";
import Category from "../components/core/HomePage/Category";
import Tab from "../components/core/HomePage/Tab";
import AddSlideBar from "../components/comman/AddSlideBar";

import VIdeos from "../components/home/VIdeos";
import LiveSection from "../components/home/LiveSection";
import ButtomAdd from "../components/comman/ButtomAdd";
import BannerImage from "../components/core/HomePage/BannerImage";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <AddSlideBar />
        <BreakingNews />
        <div className=" lg:hidden md:hidden xl:hidden mt-6">
        <LiveSection />
        </div>
        <br />
        <News />
        <br />
        <VIdeos />
        <Category />
        <ButtomAdd />

        {/* <Reels /> */}
        <PollAns />
        <Tab />
      </div>
      <br />
      <br />
      <BannerImage />
      <Footer />
    </div>
  );
};

export default Home;
