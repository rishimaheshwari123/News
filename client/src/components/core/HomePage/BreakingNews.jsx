import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
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
        <div className="w-11/12 mx-auto relative rounded-3xl">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            // pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="max-w-7xl mx-auto"
          >
            {breakingNews.map(
              (currElem, index) =>
                currElem.active === true && (
                  <SwiperSlide key={index}>
                    <div className="relative bg-red-600 text-white px-5 py-6 rounded-lg">
                      <div className="flex gap-3 text-center items-center">
                        <p className="text-2xl lg:text-3xl font-bold italic">
                          BREAKING NEWS ||
                        </p>
                        <p className="lg:text-xl text-lg lg:ml-4 md:ml-8">
                          {currElem.name}
                        </p>
                      </div>
                      <IoCloseCircle
                        size={28}
                        className="absolute -top-0 -right-0 text-xl cursor-pointer bg-black p-1 rounded-full"
                        onClick={() => setVisible(false)}
                      />
                    </div>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default BreakingNews;
