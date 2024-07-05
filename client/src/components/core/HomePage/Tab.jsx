import React, { useEffect, useState } from "react";
import { fetchCategory } from "../../../services/operations/admin";
import { Link } from "react-router-dom";

const Tab = ({ data }) => {
  const [categories, setCategories] = useState([]);
  const stateCategoryName = "राज्य"; // Replace with your specific category name

  const [tabActive, setTabActive] = useState();

  const handleTabChange = (tabId) => {
    setTabActive(tabId);
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
                        onClick={() => handleTabChange(subCategory._id)}
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
    </div>
  );
};

export default Tab;
