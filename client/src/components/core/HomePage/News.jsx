import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TVChannel from "../../../test/Test";
const News = () => {
  const { allNews, ads, yt } = useSelector((state) => state.news);

  const displayNews = allNews.slice(9);
  useEffect(() => {
    // console.log(allNews);
  }, [allNews]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const sortedNews = [...allNews].sort(
    (a, b) => new Date(b.publish) - new Date(a.publish)
  );
  const ytVideo = [...yt].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const rightYtVideos = yt.filter((currElem) => currElem?.type === "right-yt");
  const firstThreeVideos = rightYtVideos.slice(0, 4);
  const remainingVideos = rightYtVideos.slice(4);

  return (
    <>
      <div className="main grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[1500px] mx-auto px-5 lg:pl-6 ">
        <div className="first col-span-1 md:col-span-1 mt-3">
          <div className="second grid gap-1">
            <p className="text-3xl font-bold text-center my-5">RECENT NEWS</p>

            {sortedNews
              .filter(
                (currElem) =>
                  currElem?.active === true && currElem?.type === "recent-news"
              )
              .map((currElem, index) => {
                if (currElem?.type === "recent-news") {
                  return (
                    <Link
                      className="flex gap-4 items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      key={index}
                      to={`/${currElem?.slug}`}
                    >
                      <img
                        src={currElem?.images[0]?.url}
                        alt=""
                        className="w-30 h-20 object-cover rounded-md"
                      />
                      <p className="mt-2 w-[80%] text-sm text-gray-700 font-medium">
                        {truncateText(currElem.title, 15)}
                      </p>
                    </Link>
                  );
                }
                return null;
              })}
            <br />
            {Array.isArray(ads) &&
              ads.map(
                (currElem, index) =>
                  currElem?.type === "left-add" && (
                    <Link
                      to={currElem?.url}
                      key={index}
                      className="block mb-4"
                      target="_blank"
                    >
                      <img
                        src={currElem?.image}
                        alt="Ad Image"
                        className="w-full rounded-lg shadow-md hover:shadow-lg transition duration-300"
                      />
                    </Link>
                  )
              )}
            <p className="text-3xl font-bold text-center my-5">BIG NEWS</p>
            <br />
            <div className="grid  gap-4">
              {sortedNews
                .filter((currElem) => currElem?.active === true)
                .map((currEle, index) => {
                  if (currEle?.type === "big-news") {
                    return (
                      <Link
                        to={`/${currEle.slug}`}
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
          {sortedNews
            .filter((currElem) => currElem?.active === true)

            .map((currEle, index) => {
              if (currEle?.type === "top-news") {
                return (
                  <Link
                    to={`/${currEle.slug}`}
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
            {sortedNews
              ?.filter((currElem) => currElem?.active === true)

              .map((currEle, index) => {
                if (currEle?.type === "all") {
                  return (
                    <Link
                      to={`/${currEle.slug}`}
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
          {/* <TVChannel /> */}
          {firstThreeVideos.map((currElem, index) => (
            <iframe
              key={index}
              className="mt-3 h-[315px] w-full"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}

          <br />
          <br />
          <br />
          {Array.isArray(ads) &&
            ads.map(
              (currElem, index) =>
                currElem?.type === "right-add" && (
                  <Link
                    to={currElem?.url}
                    key={index}
                    className="block mb-4"
                    target="_blank"
                  >
                    <img
                      src={currElem?.image}
                      alt="Ad Image"
                      className="w-full rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    />
                  </Link>
                )
            )}

          {remainingVideos.map((currElem, index) => (
            <iframe
              key={index + 3} // Ensure unique key for the second part
              className="mt-3 h-[315px] w-full"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
