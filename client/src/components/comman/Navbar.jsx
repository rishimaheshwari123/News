import React, { useState } from "react";
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

const navLinks = [
  {
    id: "close",
    name: "होम",
    href: "/",
  },
  {
    name: "मनोरंजन",
    icon: <MdKeyboardArrowDown />,
    dropdown: [
      { name: "Option 1", href: "/" },
      { name: "Option 2", href: "/option2" },
    ],
  },
  {
    name: "राज्य",
    icon: <MdKeyboardArrowDown />,
    dropdown: [
      { name: "Uttar Pradesh", href: "/uttar-pradesh" },
      { name: "Bihar", href: "/bihar" },
      { name: "Delhi", href: "/delhi" },
    ],
  },
  {
    id: "close",
    name: "चुनाव 2024 ",
    href: "/",
  },
  {
    id: "close",
    name: "खेल",
    href: "/",
  },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const handleNavClick = () => setNav(!nav);
  const handleDropdownClick = (index) => {
    setDropdown(dropdown === index ? null : index);
  };

  return (
    <nav className="bg-blue-900 text-white text-xl lg:px-16 fixed w-screen h-[90px] top-0 ">
      <div className="container mx-auto px-4 py-3 flex justify-between lg:gap-20 lg:justify-evenly items-center">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logo} className="w-16 rounded-md" alt="Logo" />
          </Link>
        </div>

        <div className="md:hidden" onClick={handleNavClick}>
          {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, index) => (
            <li key={index} className="hover:text-gray-300 relative group">
              <Link
                to={link.href || "#"}
                className="flex items-center space-x-1"
              >
                <span>{link.name}</span>
                {link.icon && <span className="mt-1">{link.icon}</span>}
              </Link>
              {link.dropdown && (
                <ul className="absolute left-0 mt-2 w-48 bg-blue-800 rounded-lg py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.dropdown.map((item, idx) => (
                    <li key={idx} className="px-4 py-2 hover:bg-blue-700">
                      <Link to={item.href}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Social media icons */}
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
        {navLinks.map((link, index) => (
          <li key={index} className="hover:text-gray-300">
            <Link
              to={link.href || "#"}
              className="flex items-center justify-between"
              onClick={(e) => {
                if (link.dropdown) {
                  e.preventDefault();
                  handleDropdownClick(index);
                }
                if (link.id === "close") {
                  setNav(false);
                }
              }}
            >
              <span>{link.name}</span>
              {link.icon && <span>{link.icon}</span>}
            </Link>
            {link.dropdown && dropdown === index && (
              <ul className="pl-4">
                {link.dropdown.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-2 hover:text-gray-300"
                    onClick={() => setNav(false)}
                  >
                    <Link to={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {/* Social media icons */}
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
