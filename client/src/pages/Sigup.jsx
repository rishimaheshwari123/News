import React, { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { signUp } from '../services/operations/admin';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     signUp(formData,navigate,dispatch)
    } catch (error) {
      setMessage('Error during signup');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {showPassword ? (
                <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-gray-600" />
              ) : (
                <FaEye onClick={togglePasswordVisibility} className="cursor-pointer text-gray-600" />
              )}
            </div>
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Signup
          </button>
          <div className=' flex w-full justify-end text-[12px] text-blue-600'>
        <Link to="/"> Already User?</Link>
      </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>

      
    </div>
  );
};

export default Signup;
