import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneBrand } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";
const OneBrand=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const { oneBrand } =useSelector((state) => {
        return {
           oneBrand:state.products.oneBrand,
        };
      });
      const getOneBrand = () => {
       
axios.get(`http://localhost:5000/product/brand/${id}`)
.then((result) => {
console.log(result, "******one brand by id ");
dispatch(setOneBrand(result.data.result));
setMessage("one brand");
})
.catch((err) => {
console.log(err);
setMessage(err.response.data.message);
});
};
useEffect(() => {
    getOneBrand();
}, []);
return(
 
    <div  className="Container">
        <div  className="row-Container" >
{
    oneBrand &&
    oneBrand.map((brand,i)=>{
        return (
            <div  key={i}    className="product-box">
              <div>
                <img className="ONEproductImage" src={brand.productImage} />
              </div>
              <div className="datails-Container">
                <p>{brand.title}</p>
                <p>{brand.categoryName}</p>
                <p>{brand.description}</p>
                <p>{brand.price}</p>
                <p>{brand.brandName}</p>
              </div>
            </div>
          );
    })
}
</div>
    </div>
)
};
export default OneBrand
