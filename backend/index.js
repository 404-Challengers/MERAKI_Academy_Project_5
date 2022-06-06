const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
app.use(express.json());
app.use(cors());

//Routers
const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const commentRouter = require("./routes/comment");
const ratingRouter = require("./routes/rating");
const UserRouter = require("./routes/user");
const ordersRouter = require("./routes/orders");
const WishListRouter = require("./routes/wishlist");
const loginGoogleRouter=require("./routes/loginGoogle");

app.use("/role", rolesRouter);
app.use("/permission", permissionsRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/comment", commentRouter);
app.use("/rating", ratingRouter);
app.use("/user", UserRouter);
app.use("/order", ordersRouter);
app.use("/WishList", WishListRouter);
app.use("/LoginGoogle",loginGoogleRouter)
;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server on ${PORT}`));
