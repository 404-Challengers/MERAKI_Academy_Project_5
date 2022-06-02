import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneProduct } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";

const OneProduct = () => {
  const { id } = useParams();
  console.log(id);
  return <div>OneProduct</div>;
};

export default OneProduct;
