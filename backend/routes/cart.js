const express = require("express");

const cartRouter = express.Router();

// controllers And middleware
const authentication = require("../middlewares/authentication");
const {
  addToCart,
  getUserCart,
  removeProductFromCart,
  updateQuantity,
} = require("../controllers/cart");

cartRouter.post("/:id", authentication, addToCart);
cartRouter.get("/", authentication, getUserCart);
cartRouter.delete("/:id", authentication, removeProductFromCart);
cartRouter.put("/:id/quantity", updateQuantity);

module.exports = cartRouter;
