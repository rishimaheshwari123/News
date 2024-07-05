import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './SearchBox.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';


const SearchBox = ({ isOpen, toggleSearch }) => {
  const { allNews } = useSelector((state) => state.news);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNews = allNews.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="search-box"
      unmountOnExit
    >
      <div className="absolute right-0 top-10 mt-2 w-[90%] h-[80vh] bg-gray-400 text-black rounded-lg shadow-lg p-4 overflow-y-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded mb-4 sticky top-0  "
          placeholder="Search news "
        />
        <ul className=' mt-[20px]'>
          {filteredNews.map((news) => (
            <li key={news._id} className="mb-2">
           <Link
                  to={`/newsdetails/${news._id}`}
           
            className=' flex gap-4 '>
          <img src={news?.images[0]?.url} alt="" className=' h-[100px]' />  
    <div>
    <h3 className="font-bold">{news.title}</h3>
    <p className=' text-[13px]'>{news.subtitle}</p>
    </div>
           
           </Link>

            </li>
          ))}
        </ul>
      </div>
    </CSSTransition>
  );
};

export default SearchBox;
