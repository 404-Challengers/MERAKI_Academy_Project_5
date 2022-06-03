import "./style.css";
import React, { useState } from "react";
import UsersControlPanel from "../AllUsers";
import { Link ,useNavigate} from "react-router-dom";
import AdminProducts from "../AdminProducts";

const LeftSideBar = () => {
  const navigate = useNavigate()
  const [productsSection, setProductsSection] = useState(false);
  const [userSection, setUserSection] = useState(false);
  return (
    <>
      <div className="Links-Admin">
        <a
          onClick={() => {
            setProductsSection(true);
            setUserSection(false);
          }}
        >
          Products
        </a>
        <a
          onClick={() => {
            setUserSection(true);
            setProductsSection(false);
          }}
        >
          Users
        </a>
      </div>
      {productsSection ? <AdminProducts /> : ""}
      {userSection ? <UsersControlPanel /> : ""}
    </>
  );
};

export default LeftSideBar;
