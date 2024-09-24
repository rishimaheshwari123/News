// src/components/Footer.js

import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";




const Footer = () => {
  const[count, setCount] =  useState(50000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1500);

  
    return () => clearInterval(interval);
  }, []);
  const { token } = useSelector((state) => state.auth);
  return (
    <footer className="bg-[#2156a4] text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 p-8 md:grid-cols-6 gap-8">
          <div className="w-[70%]">
            <h3 className="text-xl font-bold mb-4 text-orange-400">
              लेटेस्ट हिंदी न्यूज़
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/" className="text-white hover:text-white">
                  राज्य
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-white">
                  इंडिया
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white">
                  फोटो गैलरी
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  ऐस्ट्रो
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  विश्व
                </Link>
              </li>
              {/* <li>
                <Link to="/about" className="text-white hover:text-white">
                  टेक्नोलॉजी
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  जनरल नॉलेज
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  ऑटो
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  पॉडकास्ट्स
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">
              एंटरटेनमेंट न्यूज़
            </h3>
            <ul className="space-y- text-[14px]">
              <li>
                <Link to="/" className="text-white hover:text-white">
                  बॉलीवुड
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-white">
                  टीवी न्यूज़
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white">
                  OTT न्यूज़
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  भोजपुरी सिनेमा
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  मूवी रिव्यू
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  तमिल सिनेमा
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="lg:text-xl  text-[14px] font-bold mb-4 text-orange-400">
              स्पोर्ट्स न्यूज़
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/" className="text-white hover:text-white">
                  टी20 वर्ल्ड कप
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-white">
                  क्रिकेट
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white">
                  आईपीएल
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-white hover:text-white">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="lg:text-xl text-[14px] font-bold mb-4 text-orange-400">
              ट्रेंडिंग न्यूज़
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/" className="text-white hover:text-white">
                  विजुअल स्टोरीज़
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-white">
                  आज का राशिफल
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white">
                  India at 2047
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  ऐग्रकल्चर
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  यूटिलिटी न्यूज़
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  ट्रैवल
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">
              लाइव टीवी
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/" className="text-white hover:text-white">
                Airtel TV CH No. 378
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white hover:text-white">
                Tata Sky  Comming Soon
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white hover:text-white">
                VideoCon  Comming Soon
                </Link>
              </li>
             
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">मौसम</h3>
            <ul className="space-y-2 t text-[14px]">
              <li>
                <Link to="/" className="text-white hover:text-white">
                  मुंबई का मौसम
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-white">
                  जयपुर का मौसम
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white">
                  नई दिल्ली का मौसम
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  लखनऊ का मौसम
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  नोएडा का मौसम
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-12" />
        <div className="mt-8 text-center text-white text-sm">
        <div className="container mx-auto text-center">
        <div className="mb-4">
          © {new Date().getFullYear()} India Ahead. All rights reserved.
        </div>
        <div className="mb-4 text-sm">
          Developed and maintained by - 
          <a href="https://inextets.online/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-gray-400">
            I-Next ETS
          </a>
        </div>
     
      </div>
         <div>
          Sites Visit {count}
         </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
