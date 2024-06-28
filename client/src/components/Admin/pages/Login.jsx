import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../../redux/authSlice";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

function Login() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      });

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/login`,
        formData
      );
      console.log(response);
      Swal.close();

      if (!response?.data?.success) {
        Swal.fire({
          title: "Login Failed",
          text:
            response.data.message ||
            "Something went wrong, please try again later",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Login Successfully",
        text: "",
        icon: "success",
      });
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      Swal.close();

      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong, please try again later",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Link
        className="bg-blue-400  flex items-center w-fit px-10 py-4 gap-3 font-bold text-sm"
        to="/"
      >
        <FaArrowLeftLong />
        <p>Back to Home</p>{" "}
      </Link>

      <div className="flex items-center justify-center h-[87vh] ">
        <div className="bg-gray-300 hover:bg-gray-200 p-8 rounded-lg shadow-lg lg:w-[25%] h-auto">
          <h2 className="text-3xl text-center font-semibold mb-4">Login</h2>
          <div className="border border-b-2 border-blue-600 my-3"></div>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                required
                placeholder="Enter email"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                id="password"
                required
                placeholder="Enter Password"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleOnChange}
              />
              <div
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-xl cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="px-6 mt-4 text-xl py-2 bg-blue-400 rounded-md"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
