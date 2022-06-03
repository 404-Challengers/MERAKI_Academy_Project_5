import "./style.css"
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Category from "../Category";
import Brand from "../Brand";

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="NavBar">
      NavBar
      <Category />
      <br/>
      <Brand/>
    </div>
  );
};

export default NavBar;
