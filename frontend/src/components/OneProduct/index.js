import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneProduct } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../Comments";
const OneProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { oneProduct } =useSelector((state) => {
    return {
      oneProduct:state.products.oneProduct,
    };
  });
  const getOneProduct = () => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((result) => {
        console.log(result, "******one product");
        dispatch(setOneProduct(result.data.result));
        setMessage("one product");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    <div>
      {oneProduct &&
        oneProduct.map((product, i) => {
          return (
            <div>
              <div>
                <img className="ONEproductImage" src={product.productImage} />
              </div>
              <div className="datails-Container">
                <p>{product.title}</p>
                <p>{product.categoryName}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>{product.brandName}</p>

              </div>
            </div>
          );
        })}
        <div><Comment id={id}/> </div>
    </div>
  );
};

export default OneProduct;
