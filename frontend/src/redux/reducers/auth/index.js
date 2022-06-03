import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token:localStorage.getItem("token") || "",
    isLoggedIn:localStorage.getItem("token") ? true:false,
  },
  reducers: {
    setlogin: (state, action) => {
      state.token = action.token;
      state.isLoggedIn = true;
        localStorage.setItem('token',action.token);
    },
    logout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setlogin, logout } = auth.actions;

export default auth.reducer;
