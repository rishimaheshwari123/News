import React, { useEffect, useState } from "react";
import { fetchCategory } from "../../../services/operations/admin";
import { Link } from "react-router-dom";

const Tab = () => {
  const [categories, setCategories] = useState([]);
  const stateCategoryName = "राज्य"; // Replace with your specific category name
  const [tabActive, setTabActive] = useState();
  const [activeNews, setActiveNews] = useState([]);

  const handleTabChange = (tabId, news) => {
    setTabActive(tabId);
    setActiveNews(news || []);
  };

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

  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Return an empty string if text is undefined
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="">
      <div className="bg-gray-500 m-auto py-1 lg:flex lg:justify-center rounded-md text-sm px-3 overflow-x-scroll md:overflow-x-hidden">
        <div className="flex gap-2 pl-2">
          {categories.map((category) => (
            <div key={category._id}>
              {category.name === stateCategoryName && (
                <div>
                  <ul className="flex gap-5 pl-2">
                    {category.subCategories.map((subCategory) => (
                      <li
                        key={subCategory._id}
                        onClick={() =>
                          handleTabChange(subCategory._id, subCategory.news)
                        }
                        className={`font-bold text-xl cursor-pointer ${
                          tabActive === subCategory._id
                            ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500"
                            : "bg-gray-500 text-black px-4 py-2 rounded-md transition ease-in duration-500"
                        }`}
                      >
                        {subCategory.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {tabActive && (
        <div className="grid grid-cols-4 gap-4 mt-2">
          {categories.length > 0 ? (
            categories?.subCategories.slice(0, 4).map((newsItem) => (
              <div
                key={newsItem._id}
                className="border rounded-md overflow-hidden hover:shadow-lg"
              >
                <Link to={`/newsdetails/${newsItem._id}`}>
                  {newsItem?.images?.[0]?.url && (
                    <img
                      src={newsItem.images[0].url}
                      alt={newsItem.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-2">
                    <h3 className="text-sm font-medium">
                      {truncateText(newsItem.title, 15)}
                    </h3>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center">No news available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tab;
