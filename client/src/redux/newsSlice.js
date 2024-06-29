import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNews: localStorage.getItem("allNews")
    ? JSON.parse(localStorage.getItem("allNews"))
    : [],
 
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    saveNews: (state, action) => {
      
      state.allNews = action.payload;
      localStorage.setItem("allNews", JSON.stringify(state.allNews));
    },

  

  },
});

export const { saveNews} = newsSlice.actions;

export default newsSlice.reducer;
