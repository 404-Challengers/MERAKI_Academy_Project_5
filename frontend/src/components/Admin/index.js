import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAllUsers } from "../../redux/reducers/admin";
import LeftSideBar from "../LeftBar";


const AdminPanel = () => {

  
  return <div className="AdminPanelContainer">
<LeftSideBar />

  </div>;
};

export default AdminPanel;
