import React, { useEffect, useState } from "react";
import { fetchLiveStreams } from "../../services/operations/admin";
import { CgMediaLive } from "react-icons/cg";


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
      {
        liveStreams && 
        <div className="  flex justify-center w-screen  overflow-x-hidden">
    <div className=" gap-4">
          {liveStreams.map((stream) => (
            <div key={stream._id} className="bg-white p-4 rounded-lg shadow">

<div className=" flex">
<p className=" flex gap-1 items-center text-[16px] bg-red-600 animate-blink p-1 rounded-md text-white font-semibold" >
        Live  <CgMediaLive />

       </p>
</div>
              <h2 className="text-xl font-semibold">{stream.name}</h2>

           
              <div className="mt-2">
                {/* Embedded YouTube Video */}
                <iframe
               className=" w-[90%] h-[50vh] lg:h-[70vh] lg:w-[70vw]"
                  src={`${stream.url}?autoplay=1`}
                  title={stream.name}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen 
                ></iframe>
              </div>
            </div>
          ))}
        </div>
    </div>
      }
    </>
  );
}

export default LiveSection;
