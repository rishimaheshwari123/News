import React, { useEffect, useState } from "react";
import { fetchBreakingNews } from "../../../services/operations/admin";
import { IoCloseCircle } from "react-icons/io5";

const BreakingNews = () => {
  const [visible, setVisible] = useState(true);
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNewsList = async () => {
      try {
        const response = await fetchBreakingNews();
        setBreakingNews(response || []);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };

    fetchBreakingNewsList();
  }, []);

  return (
    <>
      {visible && (
        <div className="w-11/12 mx-auto mt-[130px] lg:mt-[100px]  relative rounded-3xl">
          {breakingNews.map(
            (currElem, index) =>
              currElem.active === true && (
                <div
                  key={index}
                  className="grid gap-3 lg:flex mt-5 items-center text-white bg-red-600 px-5 lg:py-4 py-1 rounded-lg"
                >
                 
              <div className=" flex gap-3 text-center">
              <p className="text-2xl lg:text-3xl font-bold italic">
                    BREAKING NEWS ||
                  </p>
                  <p className="lg:text-xl text-lg lg:ml-4 md:ml-8">{currElem.name}</p>
                 
              </div>
                  <p
                    className="  text-white font-bold text-xl cursor-pointer absolute -top-4 -right-1 bg-black p-1 rounded-full"
                    onClick={() => setVisible(false)}
                  >
                <IoCloseCircle />

                  </p>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export default BreakingNews;
