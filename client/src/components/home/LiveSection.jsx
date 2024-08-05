import React, { useEffect, useState } from "react";
import { fetchLiveStreams } from "../../services/operations/admin";
import { CgMediaLive } from "react-icons/cg";
import VideoPlayer from "../../test/Test";


function LiveSection() {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetchLiveStreams();
        console.log(response)
        await setLiveStreams(response || []);
      } catch (error) {
        console.error("Error fetching live streams:", error);
      }
    };

    fetchStreams();
  }, []);
  return (
    <>

    
      
<div >

<div className=" flex w-full justify-center my-10 ">
<p className=" flex gap-1  items-center text-[16px] bg-red-600 animate-blink p-1 px-3 rounded-md text-white font-semibold" >
        Live  <CgMediaLive />

       </p>
</div>
  <VideoPlayer />
</div>
          

           
            
      
   
    </>
  );
}

export default LiveSection;
