import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {addCategory} from "../../redux/reducers/admin"
import Category from "../Category";

import axios from "axios";

//=========================Redux======================================

import { useSelector, useDispatch } from "react-redux";
//   CreateCategory  1111111
const CreateCategory = ()=>{
    const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector((state) => {
      return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
    });
  
    const navigate = useNavigate();
  
    const [categoryName, setcategoryName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
  
    //===============================================================
  
    const NewCategory = async (e) => {
      e.preventDefault();
      try {
        const category = {
            categoryName,
        };
        const result = await axios.post(
          `http://localhost:5000/admin/create_category`,
          category,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data.success) {
          setStatus(true);
          setMessage(`${categoryName} created`);
          console.log(result.data.result.insertId);
          dispatch(addCategory(category));
        }
        console.log(category);
      } catch (error) {
        if (!error.response.data.success) {
          setStatus(false);
          setMessage(error.response.data.message);
        }
      }
    };
  
    //===============================================================
  
    useEffect(() => {},[]);
  
    //===============================================================
    return (
      <div className="categoryContainer1">
      <div className="categoryReturn">
      {/* <Category/> */}
        <form className="NewCategory" onSubmit={NewCategory
        
        // navigate(`/admin/create_brand/${result.data.result.insertId}`)
        }>
          <br />
          <input
            type="text"
            placeholder="category Name here"
            onChange={(e) => setcategoryName(e.target.value)}
          />
          <br />

          <br />
          <button>Create New category</button>
        </form>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
      </div>
    );
  };
  
  export default CreateCategory;



