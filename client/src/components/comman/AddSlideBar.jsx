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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddSlideBar = () => {
  const { ads } = useSelector((state) => state.news);

  return (
    <div className="flex flex-col justify-center items-center -mb-30 lg:mt-0 mt-[130px]">
      {/* Top Ads */}
      <div className="max-w-7xl mx-auto mb-8">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
        >
          {Array.isArray(ads) &&
            ads.map(
              (currElem, index) =>
                currElem?.type === "top-add" && (
                  <SwiperSlide key={index}>
                    <Link to={currElem?.url} target="_blank">
                      <img
                        src={currElem?.image}
                        alt="not found"
                        className="w-full"
                      />
                    </Link>
                  </SwiperSlide>
                )
            )}
        </Swiper>
      </div>

      {/* Bottom Ads */}
      <div className="max-w-7xl mx-auto mt-8">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
        >
          {Array.isArray(ads) &&
            ads.map(
              (currElem, index) =>
                currElem?.type === "bottom-add" && (
                  <SwiperSlide key={index}>
                    <Link to={currElem?.url} target="_blank">
                      <img
                        src={currElem?.image}
                        alt="not found"
                        className="w-full"
                      />
                    </Link>
                  </SwiperSlide>
                )
            )}
        </Swiper>
      </div>
    </div>
  );
};

export default AddSlideBar;
