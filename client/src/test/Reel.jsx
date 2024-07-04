import React from 'react';
import { Reels } from '@sayings/react-reels';
import '@sayings/react-reels/dist/index.css';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const App = () => {
 

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
          // likes: { count: 0 },
        
        },
      
        bottomSection: {
          component: <div>Custom bottom section</div>,
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
          likes: { count: 15 },
          dislikes: { count: 1 },
          comments: { count: 7 },
          shares: { count: 4 },
        },
        rightMenu: {
          options: [
            { id: 1, label: 'Option 1', value: 'option1' },
            { id: 2, label: 'Option 2', value: 'option2' },
          ],
        },
        bottomSection: {
          component: <div>Custom bottom section</div>,
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
          likes: { count: 20 },
          dislikes: { count: 3 },
          comments: { count: 9 },
          shares: { count: 5 },
        },
        rightMenu: {
          options: [
            { id: 1, label: 'Option 1', value: 'option1' },
            { id: 2, label: 'Option 2', value: 'option2' },
          ],
        },
        bottomSection: {
          component: <div>Custom bottom section</div>,
        },
      },
    // Add more reels as needed
  ];

  const reelMetaInfo = {
    reelDimensions: {
      height: 300,
      width: 400,
    },
    backGroundColor: '#f0f0f0',
    borderRadius: 10,
    likeActiveColor: 'blue',
    dislikeActiveColor: 'red',
  };
  const handleBack = () => {
    window.history.back() // Go back in history
  };
  return (
    <div className=' p-1 rounded-3xl flex items-center min-h-[100vh] justify-center relative '>
    <Reels
      reels={reels}
      reelMetaInfo={reelMetaInfo}
    
   
      
    />

    <div className=' fixed top-5 left-2 text-white cursor-pointer bg-red-600 '>
    <FaRegArrowAltCircleLeft size={30} onClick={handleBack}/>

    </div>
  </div>
  );
};

export default App;
