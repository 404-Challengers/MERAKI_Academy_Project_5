const connection = require("../models/db");

const getAllCommentsById = (req, res) => {
  const product_id = req.params.id;
  const query = `SELECT * FROM comments RIGHT JOIN users ON users.id=comments.user_id  
  WHERE comments.is_deleted=0  AND comments.product_id=? ;`;
  data = [product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "The comment is Not Found",
      });
    }
    res.status(200).json({
      success: true,
      massage: ` comment with on product id  number :   ${product_id} `,
      result: result,
    });
  });
};
const createNewComment = (req, res) => {
  const product_id = req.params.id;
  const user_id = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, product_id, user_id) VALUES (?,?,?)`;
  const data = [comment, product_id, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return  res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      result: result,
    });
  });
};

const updatCommentById = (req, res) => {
  const { comment } = req.body;
  const comment_id = req.params.id;
  const query = `UPDATE comments SET comment=? WHERE id=? AND is_deleted=0;`;
  const data = [comment, comment_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `The comment of id number : ${comment_id} is not found`,
        err: err,
      });
    }

    if (result.affectedRows != 0) {
      return  res.status(201).json({
        success: true,
        massage: `comment updated`,
        result: result,
      });
    } else {
      res.status(201).json({
        success: false,
        massage: `The comment is Not Found`,
      });
    }
  });
};

const deleteComment = (req, res) => {
  const comment_id = req.params.id;
  const query = `UPDATE comments SET is_deleted=1 WHERE id=? AND is_deleted=0;`;
  const data = [comment_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `No comment for this product `,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Deleted comment for the id number : ${comment_id} `,
      result: result,
    });
  });
};

module.exports = {
  getAllCommentsById,
  createNewComment,
  updatCommentById,
  deleteComment,
};
