import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneProduct, updateOneProduct } from "../../redux/reducers/admin";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [category, setCategory] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [categName, setCatgName] = useState("");
  //set For Update ,
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [brand_id, setBrand_id] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { oneProduct } = useSelector((state) => {
    return {
      oneProduct: state.admin.oneProduct,
    };
  });

  const CategoryInsideUpdate = () => {
    axios
      .get(`http://localhost:5000/product/categoryName`)
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOneProduct = () => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((result) => {
        console.log(result, "******one product");
        dispatch(setOneProduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOneProduct();
    CategoryInsideUpdate();
  }, []);

  const updateProduct = (productId) => {
    axios
      .put(`http://localhost:5000/admin/update_product/${productId}`, {
        title,
        description,
        productImage,
        price,
        quantity,
        category_id,
        brand_id,
      })
      .then((result) => {
        console.log(result);
        setMessage("UPDATED");
        dispatch(
          updateOneProduct({
            id: productId,
            title,
            description,
            productImage,
            price,
            quantity,
            categoryName:categName,
            category_id,
            brand_id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {oneProduct &&
        oneProduct.map((element, i) => {
          return (
            <>
              <div className="UpdateProductContainer">
                <div className="photoContainer-Up">
                  <img className="IMAGE" src={element.productImage} />
                </div>

                <div className="INFO">
                  <div className="flexDiv">
                    <p>Product Name </p>
                    <input
                      defaultValue={element.title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flexDiv">
                    <p>Product Description </p>
                    <input
                      defaultValue={element.description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flexDiv">
                    <p>Price</p>
                    <input
                      type="number"
                      defaultValue={element.price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flexDiv">
                    <p>In Stock</p>
                    <input
                      type="number"
                      defaultValue={element.quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="catgDiv">
                    <p>Category</p>
                    {isChanged ? (
                      categName
                    ) : (
                      <span>{element.categoryName}</span>
                    )}
                    <button
                      onClick={() => {
                        setIsClicked(true);
                      }}
                    >
                      Change Category
                    </button>
                  </div>
                </div>
              </div>
              {isClicked ? (
                <span className="Categ">
                  {category &&
                    category.map((el) => {
                      return (
                        <p
                          onClick={(e) => {
                            setIsClicked(false);
                            setCategory_id(el.id);
                            setIsChanged(true);
                            setCatgName(e.target.innerText);
                          }}
                        >
                          {el.categoryName}
                        </p>
                      );
                    })}
                </span>
              ) : (
                ""
              )}
              <div className="Test">
                <p
                  onClick={() => {
                    updateProduct(oneProduct[0].id);
                  }}
                >
                  UPDATE
                </p>
                <span
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </span>
              </div>
            </>
          );
        })}
      <h1>{message}</h1>
    </>
  );
};

export default UpdateProduct;
