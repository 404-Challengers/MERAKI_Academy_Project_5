//userprofile
// i need to git the user info from the databace using the userid from
//the token

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cloud from "../Cloud";
import {
  setuserProfile,
  deleteuserProfile,
  updateuserProfile,
} from "../../redux/reducers/user";
const UserProfile = () => {
  // to see user profaile set from local stoge
  const { userProfile, userId } = useSelector((state) => {
    return {
      // userid:state.auth.userid,
      userProfile: state.user.userProfile,
      userId: state.auth.userId,
    };
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  const getUserById = () => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((result) => {
        console.log(result, "user profile");
        dispatch(setuserProfile(result.data.result));
        setMessage("user with ID");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
// const [newImg, setNewImg] = useState("");
  const updateUserById = () => {
   let newImg=url || profileImage;
    axios
      .put(
        `http://localhost:5000/user/${id}`,

        {
          id: id,
          firstName,
          lastName,
          phoneNumber,
          profileImage:newImg,
        }
      )

      .then((result) => {
        console.log(url, "urllllllll");
        console.log(result, "user profile");
        dispatch(
          updateuserProfile({
            id: id,
            firstName,
            lastName,
            phoneNumber,
            profileImage:newImg,
          })
        );

        setMessage("user with ID is redy to be updated");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const [isClicked, setIsClicked] = useState(false);

  const DeletUserById = () => {
    axios
      .delete(
        `http://localhost:5000/user/${id}`,
        {
          id: id,
        }
      )
      .then((result) => {
        console.log(result, "user profile");
        dispatch(
          deleteuserProfile({
            id: id,
          })
        );
        setMessage("user with ID is Deleted");
        navigate("/register");
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div className="big_container">
      {userProfile &&
        userProfile.map((user, i) => {
          return (
            <div className="sec_container">
              <div className="inner_container">
              <div className="userProfileImg">
                <img  src={user.profileImage} />
                <p>Name :{user.firstName}</p>
              </div>
              <div className="datails-Container_profile">
                <p>FirstName :{user.firstName}</p>
                <p>LastName :{user.lastName}</p>
                <p>PhoneNumber :{user.phoneNumber}</p>
              </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsClicked(true);
                    {
                      setFirstName(user.firstName);
                    }
                    {
                      setLastName(user.lastName);
                    }
                    {
                      setPhoneNumber(user.phoneNumber);
                    }
                    {
                      setProfileImage(user.profileImage);
                    }
                  }}
                >
                  {" "}
                  update your info
                </button>
                <br/>
                <button
                  onClick={() => {
                    DeletUserById(id);
                    setMessage("user hase been deleted");
                  }}
                >
                  Delet your Profaile
                </button>

                {isClicked ? (
                  <div>
                    <div className="inputbox">
                      <input
                        defaultValue={firstName}
                        type="text"
                        required="required"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <span>firstName</span>
                    </div>
                    <div className="inputbox">
                      <input
                        defaultValue={lastName}
                        type="text"
                        required="required"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <span>lastName</span>
                    </div>
                    <div className="inputbox">
                      <input
                        defaultValue={phoneNumber}
                        type="text"
                        required="required"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <span>phoneNumber</span>
                    </div>
                    <div className="inputbox">
                      <input
                        defaultValue={profileImage}
                        type="text"
                        required="required"
                        onChange={(e) => setProfileImage(e.target.value)}
                      />
                      <span>profileImage</span>
                    </div>
                    <button
                      onClick={() => {
                        updateUserById(id);
                        setIsClicked(false);
                      }}
                    >
                      {" "}
                      update
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Cloud setProfileImage={setProfileImage} url={url} setUrl={setUrl}/>
            </div>
          );
        })}
    </div>
  );
};

export default UserProfile;
