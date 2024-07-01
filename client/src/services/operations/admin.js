import { setUser, setToken } from "../../redux/authSlice"
import { saveNews } from "../../redux/newsSlice"
import { apiConnector } from "../apiConnector"
import { endpoints , adminEndpoints} from "../apis"
import Swal from "sweetalert2"


const {
  LOGIN_API,

} = endpoints


const {
  ADD_NEWS_API,
  UPDATE_NEWS_API,
  GET_ALL_NEWS_API,
  DELETE_NEWS_API,
  DETAILS_NEWS_API,
  STATUS_NEWS_API,
  IMAGE_UPLOAD,
  ADD_CATEGORY_API,
  UPDATE_CATEGORY_API,
  GET_ALL_CATEGORY_API,
  DETAILS_CATEGORY_API,
  ADD_SUBCATEGORY_API,
  GET_ALL_SUBCATEGORY_API,
  DETAILS_SUBCATEGORY_API
} = adminEndpoints;




export async function login(email, password, navigate, dispatch) {

  Swal.fire({
    title: "Loading",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password,
    });
    Swal.close();
    if (!response?.data?.success) {
      await Swal.fire({
        title: "Login Failed",
        text: response.data.message,
        icon: "error",
      });
      throw new Error(response.data.message);
    }

    Swal.fire({
      title: `Login Successfully!`,
      text: `Have a nice day!`,
      icon: "success",
    });
    dispatch(setToken(response?.data?.token));
    dispatch(setUser(response.data.user));
    navigate("/admin/dashboard");
  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    Swal.fire({
      title: "Login Failed",
      text: error.response?.data?.message ||
        "Something went wrong, please try again later",
      icon: "error",
    });
  }

}

export const getAllNews = () => async (dispatch) => {
  ;
 try {
   const response = await apiConnector("GET", GET_ALL_NEWS_API);
  
   if (!response?.data?.success) {
     throw new Error("Could Not Fetch News");
   }


   const result = response?.data?.news;
   dispatch(saveNews(result)); // Dispatching action to save products
    ;
   return result;
 } catch (error) {
   console.log("GET_ALL_NEWS_API API ERROR:", error);
 
    ;
   return [];
 }
};


//Admin 



export const createNews = async (data, token) => {
  console.log(data);
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  
  try {
    const response = await apiConnector("POST", ADD_NEWS_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE News API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add News Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'News Details Added Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("CREATE News API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};



export const editNews = async (data, token) => {
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("POST", UPDATE_NEWS_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("EDIT News API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Update News Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'News Details Updated Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("EDIT News API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};



export const deleteNews = async (id, token) => {
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("DELETE", DELETE_NEWS_API, {id}, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE News API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Delete News");
    }

    Swal.fire({
      icon: 'success',
      title: 'News Deleted Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("DELETE News API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};

export const getSingleNews = async (newsId) => {

 try {
  
   const response = await apiConnector("GET", `${DETAILS_NEWS_API}/${newsId}`);
  


   if (!response?.data?.success) {
     throw new Error("Could Not Fetch News");
   }


   const result = response?.data?.news;
 
  
   return result;
 } catch (error) {
   console.log("GET_ALL_NEWS_API API ERROR:", error);
 
    
   return [];
 }
};


export const activeToggle = async (data, token) => {
  console.log(data);
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  
  try {
    const response = await apiConnector("PUT", STATUS_NEWS_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE News API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add News Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'News Details Added Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("CREATE News API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};











//CateGory

export const fetchCategory = async() =>{
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORY_API)
    // console.log("News_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch News Categories")
    }

    result = response?.data
  } catch (error) {
    console.log("News_CATEGORY_API API ERROR............", error)
   
  }
  return result
}




//SubCateGory

export const fetchSubCategory = async() =>{
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_SUBCATEGORY_API)
    // console.log("News_SUB CATEGORIES_API API RESPONSE............", response)
   
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch News Categories")
    }
   
    result = response?.data?.subCategories
  } catch (error) {
    // console.log("News_CATEGORY_API API ERROR............", error)
    
  }
  return result
}










//Image

export const imageUpload = async (data, token) => {
  let result = [];
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("thumbnail", data[i]);
    }

    const response = await apiConnector("POST", IMAGE_UPLOAD, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Add Image Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'Image Details Added Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

    result = response?.data?.images;

  } catch (error) {
    console.log("CREATE IMAGE API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }

  return result;
};