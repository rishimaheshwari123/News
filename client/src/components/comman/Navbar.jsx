import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaPinterest,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";
import { TbBrandThreads } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";

import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../assest/logo.jpg";
import { fetchCategory } from "../../services/operations/admin";
import { handleIsMenuOpen } from "../../redux/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import RealTimeClockAndCube from "./Navbar/RealTime";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [click, setClick] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {category} = useSelector(state=> state.news)


  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        setCategories(categoriesData?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if(category.length !==0){
      setCategories(category)
    
  } else  fetchCategories();
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisibility);

  const handleNavClick = () => setNav(!nav);

  const handleDropdownClick = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  return (
    <nav className=" text-white text-xl  fixed w-screen h-[50px] top-0 z-50 ">
      <div className=" -h-[50px] bg-[#f26434]  pt-1 min-w-[100vw]">
        <div className="flex justify-end items-center w-11/12 mx-auto gap-2 flex-wrap ">
          <div className="flex space-x-1 text-white text-[20px]">
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterest />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href="https://www.threads.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbBrandThreads />
            </a>
          </div>
          <p className="text-white text-[13px]">विज्ञापन के लिए संपर्क करें</p>
        </div>
      </div>

      <div className=" bg-[#2454a6] ">
        <div className=" mx-auto flex justify-between w-11/12  items-center relative min-h-[50px]">
          <div className="text-2xl font-bold flex  items-center gap-5">
            <div>

              <IoMenu onClick={()=> dispatch(handleIsMenuOpen())}  className=" text-3xl cursor-pointer"/>
            </div>
            <Link to="/">
              <img
                src={logo}
                className={`transition-all duration-300 ${
                  isVisible ? "w-12 top-0" : "w-16 -top-1"
                } rounded-md absolute `}
                alt="Logo"
              />
            </Link>
          </div>

          {/* <div className="md:hidden" onClick={handleNavClick}>
            {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div> */}

          <ul className="hidden md:flex space-x-6 items-center text-lg">
            <li>
              <Link to="/" className="flex items-center space-x-1 text-white">
                <span>होम</span>
              </Link>
            </li>
            {categories.map((category, index) => (
              <li
                key={category._id}
                className=" group"
                onMouseEnter={() => {
                  handleDropdownClick(index);
                  setClick(true);
                }}
                onMouseLeave={() => {
                  handleDropdownClick(null);
                  setClick(false);
                }}
                onClick={() => setNav(false)}
              >
                <div>
                  <Link
                    to={`/category/${category._id}`}
                    className={`flex items-center space-x-1 ${
                      dropdownIndex === index ? "text-gray-300" : "text-white"
                    }`}
                    onClick={() => setClick(false)}
                  >
                    <span>{category.name}</span>
                  </Link>
                </div>

                {/* &&                category?.subCategories?.length !== 0  */}
                {dropdownIndex === index && click && (
                  <div className="absolute top-12 left-0 bg-blue-900 text-white rounded-md mt-2 py-5 px-4 min-w-[90vw] flex gap-16  ">
                    <ul className=" text-[13px]">
                      {category.subCategories &&
                        category?.subCategories?.length !== 0 &&
                        category.subCategories.map((subCategory) => (
                          <li key={subCategory._id} className="py-1">
                            <Link to={`/subcategory/${subCategory._id}`}>
                              {subCategory.name}
                            </Link>
                          </li>
                        ))}
                    </ul>

                    <div>
                      <div className="grid grid-cols-4 gap-4 mt-2">
                        {category.news &&
                          category.news.slice(0, 4).map((newsItem) => (
                            <div
                              key={newsItem._id}
                              className="border rounded-md overflow-hidden hover:shadow-lg"
                            >
                              <Link
                                to={`/newsdetails/${newsItem._id}`}
                                onClick={() => setClick(false)}
                              >
                                <img
                                  src={newsItem?.images[0]?.url}
                                  alt={newsItem.title}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="p-2">
                                  <h3 className="text-sm font-medium">
                                    {newsItem.title}
                                  </h3>
                                </div>
                              </Link>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link
                to="/live"
                className="flex items-center space-x-1 text-white"
              >
                <span>Live Streaming</span>
              </Link>
            </li>
          </ul>

          <div className=" flex items-center space-x-4">
            {/* <Link to="https://www.facebook.com">
              <FaFacebook
                size={24}
                className="text-white hover:text-gray-300"
              />
            </Link>
            <Link to="https://www.instagram.com">
              <FaInstagram
                size={24}
                className="text-white hover:text-gray-300"
              />
            </Link>
            <Link to="https://www.youtube.com">
              <FaYoutube size={24} className="text-white hover:text-gray-300" />
            </Link> */}

            <RealTimeClockAndCube />
          </div>
        </div>

        <ul
          className={`md:hidden ${
            nav ? "block" : "hidden"
          } bg-blue-900 px-4 py-6 space-y-4`}
        >
          <li>
            <Link to="/" className="flex items-center space-x-1 text-white">
              <span>होम</span>
            </Link>
          </li>
          {categories.map((category, index) => (
            <li key={category._id} className="hover:text-gray-300">
              <div
                to={category.href || "#"}
                className="flex items-center gap-4"
              >
                <Link
                  to={`/category/${category._id}`}
                  onClick={() => setNav(false)}
                >
                  {category.name}
                </Link>
                {category?.subCategories?.length !== 0 && (
                  <span>
                    <MdKeyboardArrowDown
                      className=" bg-black rounded-full"
                      onClick={() => {
                        if (category.subCategories.length !== 0) {
                          handleDropdownClick(index);
                          return;
                        }
                        setNav(false);
                      }}
                    />
                  </span>
                )}
              </div>
              {dropdownIndex === index && category.subCategories && (
                <ul className="pl-6 ">
                  {category.subCategories.map((subCategory) => (
                    <li
                      key={subCategory._id}
                      className="py-2 hover:text-gray-300"
                    >
                      <Link to={`/subcategory/${subCategory._id}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <div className="flex items-center justify-center space-x-4">
            <Link to="https://www.facebook.com">
              <FaFacebook
                size={24}
                className="text-white hover:text-gray-300"
              />
            </Link>
            <Link to="https://www.instagram.com">
              <FaInstagram
                size={24}
                className="text-white hover:text-gray-300"
              />
            </Link>
            <Link to="https://www.youtube.com">
              <FaYoutube size={24} className="text-white hover:text-gray-300" />
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
