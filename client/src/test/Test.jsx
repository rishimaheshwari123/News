import React from 'react';
import ReactPlayer from 'react-player';

const TVChannel = () => {
  const streamUrl = 'https://www.yupptv.com/online-tv/dd-india/live/embed';

  return (
    <div className="tv-channel" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
      <ReactPlayer
        url={streamUrl}
        playing
        controls
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default TVChannel;
