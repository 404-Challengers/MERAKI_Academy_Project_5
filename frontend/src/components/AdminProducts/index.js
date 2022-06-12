import "./style.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProduct, deleteProduct } from "../../redux/reducers/admin";
import { MdProductionQuantityLimits } from "react-icons/md";
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
      .get(`http://localhost:5000/product/?page=1&limit=15`)

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
    <div className="Center-Container-productAdmin">
      <div className="clientsBar">
        <p>
        <MdProductionQuantityLimits /> Products
        </p>
      </div>
    <div className="ProductsInControlPanel">
      <div className="details-Product-row">
        <p className="table2">#</p>
        <p className="table2">ProductName</p>
        <p className="table2">Category</p>
        <p className="table2">Brand</p>
      </div>
      {Product &&
        Product.map((element, i) => {
          return (
            <div className="details-Product-row">
              <div className="details-Oneproduct">
              <p className="table2">{i + 1}</p>
              <p className="table2">{element.title}</p>
              <p className="table2">{element.categoryName}</p>
              <p className="table2" >{element.brandName}</p>
              </div>
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
    </div>
  );
};

export default AdminProducts;
