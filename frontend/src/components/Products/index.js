import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../../redux/reducers/products";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { products } = useSelector((state) => {
    return {
      products: state.products.products,
    };
  });
  const getAllProducts = async () => {
    axios
      .get("http://localhost:5000/product/")

      .then((result) => {
        console.log(result, "}/!!!!}}");
        dispatch(setProducts(result.data.result));
        setMessage("ALL products");
      })
      .catch((err) => {
        console.log(err);
        // setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <p>All products</p>

      <div className="Container">
        <div className="row-Container">
          {products &&
            products.map((products, i) => {
              return (
                <div  key={i}
                  className="product-box"
                  onClick={() => {
                    navigate(`/OneProduct/${products.id}`);
                  }}
                 
                >
                  <div className="image-Container">
                    <img className="productImage" src={products.productImage} />
                  </div>
                  <div className="datails-Container">
                    <p>{products.title}</p>
                    <p>{products.categoryName}</p>
                    <p>{products.description}</p>
                    <p>{products.price}</p>
                    <p>{products.brandName}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Product;
