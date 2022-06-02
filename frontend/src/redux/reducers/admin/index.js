import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const  { 
getAllUsers
} = admin.actions

export default admin.reducer