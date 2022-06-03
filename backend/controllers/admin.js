/* Importing the connection to the database. */
const connection = require("../models/db");
/* A function that creates a new category. */
const createNewCategory = (req, res) => {
  const { categoryName } = req.body;
  const query = `INSERT INTO categories (categoryName) VALUES (?);`;
  const data = [categoryName];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: `${categoryName} created`,
      result: result,
    });
  });
};

/* A function that creates a new brand. */
const createNewBrand = (req, res) => {
  const id = req.params.id;
  const { brandName } = req.body;
  const query = `INSERT INTO brands (brandName,category_id) VALUES (?,?);`;
  const data = [brandName, id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `${brandName} created`,
      result: result,
    });
  });
};

/* A function that creates a new product. */

const addProduct = (req, res) => {
  const img=`https://hnsgsfp.imgix.net/9/images/detailed/44/Microsoft_13.5-inch_Surface_Laptop_-_Matte_Black_(Main).jpg?fit=fill&bg=0FFF&w=1536&h=900&auto=format,compress`;
  const {
    title,
    description,
    productImage,
    price,
    quantity,
    category_id,
    brand_id,
  } = req.body;
  const query = `INSERT INTO products (
            title,
            description,
            productImage,
            price,
            quantity,
            category_id,
            brand_id)
             VALUES (?,?,?,?,?,?,?);`;
  const data = [
    title,
    description,
    productImage || img,
    price,
    quantity,
    category_id,
    brand_id,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
   return   res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "product created",
      result: result,
    });
  });
};
/* Getting all the users from the database. */
const getAllusers = (req, res) => {
  const query = `SELECT * FROM users WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the users",
      result: result,
    });
  });
};
/* Deleting the user with the given id. */
const deleteUserById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET is_deleted=1 WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The user: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete user with id: ${id}`,
      result: result,
    });
  });
};
/* Deleting the product with the given id. */
const deleteProductById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE products SET is_deleted=1 WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The product: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete product with id: ${id}`,
      result: result,
    });
  });
};

const /* Updating the product with the given id. */
  updateProductById = (req, res) => {
    const {
      title,
      description,
      productImage,
      price,
      quantity,
      category_id,
      brand_id,
    } = req.body;
    const id = req.params.id;
    const istitle = title ? true : false;
    const isdescription = description ? true : false;
    const isproductImage = productImage ? true : false;
    const isprice = price ? true : false;
    const isquantity = quantity ? true : false;
    const iscategory_id = category_id ? true : false;
    const isbrand_id = brand_id ? true : false;

    const query = `UPDATE products SET 
    title=IF(${istitle},?,title),
    description=IF(${isdescription},?,description),
    productImage=IF(${isproductImage},?,productImage),
    price=IF(${isprice},?,price),
    quantity=IF(${isquantity},?,quantity),
    category_id=IF(${iscategory_id},?,category_id),
    brand_id=IF(${isbrand_id},?,brand_id) 
    WHERE id=? AND is_deleted=0  ;`;
    const data = [
      title,
      description,
      productImage,
      price,
      quantity,
      category_id,
      brand_id,
      id,
    ];

    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "server err",
          err: err,
        });
      }
      if (!result) {
        return res.status(404).json({
          success: false,
          massage: `there is no  product whith id: ${id} `,
          err: err,
        });
      }
      if (!result.changedRows) {
        return res.status(404).json({
          success: false,
          massage: `there is no changes to the product id: ${id} `,
          err: err,
        });
      }

      res.status(200).json({
        success: true,
        massage: `Succeeded to update product with id: ${id}`,
        result: result,
      });
    });
  };

/* Exporting the functions to be used in other files. */
module.exports = {
  createNewCategory,
  createNewBrand,
  addProduct,
  getAllusers,
  deleteUserById,
  deleteProductById,
  updateProductById,
};
