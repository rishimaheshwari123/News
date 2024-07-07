import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeToggle, deleteNews } from "../../../services/operations/admin";
import { saveNews } from "../../../redux/newsSlice"; // Import the saveNews action if needed
import { Link } from "react-router-dom";

const AllNews = () => {
  const { allNews } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(allNews);
  }, [allNews]);

  const handleToggleActive = async (newsId, currentStatus) => {
    const newStatus = !currentStatus;
    const updatedNews = allNews.map((news) =>
      news?._id === newsId ? { ...news, active: newStatus } : news
    );

    dispatch(saveNews(updatedNews)); // Update the Redux store with the new active status

    // Call the backend to update the active status
    await activeToggle(newsId, newStatus);
  };

  const handleDelete = async (newsId) => {
    const updatedNews = allNews.filter((news) => news._id !== newsId);
    dispatch(saveNews(updatedNews)); // Update the Redux store

    // Call the backend to delete the news item
    await deleteNews(newsId);
  };

  const handleEdit = (newsId) => {
    // Implement your edit functionality here
    console.log("Edit news item with ID:", newsId);
  };

  const truncateText = (text, wordLimit=10) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All News</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtitle
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allNews.map((news, index) => (
              <tr key={news._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {news.images && news.images.length > 0 && (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={news.images[0].url}
                      alt={news.title}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {truncateText(news.title)}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {truncateText(news.subtitle)}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {truncateText(news.category.name)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {truncateText(news.subcategory.name)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {news.language}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {news.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {news.active ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button
                    onClick={() => handleToggleActive(news._id, news.active)}
                    className={`px-4 py-2 font-semibold text-sm ${
                      news.active
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    } rounded-full shadow-sm`}
                  >
                    {news.active ? "Deactivate" : "Activate"}
                  </button>
                  {/* <Link to={`/admin/addnews/${news._id}`} 
                    onClick={() => handleEdit(news._id)}
                    className="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-full shadow-sm"
                  >
                    Edit
                  </Link> */}
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="px-4 py-2 font-semibold text-sm bg-gray-500 text-white rounded-full shadow-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNews;
