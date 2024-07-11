import React, { useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../services/operations/admin';
import VerifyOtp from '../components/core/Login/VerifyOtp';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/comman/Navbar';
function Login() {
  const location = useLocation();



  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendOtp(email));
    setEmailSent(res);
  };

  return (<>
  <Navbar/>

  {emailSent ? (
        <VerifyOtp sendOtp={sendOTP} email={email} />
      ) :
  (  
    
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-3">
        <div className="text-center">
          <AiOutlineMail className="mx-auto h-8 w-auto text-black" /> {/* Updated color to text-white */}
          <h2 className="mt- text-2xl font-extrabold text-gray-900 uppercase font-montserrat">Login with otp</h2>
          <p className="mt-1 text-[12px] text-gray-600">Please enter your email address</p>
        </div>
        <form className="mt- space-y-3" onSubmit={sendOTP}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm ">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none  relative block w-[80%] mx-auto px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:ring-offset-2 focus:ring-indigo-500"
            >
             
              <p className=' bg-gray-800 p-2 rounded-lg px-4 '>Send OTP</p>
            </button>
          <p className="mt-1 text-[12px] text-gray-600 text-center">A 6 digit OTP will be sent to your email address</p>
          </div>
        </form>
      </div>
 
    </div>
    
    )
  }
  
  </>
  );
}

export default Login;