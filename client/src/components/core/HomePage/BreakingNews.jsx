import React, { useEffect, useState } from "react";
import { fetchBreakingNews } from "../../../services/operations/admin";

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
        <div className="max-w-7xl mx-auto">
          {breakingNews.map(
            (currElem, index) =>
              currElem.active === true && (
                <div
                  key={index}
                  className="grid gap-3 lg:flex mt-5 items-center text-white bg-red-600 px-5 py-4 md:rounded-lg"
                >
                  <p className="text-2xl lg:text-3xl font-bold">
                    BREAKING NEWS
                  </p>
                  <p className="text-xl lg:ml-4 md:ml-8">{currElem.name}</p>
                  <p
                    className="hidden sm:block lg:ml-auto text-white font-bold text-xl cursor-pointer"
                    onClick={() => setVisible(false)}
                  >
                    X
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
