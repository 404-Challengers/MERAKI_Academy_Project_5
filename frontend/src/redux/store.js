import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/products/index"
import adminReducer from "../redux/reducers/admin";
import authReducer from "../redux/reducers/auth"
import commentReducer from "../redux/reducers/comments"
export default configureStore({
  reducer: {
  products:productReducer,
  admin: adminReducer,
  auth: authReducer,
  comment:commentReducer
  },
});
