import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleNews } from "../services/operations/admin";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
function NewsDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [realted, setRelated] = useState([]);

  useEffect(() => {
    const fetchNews = async (id) => {
      try {
        const response = await getSingleNews(id);
        console.log(response?.category?.news);
        setProduct(response);
        setRelated(response?.category?.news);
        // console.log(realted)
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews(id);
  }, [id]);


  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    return videoId;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <>
      <Navbar />
      <div className=" mt-32 flex flex-wrap w-screen">
        {/* //news  */}

        <div className="p-4  bg-gray-100 min-h-screen lg:w-[70%] w-full">
          {product?.category && product?.subcategory && (
            <div className="flex  sm:flex-row items-center h-[20px] gap-2  mb-4 lg:w-[80%] w-full mx-auto flex-wrap">
              <h2 className="text-2xl font-bold text-gray-800">
                {product?.category.name}
              </h2>
              /
              <h2 className="text-sm text-gray-500">
                {product?.subcategory.name}
              </h2>
            </div>
          )}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="  lg:w-[80%] mx-auto">
              <h3 className="text-3xl font-semibold mb-2 text-gray-900 text-center">
                {product?.title}
              </h3>
              <h4 className="text-lg font-light mb-4 text-gray-700 text-center ">
                {product?.subtitle}
              </h4>
            </div>

            <div>
              {product?.images && product?.images.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 ">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`${product.title} image ${index + 1}`}
                        className="w-screen h-auto rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
            {product?.youtubeurl && (
              <div className="mb-6">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${getYoutubeEmbedUrl(
                    product?.youtubeurl
                  )}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="flex items-center justify-between text-gray-500">
              <span>{product?.location}</span>
              <span>{product?.expireDate}</span>
            </div>
          </div>
        </div>

        <div className=" lg:w-[28%] w-full border-0 lg:border-2 min-h-screen max-h-screen overflow-scroll  ">
          <div className=" bg-blue-500 p-2 text-white ">
            <h3>Realated News</h3>
          </div>
          <div className="flex gap-3 grid-cols-1 max-h-[40px] mt-8 p-2 flex-col">
            {realted?.map((currElem, index) => (
              <Link to={`/newsdetails/${currElem._id}`} key={currElem._id}>
                <div className="flex gap-3">
                  <img
                    src={currElem.images[0].url}
                    alt=""
                    className=" w-[100px]"
                  />
                  <p className=" text-wrap mt-2  text-sm">{truncateText(currElem.title,20)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
}

export default NewsDetails;
