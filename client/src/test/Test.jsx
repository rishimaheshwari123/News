import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const url = "http://live.indiaaheadlive.com/0.m3u8";

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoaded(true);
        // Attempt to autoplay the video
        video.muted = true; // Mute the video to bypass autoplay restrictions
        video.play().then(() => {
          // Unmute after playback has started
          video.muted = false;
        }).catch(error => {
          console.error('Error playing video:', error);
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('canplay', () => {
        setIsLoaded(true);
        // Attempt to autoplay the video
        video.muted = true; // Mute the video to bypass autoplay restrictions
        video.play().then(() => {
          // Unmute after playback has started
          video.muted = false;
        }).catch(error => {
          console.error('Error playing video:', error);
        });
      });
    } else {
      console.error('HLS is not supported in this browser.');
    }
  }, [url]);

  return (
    <div className=' w-[90%]  lg:min-h-[70vh] lg:w-[70vw] mx-auto mt-5'>
      <video ref={videoRef} controls width="100%" />
      {!isLoaded && <p>Loading video...</p>}
    </div>
  );
};

export default VideoPlayer;
