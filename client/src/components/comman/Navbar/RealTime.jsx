import React, { useState, useEffect } from 'react';
import { RiWhatsappFill } from 'react-icons/ri';
import { FaTelegram } from 'react-icons/fa';

const RealTimeClockAndCube = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const dateTimeString = `${formatDate(now)} ${formatTime(now)}`;
      setCurrentDateTime(dateTimeString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="lg:text-2xl text-white font-bold   ">
      <div className="text-center ">
        <h2 className=" text-[12px] lg:text-lg  font-bold">{currentDateTime}</h2>
      </div>
    
    </div>
  );
};

export default RealTimeClockAndCube;
