import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Categorycard from "../../home/Categorycard";
import { RiWhatsappFill } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";

function Category() {
  const { category } = useSelector((state) => state.news);

  useEffect(() => {
    // console.log(category);
  }, []);
  return (
    <div className=" lg:w-11/12 mx-auto">
      <div className="main grid grid-cols-1 md:grid-cols-3   max-w-[1500px] mx-auto px-5 lg:pl-6 gap-10">
        {/* cards */}
        <div className="col-span-1 md:col-span-2  ">
          {category?.map((cate) => (
            <div key={cate?._id} className=" ">
              <Categorycard category={cate} />
            </div>
          ))}
        </div>

        {/* /ADS */}
        <div className="col-span-1 md:col-span-1 my-10  ">
          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/Fle_TnFxcIo?si=QmFwOL_OujSHq36n"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/wJ2hKIDF-1g?si=1tQW1NbeVCn1nc4L"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <div className="my-10 text-2xl text-white font-bold shadow-xl p-4">
            <a
              href="https://wa.me/6267144122"
              target="_blank"
              className="flex items-center bg-[#01AD18] p-2 pl-5 rounded-3xl py-3 mb-5 gap-3"
            >
              <RiWhatsappFill size={30} />
              ज्वॉइन वॉट्सऐप चैनल
            </a>
            <a
              href="https://t.me/6267144122"
              target="_blank"
              className="flex items-center gap-3 bg-[#0096D7] p-2 pl-5 py-3 rounded-3xl"
            >
              <FaTelegram size={30} />
              ज्वॉइन टेलिग्राम चैनल
            </a>
          </div>

          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/Yf4PMFrzqZY?si=qcPfY5pGMeatpLbj"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/gbQSEW6o7Rg?si=yW1jVsdPjo6JQ9Pm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/Fle_TnFxcIo?si=QmFwOL_OujSHq36n"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/wJ2hKIDF-1g?si=1tQW1NbeVCn1nc4L"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/Yf4PMFrzqZY?si=qcPfY5pGMeatpLbj"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            className="mt-3 h-[315px] w-full"
            src="https://www.youtube.com/embed/gbQSEW6o7Rg?si=yW1jVsdPjo6JQ9Pm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Category;
