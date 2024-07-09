import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  createLiveStream,
  fetchLiveStreams,
  deleteLiveStream,
} from "../../../services/operations/admin";
import { useSelector } from "react-redux";
import axios from "axios";

function LiveStream() {
  const [openCreate, setCreate] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [liveStreamsList, setLiveStreamsList] = useState([]);
  const [liveStream, setLiveStream] = useState({
    name: "",
    active: true,
    url: "",
  });

  useEffect(() => {
    const fetchLiveStreamsList = async () => {
      try {
        const response = await fetchLiveStreams();
        setLiveStreamsList(response || []); // Ensure response is an array
      } catch (error) {
        console.error("Error fetching live streams:", error);
      }
    };

    fetchLiveStreamsList();
  }, []);

  const handleCreateLiveStream = async () => {
    try {
      await createLiveStream(liveStream, token);
      const response = await fetchLiveStreams();
      setLiveStreamsList(response || []);
      setCreate(false);
      setLiveStream({ name: "", active: true, url: "" });
    } catch (error) {
      console.error("Error creating live stream:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLiveStream(id, token);
      setLiveStreamsList((prevStreams) =>
        prevStreams.filter((stream) => stream._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete live stream:", error);
    }
  };

  const handleActive = async (id, currentActiveStatus) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/live/update/${id}`,
        { active: !currentActiveStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res?.data?.success) {
        setLiveStreamsList((prevStreams) =>
          prevStreams.map((item) =>
            item._id === id ? { ...item, active: !currentActiveStatus } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update live stream:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>Live Streams</h4>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCreate(!openCreate)}
          className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
        >
          <FaPlusCircle /> Create Live Stream
        </button>
      </div>

      {openCreate && (
        <div className="mb-4 p-4 border rounded-lg">
          <h5 className="text-xl font-semibold mb-2">Create Live Stream</h5>
          <input
            type="text"
            placeholder="Name"
            value={liveStream.name}
            onChange={(e) =>
              setLiveStream({ ...liveStream, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="URL"
            value={liveStream.url}
            onChange={(e) =>
              setLiveStream({ ...liveStream, url: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <button
            onClick={handleCreateLiveStream}
            className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Create
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">URL</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveStreamsList.map((stream) => (
              <tr key={stream._id} className="hover:bg-gray-100">
                <td className="py-4 px-6">{stream?.name || "N/A"}</td>
                <td className="py-4 px-6">{stream?.url || "N/A"}</td>
                <td className="py-2 px-6 flex items-center justify-center">
                  <button
                    onClick={() => handleActive(stream._id, stream.active)}
                    className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none"
                  >
                    {stream.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(stream._id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LiveStream;
