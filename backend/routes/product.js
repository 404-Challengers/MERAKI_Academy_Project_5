const express = require("express");

const productRouter = express.Router();



const {
  getOneProductById,
  getAllProduct,
  getProductByCategory,
  getProductByBrand,
  getAllCategory,getAllBrands
} = require("../controllers/product");


productRouter.get("/categoryName",getAllCategory)
productRouter.get("/brandName",getAllBrands)
productRouter.get("/:id", getOneProductById);
productRouter.get("/", getAllProduct);
productRouter.get("/category/:id", getProductByCategory);
productRouter.get("/brand/:id", getProductByBrand);

module.exports = productRouter;

