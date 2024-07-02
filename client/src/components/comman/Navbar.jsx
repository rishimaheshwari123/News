import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../assest/logo.jpg";
import { fetchCategory } from "../../services/operations/admin";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [click, setClick] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        setCategories(categoriesData?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleNavClick = () => setNav(!nav);

  const handleDropdownClick = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  return (
    <nav className="bg-blue-900 text-white text-xl lg:px-16 fixed w-screen h-[90px] top-0 z-50 ">
      <div className="container mx-auto px-4 py-3 flex justify-between lg:justify-evenly items-center relative">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logo} className="w-16 rounded-md" alt="Logo" />
          </Link>
        </div>

        <div className="md:hidden" onClick={handleNavClick}>
          {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <ul className="hidden md:flex space-x-6 items-center">
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
            <Link to="/live" className="flex items-center space-x-1 text-white">
              <span>Live Streaming</span>
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="https://www.facebook.com">
            <FaFacebook size={24} className="text-white hover:text-gray-300" />
          </Link>
          <Link to="https://www.instagram.com">
            <FaInstagram size={24} className="text-white hover:text-gray-300" />
          </Link>
          <Link to="https://www.youtube.com">
            <FaYoutube size={24} className="text-white hover:text-gray-300" />
          </Link>
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
            <div to={category.href || "#"} className="flex items-center gap-4">
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
            <FaFacebook size={24} className="text-white hover:text-gray-300" />
          </Link>
          <Link to="https://www.instagram.com">
            <FaInstagram size={24} className="text-white hover:text-gray-300" />
          </Link>
          <Link to="https://www.youtube.com">
            <FaYoutube size={24} className="text-white hover:text-gray-300" />
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
