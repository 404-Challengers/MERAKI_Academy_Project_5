import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneCategory } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";
const OneCategory=()=>{
  const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const { oneCategory } =useSelector((state) => {
        return {
            oneCategory:state.products.oneCategory,
        };
      });
      const getOneCategory = () => {
          console.log();
axios.get(`http://localhost:5000/product/category/${id}`)
.then((result) => {
  console.log(result, "******one category by id ");
  dispatch(setOneCategory(result.data.result));
  setMessage("one category");
})
.catch((err) => {
  console.log(err);
  setMessage(err.response.data.message);
});
};
useEffect(() => {
    getOneCategory();
}, []);
return (
    <div className="Container">
      <div  className="row-Container">
      {oneCategory &&
        oneCategory.map((product, i) => {
          return (
            <div key={i} className="category-box">
              <div className="image-Container"  >
                <img className="ONEProductImage" src={product.productImage} />
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
    </div>
    </div>
  
  );
};
export default OneCategory