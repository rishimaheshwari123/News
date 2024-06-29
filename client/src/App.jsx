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

const App = () => {

  
const dispatch = useDispatch()
useEffect(()=>{
  dispatch(getAllNews())
},[])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <OpenRoute>
            
          <Login />
          </OpenRoute>
          } />

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
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
