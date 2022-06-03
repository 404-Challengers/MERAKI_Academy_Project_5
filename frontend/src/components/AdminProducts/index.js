import "./style.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProduct, deleteProduct } from "../../redux/reducers/admin";

const AdminProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Product } = useSelector((state) => {
    return {
      Product: state.admin.Product,
    };
  });

  const getAllProducts = async () => {
    axios
      .get("http://localhost:5000/product/")

      .then((result) => {
        console.log(`INSIDE REQUEST`);
        dispatch(setProduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const productDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/admin/delete_product/${productId}`)
      .then((result) => {
        dispatch(deleteProduct(productId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(Product, "PPP");

  return (
    <div className="ProductsInControlPanel">
      <div className="datails-Product">
        <p>#</p>
        <p>ProductName</p>
        <p>Category</p>
        <p>Brand</p>
      </div>
      {Product &&
        Product.map((element, i) => {
          return (
            <div className="datails-Product">
              <p>{i + 1}</p>
              <p>{element.title}</p>
              <p>{element.categoryName}</p>
              <p>{element.brandName}</p>
              <div className="Btns-A">
                <p
                  onClick={() => {
                    productDelete(element.id);
                  }}
                >
                  Delete
                </p>
                <p
                  onClick={() => {
                    navigate(`/admin/product/${element.id}`);
                  }}
                >
                  Update
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AdminProducts;
