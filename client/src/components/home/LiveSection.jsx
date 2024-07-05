import React from "react";

function LiveSection() {
  return (
    <div className=" mt-[100px] flex justify-center w-screen lg:hidden md:hidden">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/SfpOK7_mwWA?si=akjviBtogcz9oFrT?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default LiveSection;
