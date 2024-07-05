import React, { useState } from 'react';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const App = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const reels = [
    {
      id: 1,
      reelInfo: {
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4',
        description: 'A funny bunny video',
        postedBy: {
          avatar: 'avatar1.jpg',
          name: 'User1',
        },
        likes: 0,
      },
    },
    {
      id: 2,
      reelInfo: {
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        type: 'video/mp4',
        description: 'An animated short film',
        postedBy: {
          avatar: 'avatar2.jpg',
          name: 'User2',
        },
        likes: 15,
        dislikes: 1,
        comments: 7,
        shares: 4,
      },
    },
    {
      id: 3,
      reelInfo: {
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video/mp4',
        description: 'A spectacular fire show',
        postedBy: {
          avatar: 'avatar3.jpg',
          name: 'User3',
        },
        likes: 20,
        dislikes: 3,
        comments: 9,
        shares: 5,
      },
    },
  ];

  const handleBack = () => {
    window.history.back(); // Go back in history
  };

  const handleNextReel = () => {
    if (currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
    }
  };

  const handlePreviousReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
    }
  };

  const currentReel = reels[currentReelIndex];

  return (
    <div className="p-1 rounded-3xl flex items-center min-h-[100vh] justify-center relative bg-gray-200">
      <div
        className="relative bg-white p-4 rounded-xl shadow-md"
        style={{
          width: 400,
          height: 300,
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
        }}
      >
        <video
          src={currentReel.reelInfo.url}
          type={currentReel.reelInfo.type}
          controls
          className="w-full h-full rounded-xl"
        />
        <div className="mt-2">
          <p>{currentReel.reelInfo.description}</p>
          <div className="flex items-center mt-1">
            <img
              src={currentReel.reelInfo.postedBy.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{currentReel.reelInfo.postedBy.name}</span>
          </div>
        </div>
      </div>

      <div className="fixed top-5 left-2 text-white cursor-pointer bg-red-600">
        <FaRegArrowAltCircleLeft size={30} onClick={handleBack} />
      </div>

      {currentReelIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-600 text-white rounded-full"
          onClick={handlePreviousReel}
        >
          Previous
        </button>
      )}
      {currentReelIndex < reels.length - 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-600 text-white rounded-full"
          onClick={handleNextReel}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default App;
