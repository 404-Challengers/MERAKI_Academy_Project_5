const express = require("express");

const ratingRouter = express.Router();
//
const {
  addRatingToProduct,
  getProductRating,
} = require("../controllers/rating");
const authentication = require("../middlewares/authentication");

ratingRouter.post("/:id", authentication, addRatingToProduct);

ratingRouter.get("/:id", authentication, getProductRating);

module.exports = ratingRouter;
