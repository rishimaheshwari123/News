
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
}

export const adminEndpoints = {
  ADD_NEWS_API : BASE_URL + "/news/create",
  UPDATE_NEWS_API : BASE_URL + "/news/update",
  GET_ALL_NEWS_API : BASE_URL + "/news/all",
  DELETE_NEWS_API : BASE_URL + "/news/delete",
  DETAILS_NEWS_API : BASE_URL + "/news",

  // ACTIVE STATUS
  STATUS_NEWS_API : BASE_URL + "/news/toggleActive",

//bREAKING nEWS





  // Image
  IMAGE_UPLOAD : BASE_URL + "/image/multi",




  // CateGOry
  ADD_CATEGORY_API : BASE_URL + "/category/create",
  DELETE_CATEGORY_API : BASE_URL + "/category/delete",
  UPDATE_CATEGORY_API : BASE_URL + "/category/update",
  GET_ALL_CATEGORY_API : BASE_URL + "/category/all",
  DETAILS_CATEGORY_API : BASE_URL + "/category",



  

  // suBCateGOry
  ADD_SUBCATEGORY_API : BASE_URL + "/subcategory/create",
  DELETE_SUBCATEGORY_API : BASE_URL + "/subcategory/delete",
  UPDATE_SUBCATEGORY_API : BASE_URL + "/subcategory/update",
  GET_ALL_SUBCATEGORY_API : BASE_URL + "/subcategory/all",
  DETAILS_SUBCATEGORY_API : BASE_URL + "/subcategory",





}