import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const News = () => {
  const { allNews } = useSelector((state) => state.news);

  useEffect(() => {
    console.log(allNews);
  }, [allNews]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="main grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[1500px] mx-auto px-5 lg:pl-6">
      <div className="first col-span-1 md:col-span-1 mt-3">
        <div className="second grid gap-1">
          {allNews.map((currElem, index) => {
            if (currElem?.type == "recent-news") {
              return (
                <Link
                  className="flex gap-4 items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  key={index}
                  to={`/newsdetails/${currElem._id}`}
                >
                  <img
                    src={currElem?.images[0]?.url}
                    alt=""
                    className="w-30 h-20 object-cover rounded-md"
                  />
                  <p className="text-wrap mt-2 w-[80%] text-sm text-gray-700 font-medium">
                    {currElem.title}
                  </p>
                </Link>
              );
            }
          })}
          <p className="text-3xl font-bold text-center my-5">Big NEWS</p>
          <br />
          <div className="grid  gap-4">
            {allNews.map((currEle, index) => {
              if (currEle?.type === "big-news") {
                return (
                  <Link
                    to={`/newsdetails/${currEle._id}`}
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    <p className="text-sm font-bold text-gray-800 mb-2">
                      {truncateText(currEle.title, 20)}
                    </p>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="second col-span-1 md:col-span-2">
        <p className="text-3xl font-bold text-center mt-3">TOP NEWS</p>
        <br />
        {allNews.map((currEle, index) => {
          if (currEle?.type === "top-news") {
            return (
              <Link
                to={`/newsdetails/${currEle._id}`}
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md mb-4"
              >
                <img
                  src={currEle.images[0]?.url}
                  alt=""
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    {currEle.title}
                  </p>
                  <p className="text-gray-600">{currEle.subtitle}</p>
                </div>
              </Link>
            );
          }
          return null;
        })}

        <p className="text-3xl font-bold text-center mt-3">ALL NEWS</p>
        <br />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {allNews.map((currEle, index) => {
            if (currEle?.type === "all") {
              return (
                <Link
                  to={`/newsdetails/${currEle._id}`}
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <img
                    src={currEle.images[0]?.url}
                    alt=""
                    className="w-full object-cover"
                  />
                  <p className="text-sm font-bold text-gray-800 mb-2">
                    {truncateText(currEle.title, 20)}
                  </p>
                  {/* <p className="text-gray-600 tex-sm">{currEle.subtitle}</p> */}
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Third Section */}
      <div className="third col-span-1 md:col-span-1">
        <iframe
          className="mt-3 h-[315px] w-full"
          src="https://www.youtube.com/embed/9C5Df-6Pi00?si=qieq04s5ZED1gq8b"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <iframe
          className="mt-3 h-[550px] w-full"
          src="https://www.youtube.com/embed/8JShxwJcWng?si=8mTPqNv8c-2M44NL"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          className="mt-3 h-[315px] w-full"
          src="https://www.youtube.com/embed/GzCLtdhF_nc?si=e3tvC2_SUCWrByHq"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default News;
