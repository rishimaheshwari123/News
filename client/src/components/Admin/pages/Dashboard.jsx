import React from 'react';
import { FaUsers, FaNewspaper, FaChartBar, FaListAlt, FaTags } from 'react-icons/fa';

const Dashboard = () => {
  const data = [
    { title: 'Total Users', value: 1200, icon: <FaUsers className="text-3xl" />, bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { title: 'Total Visits', value: 15000, icon: <FaChartBar className="text-3xl" />, bgColor: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { title: 'Total News', value: 300, icon: <FaNewspaper className="text-3xl" />, bgColor: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { title: 'Total Categories', value: 10, icon: <FaListAlt className="text-3xl" />, bgColor: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' },
    { title: 'Total Subcategories', value: 25, icon: <FaTags className="text-3xl" />, bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
      {data.map((item, index) => (
        <div 
          key={index} 
          className={`${item.bgColor} ${item.hoverColor} flex flex-col items-center p-4 shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-white`}
        >
          <div className="mb-2">{item.icon}</div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-2xl">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
