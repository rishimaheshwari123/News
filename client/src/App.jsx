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
import { fetchCategory, getAllNews } from "./services/operations/admin";
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
import SubCategorySingle from "./pages/SubCategorySingle";
import Live from "./pages/Live";
import MobileMenu from "./components/home/MobileMenu";


//
import SideNavbar from "./components/comman/Navbar/SideNavbar";
import { saveCategory } from "./redux/newsSlice";
import Cube from "./components/comman/Cube";
import ReelSection from "./test/Reel";

const App = () => {
  const {isMenuOpen} = useSelector(state=>state.news)
  const dispatch = useDispatch();
  useEffect(() => {


    //Categoyr
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        dispatch(saveCategory(categoriesData?.categories || []))
    
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();


    dispatch(getAllNews());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsdetails/:id" element={<NewsDetails />} />
        <Route path="/category/:id" element={<SingleCategory />} />
        <Route path="/subcategory/:id" element={<SubCategorySingle />} />
        <Route path="/reel" element={<ReelSection />} />

        <Route path="/live" element={<Live />} />


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

   <div className="fixed bottom-0 z-40">
        <MobileMenu />
      </div>

      <div className="fixed bottom-40 z-40 right-5">
        <Cube />
      </div>


{
  isMenuOpen && <SideNavbar></SideNavbar>
}
      <ScrollToTop />
    </div>
  );
};

export default App;
