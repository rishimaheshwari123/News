import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNews: localStorage.getItem("allNews")
    ? JSON.parse(localStorage.getItem("allNews"))
    : [],
    
    category:localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : [],
    isMenuOpen:false,

 
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    saveNews: (state, action) => {
      
      state.allNews = action.payload;
      localStorage.setItem("allNews", JSON.stringify(state.allNews));
    },
    saveCategory:(state, action) => {
      console.log(action.payload)
      state.category = action.payload;
      localStorage.setItem("category", JSON.stringify(state.category));
    },

    handleIsMenuOpen: (state, action) => {
      return {
        ...state,
        isMenuOpen: action.payload !== undefined ? action.payload : !state.isMenuOpen
      };
    },

  },
});

export const { saveNews,saveCategory,handleIsMenuOpen} = newsSlice.actions;

export default newsSlice.reducer;
