import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAllUsers } from "../../redux/reducers/admin";

const UsersControlPanel = () => {
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => {
    return {
      allUsers: state.admin.allUsers,
    };
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/admin/users")
      .then((result) => {
        console.log(result);
        dispatch(setAllUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="UsersInControlPanel">
      {allUsers &&
        allUsers.map((element) => {
          return (
            <div>
              <div> {element.lastName}</div>
            </div>
          );
        })}
    </div>
  );
};

export default UsersControlPanel;
