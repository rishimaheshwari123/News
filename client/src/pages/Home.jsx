import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
const Home = () => {
  return (
    <div>
      <Navbar />
      <BreakingNews />
      <News />
    </div>
  );
};

export default Home;
