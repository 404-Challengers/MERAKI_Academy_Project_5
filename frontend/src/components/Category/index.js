import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategory } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { category } = useSelector((state) => {
    return {
      category: state.products.category,
    };
  });
  const getAllCategory = () => {
    axios
      .get(`http://localhost:5000/product/categoryName`)
      .then((result) => {
        console.log(result, "****** category");
        dispatch(setCategory(result.data.result));
        setMessage("ALL Category");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div>
      {category &&
        category.map((category, i) => {
          return (
            <div
              onClick={() => {
                navigate(`/category/${category.id}`);
              }}
            >
              <p>{category.categoryName}</p>
            </div>
          );
        })}  
    </div>
  );
};

export default Category;
