import React, { useEffect, useState } from "react";
import "../../style_components/article/comment.css";
import defaultUserImage from "../../icons/defaultUser.jpg";
import inactiveLike from "../../icons/article/inactiveLike.svg";
import activeLike from "../../icons/article/activeLike.svg";
import axios from "axios";

export default function Comment({ comment, updateLikesCount, updateDislikesCount, deleteComment, editComment }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [commenter, setCommenter] = useState(null);
  const bearer = "Bearer ";

  useEffect(() => {
    if (comment) {
    getUserById(comment.userId);
    getLikeDislikeStatusByUserIdAndCommentId(currentUser.id, comment.id);
    }
  }, []);

  function getUserById(userId) {
      axios
        .get("http://localhost:8080/api/v1/users/" + userId, {
          headers: {
            authorization: bearer + currentUser["jwt"],
          },
        })
        .then((response) => {
          const data = response.data;
            setCommenter(data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("error.response.status: ", error.response.status);
          }
        });
  }

  function getLikeDislikeStatusByUserIdAndCommentId(userId, commentId) {
    axios
      .get("http://localhost:8080/api/v1/like-dislike-statuses/users/" + userId + "/comments/" + commentId, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setLikeDislikeStatus(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function postLikeDislikeStatus(newLikeDislikeStatus) {
    axios
      .post("http://localhost:8080/api/v1/like-dislike-statuses", newLikeDislikeStatus, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function putLikeDislikeStatus(likeDislikeStatus) {
    console.log("put likedislike: " + likeDislikeStatus);
    axios
      .put("http://localhost:8080/api/v1/like-dislike-statuses/" + likeDislikeStatus.id, likeDislikeStatus, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function deleteLikeDislikeStatus(likeDislikeStatusId) {
    axios
      .delete("http://localhost:8080/api/v1/like-dislike-statuses/" + likeDislikeStatusId, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }


  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const [likeDislikeStatus, setLikeDislikeStatus] = useState(null);

  function toggleLike(e) {

    if (likeDislikeStatus === null || likeDislikeStatus === undefined || likeDislikeStatus === "") {
      const lDStatus = {
        likedDisliked: true,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      updateLikesCount(comment.likes + 1, comment.id);
      postLikeDislikeStatus(lDStatus);
    } else if (likeDislikeStatus.likedDisliked === true) {
      deleteLikeDislikeStatus(likeDislikeStatus.id);
      setLikeDislikeStatus(null);
      updateLikesCount(comment.likes - 1, comment.id);
    } else {
      const lDStatus = {
        id: likeDislikeStatus.id,
        likedDisliked: true,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      putLikeDislikeStatus(lDStatus);
      updateLikesCount(comment.likes + 1, comment.id);
      updateDislikesCount(comment.dislikes - 1, comment.id);
    }
  }

  function toggleDislike(e) {
    e.preventDefault();

    if (likeDislikeStatus === null || likeDislikeStatus === undefined || likeDislikeStatus === "") {
      updateDislikesCount(comment.dislikes + 1, comment.id);
      const lDStatus = {
        likedDisliked: false,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      postLikeDislikeStatus(lDStatus);
    } else if (likeDislikeStatus.likedDisliked === false) {
      deleteLikeDislikeStatus(likeDislikeStatus.id);
      setLikeDislikeStatus(null);
      updateDislikesCount(comment.dislikes - 1, comment.id);
    } else {
      const lDStatus = {
        id: likeDislikeStatus.id,
        likedDisliked: false,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      updateLikesCount(comment.likes - 1, comment.id);
      updateDislikesCount(comment.dislikes + 1, comment.id);
      putLikeDislikeStatus(lDStatus);
    }
  }

  function formatDate(date) {
    if (isNaN(date.getFullYear())) {
      date = new Date();
    }
    if (date.getFullYear() === new Date().getFullYear()) {
      return monthNames[date.getMonth()] + " " + date.getDate();
    }
    return (
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      " " +
      date.getFullYear()
    );
  }

  function deleteCommentById() {
    deleteComment(comment.id);
  }

  return (
    <div className="comment-body">
      <img className="user-image" src={commenter && commenter["photo"] ? commenter["photo"]: defaultUserImage} alt="commenter" />
      <div className="comment-content">
        <span className="commenter-name">
          {commenter !== null ? commenter["firstName"] + " " + commenter["lastName"] : "Firstname Lastname"}
        </span>
        <span className="comment-date">
          {formatDate(new Date(comment.createDateTime))}
        </span>
        {comment.isEdited ? (
          <span className="edited"> edited</span>
        ) : (
          <></>
        )}
        <p className="comment-text">{comment.commentText}</p>
        <hr />
        <div className="underline-options">
          {" "}
          {likeDislikeStatus === null || likeDislikeStatus === undefined || likeDislikeStatus === "" ? (
            <span>
              <button className="like" onClick={toggleLike}>
                <img className="like-icon" src={inactiveLike} alt="like" />
                {comment.likes}
              </button>
              <button className="dislike" onClick={toggleDislike}>
                <img
                  className="dislike-icon"
                  src={inactiveLike}
                  alt="dislike"
                />{" "}
                {comment.dislikes}
              </button>
            </span>
          ) : (
            <span>
              {likeDislikeStatus.likedDisliked === true ? (
                <span>
                  <button className="like" onClick={toggleLike}>
                    <img className="like-icon" src={activeLike} alt="like" />
                    {comment.likes}
                  </button>
                  <button className="dislike" onClick={toggleDislike}>
                    <img
                      className="dislike-icon"
                      src={inactiveLike}
                      alt="dislike"
                    />{" "}
                    {comment.dislikes}
                  </button>
                </span>
              ) : (
                <span>
                  <button className="like" onClick={toggleLike}>
                    <img className="like-icon" src={inactiveLike} alt="like" />
                    {comment.likes}
                  </button>
                  <button className="dislike" onClick={toggleDislike}>
                    <img
                      className="dislike-icon"
                      src={activeLike}
                      alt="dislike"
                    />{" "}
                    {comment.dislikes}
                  </button>
                </span>
              )}
            </span>
          )}
          {comment.userId === currentUser.id ||
          currentUser.role === "ADMIN" ? (
            <span>
              <button className="delete" onClick={deleteCommentById}>Delete</button>
              <button className="comment">Comment</button>
              <button className="edit" onClick={() => editComment(comment)}>
                Edit
              </button>
            </span>
          ) : (
            <button className="comment">Comment</button>
          )}
        </div>
      </div>
    </div>
  );
}
