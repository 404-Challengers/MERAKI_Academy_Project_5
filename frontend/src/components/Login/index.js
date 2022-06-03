import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setlogin } from "../../redux/reducers/auth";
const Login = () => {
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    console.log("Login:");
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(res);
      if (res) {
        setMessage("");
        dispatch(setlogin(res.data));
        localStorage.setItem("token", res.data.token);
        navigate("/Product");
        // saveToken(res.data.token);
        // console.log(res.data);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
    }
  });
  return (
    <>
      <div className="center">
        <h1> login know to </h1>
        <center onSubmit={login}>
          <br />

          <div className="inputbox">
            <input
              type="text"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </div>

          <br />
          <div className="inputbox">
            <input
              type="password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </div>
          <br />
          <button
            className="inputbox"
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>

          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </center>
      </div>
    </>
  );
};

export default Login;
