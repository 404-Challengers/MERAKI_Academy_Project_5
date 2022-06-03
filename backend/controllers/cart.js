const connection = require("../models/db");

const addToCart = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.id;

  const query = `INSERT INTO cart(user_id,product_id) VALUES(?,?)`;
  const data = [user_id, product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.affectedRows) {
      res.status(201).json({
        success: true,
        message: `Product with id ${product_id} Added To Cart`,
        result: result,
      });
    }
  });
};

const getUserCart = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart INNER JOIN products ON products.id = cart.product_id INNER JOIN categories ON categories.id = products.category_id INNER JOIN brands ON brands.id = products.brand_id  WHERE cart.user_id=? AND cart.is_deleted=0 `;

  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.length) {
      return res.status(200).json({
        success: true,
        message: `All Product in Cart For The User with id => ${user_id}`,
        result: result,
      });
    } else {
      res.status(403).json({
        message: `The Cart Is Empty`,
        result: result,
      });
    }
  });
};

const removeProductFromCart = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.id;

  const query = `UPDATE cart SET is_deleted=1 WHERE user_id=? AND product_id=? AND is_deleted=0`;
  const data = [user_id, product_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (result.affectedRows) {
      return res.status(201).json({
        success: true,
        message: `Product with id => ${product_id} is deleted From Cart`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Product with id =>${product_id} is Not Found Or Already Deleted From Cart `,
      });
    }
  });
};

const updateQuantity = (req, res) => {
  const product_id = req.params.id;
  const { quantity } = req.body;

  const query = `SELECT title,id,quantity FROM products WHERE id=?`;
  const data = [product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        err: err,
      });
    }
    if (result.length) {
      if (result[0].quantity - quantity < 0) {
        return res.json({
          message: `There's Only ${result[0].quantity} in Stock`,
        });
      } else {
        const query = `UPDATE products SET quantity=? WHERE id=?`;
        const remainingQuantity = result[0].quantity - quantity;
        const data = [remainingQuantity, product_id];
        connection.query(query, data, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: `Server Error`,
            });
          }
          res.status(201).json({
            message: `Order Done , and The New quantity is ${remainingQuantity}`,
            result: result,
          });
        });
      }
    }
  });
};

module.exports = {
  addToCart,
  getUserCart,
  removeProductFromCart,
  updateQuantity,
};
