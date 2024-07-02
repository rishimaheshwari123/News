import React from "react";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";

function Live() {
  return (
    <div>
      <Navbar />

      <div className=" mt-[120px] min-h-[80vh] flex justify-center items-center w-scree">
        <div>Currenlty No Live Streaming Is Available</div>
      </div>

      <Footer />
    </div>
  );
}

export default Live;
