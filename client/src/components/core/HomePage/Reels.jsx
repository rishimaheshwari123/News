import React from "react";
import YouTube from "react-youtube";

const Reels = () => {
  const videoIds = [
    { id: 1, name: "VUj5UNjE5ww" },
    { id: 2, name: "VUj5UNjE5ww" },
    { id: 3, name: "VUj5UNjE5ww" },
    { id: 4, name: "VUj5UNjE5ww" },
  ];

  const opts = {
    height: "400",
    width: "250",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <p className="text-center text-3xl font-bold my-10">
        See Our Letest Reels
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {videoIds.map((video) => (
          <YouTube key={video.id} videoId={video.name} opts={opts} />
        ))}
      </div>
    </div>
  );
};

export default Reels;
