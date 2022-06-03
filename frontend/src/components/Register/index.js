import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// =================================================================
const Register = () => {

    const isLoggedIn = useSelector((state) => {
        return {
            isLoggedIn: state.auth.isLoggedIn
        };
    });
    console.log(isLoggedIn);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role_id = "1";
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    // =================================================================

    const addNewUser = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:5000/register", {

                firstName,
                lastName,
                phoneNumber,
                profileImage,
                email,
                password,
                role_id,

            });
            if (result.data.success) {
                setStatus(true);
                setMessage("The user has been created successfully");
                navigate("/login");
            } else throw Error;
        } catch (error) {
            setStatus(false);
            if (error.response && error.response.data) {
                return setMessage(error.response.data.message);
            }
            setMessage("Error happened while register, please try again");
        }
    };

    // =================================================================

    return (
        <>
            <div className="center">
                {isLoggedIn ? (
                    <>
                        <h1>Register
                        <br />To get full acses </h1>

                        <center onSubmit={addNewUser}>

                            <div className="inputbox">
                                <input
                                    type="text"
                                    required="required"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <span>enter your first Name</span>
                            </div>


                            <div className="inputbox">
                                <input
                                    type="text"
                                    required="required"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <span>enter your Last Name</span>
                            </div>


                            <div className="inputbox">
                                <input
                                    type="text"
                                    required="required"

                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <span>enter your phone Number</span>
                            </div>



                            <div className="inputbox">
                                <input
                                    type="text"
                                    required="required"
                                    onChange={(e) => setProfileImage(e.target.value)}
                                />
                                <span>enter your profile Image</span>
                            </div>



                            <div className="inputbox">
                                <input
                                    type="text"
                                    required="required"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span>Email</span>
                            </div>

                            <div className="inputbox">
                                <input
                                    type="text"
                                    required="required"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span>enter your password</span>
                            </div>

                            <button>Register</button>

                            {status
                                ? message && <div className="SuccessMessage">{message}</div>
                                : message && <div className="ErrorMessage">{message}</div>}
                        </center>

                    </>
                ) : (
                    <p>Logout First</p>
                )}
            </div>
        </>
    );
};

export default Register;
