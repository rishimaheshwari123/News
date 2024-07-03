import React, { useState, useEffect } from "react";
import axios from "axios";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [votedOptions, setVotedOptions] = useState(new Set());
  const [showPercentage, setShowPercentage] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/poll/get"
        );
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/poll/vote/${pollId}`,
        {
          optionId,
        }
      );
      console.log("Vote successful:", response.data);
      const updatedPolls = polls.map((poll) => {
        if (poll._id === pollId) {
          const totalVotes = poll.options.reduce(
            (acc, curr) => acc + curr.votes,
            0
          );
          const updatedOptions = poll.options.map((option) => {
            if (option._id === optionId) {
              return {
                ...option,
                votes: option.votes + 1,
                percentage: ((option.votes + 1) / totalVotes) * 100,
              };
            } else {
              return {
                ...option,
                percentage: (option.votes / totalVotes) * 100,
              };
            }
          });
          return {
            ...poll,
            options: updatedOptions,
          };
        }
        return poll;
      });
      setPolls(updatedPolls);
      setVotedOptions(new Set([...votedOptions, optionId])); // Mark option as voted
      setShowPercentage(optionId); // Show percentage temporarily
      setTimeout(() => setShowPercentage(""), 5000); // Hide percentage after 5 seconds
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold  text-center uppercase my-10">
        Lets Vote
      </h2>
      {polls.map((poll) => (
        <div
          key={poll._id}
          className="mb-4 p-4 border border-gray-200 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-2">{poll.question}</h3>
          <ul>
            {poll.options.map((option) => (
              <li
                key={option._id}
                className="flex items-center justify-between py-2 cursor-pointer border mb-5 px-5 border-gray-300 hover:bg-yellow-300 hover:border-none text-xl"
                onClick={() => handleVote(poll._id, option._id)}
              >
                <span className="text-lg">{option.text}</span>
                <span className="text-gray-600">{option.votes} votes</span>
                {option.percentage !== undefined && (
                  <span
                    className={`text-gray-600 ${
                      showPercentage === option._id ? "" : "hidden"
                    }`}
                  >
                    ({option.percentage.toFixed(2)}%)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PollList;
