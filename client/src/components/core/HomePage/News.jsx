import React from "react";
import { card1News, card2News, cardSecondNews } from "../../../data/data";

const News = () => {
  return (
    <div className="main max-w-7xl mx-auto grid lg:grid-cols-3 gap-5 mt-10 px-5">
      <div className="first">
        {card1News.map((currElem, index) => (
          <div key={index}>
            <img src={currElem.img} alt="" />
            <p className="text-xl text-wrap mt-2">{currElem.desc}</p>
          </div>
        ))}
        <div className="grid gap-3">
          {card2News.map((currElem, index) => (
            <div className="flex gap-4 " key={index}>
              <img src={currElem.img} alt="" />
              <p className=" text-wrap mt-2 w-[65%] text-sm">{currElem.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="second grid gap-1">
        {cardSecondNews.map((currElem, index) => (
          <div className="flex gap-4 items-center" key={index}>
            <img src={currElem.img} alt="" />
            <p className=" text-wrap mt-2 w-[65%] text-sm">{currElem.desc}</p>
          </div>
        ))}
      </div>
      <div className="third grid gap-1">
        <iframe
          className="lg:w-[418px] lg:h-[230px] w-[350px]"
          src="https://www.youtube.com/embed/t_nA5Ox6Q7s?si=QE04FG8w2lZ2F4K6"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <br />
        <iframe
          className="lg:w-[418px] lg:h-[500px] w-[350px] h-[500px] "
          src="https://www.youtube.com/embed/0Fv_8s2rqCU?si=lUZ_0Xid60VdmoXY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default News;
