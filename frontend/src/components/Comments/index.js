import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {  setComment } from "../../redux/reducers/comments"
import { useNavigate, useParams } from "react-router-dom";

const Comment=({id})=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { comment } = useSelector((state) => {
      return {
        comment: state.comment.comment,
      };
    });
    const [message, setMessage] = useState("");

    const getCommentById=()=>{
        console.log(id,";;;;;;;;");
      
        axios.get(`http://localhost:5000/comment/${id}`)
        .then((result) => {
            console.log(result, "**!!!!!!!**all comments ");
            dispatch(setComment(result.data.result));
            setMessage("All Comments");
            })
            .catch((err) => {
            console.log(err);
            setMessage(err.response.data.message);
            });
            };
            useEffect(() => {
                getCommentById();
            }, []);
            console.log(comment,"{{{{{{{");
            return(
             
                <div  className="Container">
                    <div  className="row-Container" >

            {
                comment &&
                comment.map((comment,i)=>{
                    return (
                        <div  key={i}    className="comment">
                            <p></p>
                           <p>{comment.comment}</p>
                        </div>
                      );
                })
            }
            </div>
                </div>
            )
}
export default Comment