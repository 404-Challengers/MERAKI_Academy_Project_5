import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setComment, deleteComments,updateComments,addComments } from "../../redux/reducers/comments";
import { useNavigate, useParams } from "react-router-dom";

const Comment = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { comment ,token} = useSelector((state) => {
    return {
      comment: state.comment.comment,
      token:state.auth.token
    };
  });
  const [message, setMessage] = useState("");
const [newComment, setNewComment] = useState("");
const [addComment, setAddComment] = useState("")
const [click, setClick] = useState(false)
  const getCommentById = () => {
    axios
      .get(`http://localhost:5000/comment/${id}`)
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
  const deleteComment = (commentId) => {
      console.log(commentId,"PPPPPPPPPpP");
    axios
      .delete(`http://localhost:5000/comment/${commentId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
  
      })
      .then((result) => {
        dispatch(deleteComments(commentId));
        setMessage(" Comment is deleted");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const updateComment = (commentId) =>{
axios.put(`http://localhost:5000/comment/${commentId}`,{
comment:newComment
},
{
    headers: {
        Authorization: `Bearer ${token}`,
      },

  })
  .then((result) => {
      console.log(result,"ooooooooo");
    dispatch(updateComments({commentId:commentId,comment:newComment}));
    setMessage(" Comment is updated");
  })
  .catch((err) => {
    console.log(err);
    setMessage(err.response.data.message);
  });

  };
const createComment = () =>{
        axios
          .post(
            `http://localhost:5000/comment/${id}`,
            {
              comment:addComment,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((result) => {
            dispatch(addComments({
                comment:addComment,id:result.data.result.insertId
            }))
            
        })
          .catch((err) => {
            setMessage(err.response.data.message);
          });
     
}
  useEffect(() => {
    getCommentById();
  }, []);
  console.log(comment, "{{{{{{{");
  return (
    <div className="Container">
      <div className="row-Container">
          <input type={"textArea"} placeholder="write yor comment..." onChange={(e)=>{setAddComment( e.target.value) }}/>
             <button onClick={()=>{
                 createComment();
             }}>Add </button>
        
        {comment &&
          comment.map((comment, i) => {
            return (
              <div key={i} className="comment">
                <p></p>
                <p>{comment.comment}</p>
                <p
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  Delete
                </p>
                {/* { click ?  */}
                
                <p
                  onClick={() => {
                    updateComment(comment.id);

                  }}
                >
                  update
                </p>
            {/* // : "" } */}
                    <input
                      defaultValue={comment.comment}
                      onChange={(e) => {
                        setNewComment(e.target.value);
                      }}
                    />

              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Comment;
