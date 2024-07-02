// src/components/Footer.js

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="w-[70%]">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 text-xl ">
              We are a team of passionate developers creating awesome websites.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xl">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-4 text-xl">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <FaYoutube />
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-12" />
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
