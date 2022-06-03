import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    category: [],
    Product: [],
    oneProduct: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    setProduct: (state, action) => {
      state.Product = action.payload;
    },
    addProduct: (state, action) => {
      state.Product.push(action.payload);
    },
    deleteProduct: (state, action) => {
      //payload id ,
      state.Product = state.Product.filter((element) => {
        return element.id !== action.payload;
      });
    },
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    updateOneProduct: (state, action) => {
      state.oneProduct = state.oneProduct.map((element) => {
        if (element.id === action.payload.id) {
          console.log(action.payload);
          return {
            ...element,
            categoryName: action.payload.categoryName,
            title: action.payload.title,
            description: action.payload.description,
          };
        }
        return element;
      });
      console.log(state.oneProduct);
    },
  },
});

export const {
  setAllUsers,
  setCategory,
  addCategory,
  setProduct,
  addProduct,
  deleteProduct,
  setOneProduct,
  updateOneProduct,
} = admin.actions;

export default admin.reducer;
