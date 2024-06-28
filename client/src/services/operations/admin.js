import { toast } from "react-hot-toast"

import { setUser, setToken } from "../../redux/authSlice"

import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  LOGIN_API,
 
} = endpoints

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/admin/dashboard")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    toast.dismiss(toastId)
  }
}
