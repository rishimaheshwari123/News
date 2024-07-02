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
  DELETE_CATEGORY_API,

  ADD_SUBCATEGORY_API,
  GET_ALL_SUBCATEGORY_API,
  UPDATE_SUBCATEGORY_API,
  DELETE_SUBCATEGORY_API,
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


export const createCategory = async (data, token) => {
  // console.log(data);
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  
  try {
    const response = await apiConnector("POST", ADD_CATEGORY_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE Category API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Category Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'Category Details Added Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("CREATE Category API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};

export const updateCategory = async (data, token) => {
  // console.log(data);
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  
  try {
    const response = await apiConnector("POST", UPDATE_CATEGORY_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE Category API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Category  UPDATE Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'Category UPDATE Details Added Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("CREATE Category API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};

export const deleteCategory = async (id, token) => {
  
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("DELETE", `${DELETE_CATEGORY_API}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE Category API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Category");
    }

    Swal.fire({
      icon: 'success',
      title: 'Category Deleted Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("DELETE Category API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};


export const fetchSingleCategory = async(id) =>{
  let result = []
  try {
    const response = await apiConnector("GET", `${DETAILS_CATEGORY_API}/${id}`)
    // console.log("News_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch  Categories")
    }

    result = response?.data
  } catch (error) {
    console.log("CATEGORY_API API ERROR............", error)
   
  }
  return result
}

export const fetchCategory = async(id) =>{
  let result = null
  try {
    const response = await apiConnector("GET", `${DETAILS_CATEGORY_API}/${id}`)
    // console.log("News_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch News Categories")
    }
    console.log(response?.data)

    result = response?.data
  } catch (error) {
    console.log("News_CATEGORY_API API ERROR............", error)
   
  }
  return result
}




//SubCateGory



export const createSubCategory = async (data, token) => {
  console.log(data)
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("POST", ADD_SUBCATEGORY_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE SubCategory API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add SubCategory Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'SubCategory Details Added Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("CREATE SubCategory API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};

export const updateSubCategory = async (data, token) => {
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("POST", UPDATE_SUBCATEGORY_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE SubCategory API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Update SubCategory Details");
    }

    Swal.fire({
      icon: 'success',
      title: 'SubCategory Details Updated Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("UPDATE SubCategory API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};

export const deleteSubCategory = async (id, token) => {
  const toastId = Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await apiConnector("DELETE", `${DELETE_SUBCATEGORY_API}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE SubCategory API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Delete SubCategory");
    }

    Swal.fire({
      icon: 'success',
      title: 'SubCategory Deleted Successfully',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });

  } catch (error) {
    console.log("DELETE SubCategory API ERROR............", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    Swal.close(toastId);
  }
};

export const fetchSingleSubCategory = async (id) => {
  let result = [];
  try {
    const response = await apiConnector("GET", `${DETAILS_SUBCATEGORY_API}/${id}`);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch SubCategory Details");
    }
    result = response?.data;
  } catch (error) {
    console.log("FETCH SINGLE SubCategory API ERROR............", error);
  }
  return result;
};



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