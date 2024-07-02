import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./components/Admin/pages/Login";
import Layout from "./components/Admin/pages/Layout";
import PrivateRoute from "./components/Admin/auth/PrivateRoute";
import DashBoard from "./components/Admin/pages/Dashboard";
import AddNews from "./components/Admin/pages/AddNews";
import OpenRoute from "./components/Admin/auth/OpenRoute";
import { getAllNews } from "./services/operations/admin";
import { useDispatch, useSelector } from "react-redux";
import AllNews from "./components/Admin/pages/AllNews";
import NewsDetails from "./pages/NewsDetails";
import SingleCategory from "./pages/SingleCategory";
import BreakingNews from "./components/core/HomePage/BreakingNews";
import Category from "./components/Admin/pages/Category";
import Subcategory from "./components/Admin/pages/Subcategory";
import Livestreming from "./components/Admin/pages/Livestreming";
import Breaking from "./components/Admin/pages/Breaking";
import ScrollToTop from "./components/comman/ScrollToTop";
import Poll from "./components/Admin/pages/Poll";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsdetails/:id" element={<NewsDetails />} />
        <Route path="/category/:id" element={<SingleCategory />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="admin/addnews" element={<AddNews />} />
          <Route path="admin/addnews/:id" element={<AddNews />} />
          <Route path="admin/allnews" element={<AllNews />} />

          <Route path="admin/poll" element={<Poll />} />
          <Route path="admin/breaking" element={<Breaking />} />
          <Route path="admin/category" element={<Category />} />
          <Route path="admin/subcategory" element={<Subcategory />} />
          <Route path="admin/livestriming" element={<Livestreming />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <ScrollToTop />
    </div>
  );
};

export default App;
