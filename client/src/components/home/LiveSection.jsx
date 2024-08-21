import React, { useEffect, useState } from "react";
import { fetchLiveStreams } from "../../services/operations/admin";
import { CgMediaLive } from "react-icons/cg";
import LiveTv from "../../test/LiveTv";

function LiveSection() {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetchLiveStreams();
        console.log(response);
        await setLiveStreams(response || []);
      } catch (error) {
        console.error("Error fetching live streams:", error);
      }
    };

    fetchStreams();
  }, []);
  return (
    <>
      <div className=" flex justify-center mt-8">
        <p className=" flex gap-1 items-center text-[16px] bg-red-600 animate-blink p-1 rounded-md text-white font-semibold px-3">
          Live <CgMediaLive />
        </p>
      </div>
      <LiveTv />
    </>
  );
}

export default LiveSection;
