import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    oneProduct:[],
    category:[],
    oneCategory:[],
    brand:[],
    oneBrand:[]
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    setCategory:(state,action)=>{
      state.category=action.payload
    },
    setOneCategory:(state,action)=>{
state.oneCategory=action.payload
    },
    setBrand:(state,action)=>{
      state.brand=action.payload
          },
    setOneBrand:(state,action)=>{
      state.oneBrand=action.payload
          },

  
  },
});
export const { setProducts, setOneProduct ,setCategory,setOneCategory,setBrand, setOneBrand} = productSlice.actions;
export default productSlice.reducer;
