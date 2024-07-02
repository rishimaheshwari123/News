import React from "react";
import YouTube from "react-youtube";

const Reels = () => {
  const videoId = "VUj5UNjE5ww";

  const opts = {
    height: "400",
    width: "210",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-7xl mx-auto  ">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default Reels;
