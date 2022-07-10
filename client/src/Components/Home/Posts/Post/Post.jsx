import React, { useState } from "react";

// STYLES
import "./post.scss";

// ICONS
import {
  AiOutlineHeart,
  AiTwotoneHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

// REACT-ROUTED-DOM
import { Link } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../../../actions/posts";
import { saveMessage } from "../../../../actions/auth";

// ASSETS
import checkAdmin from "../../../../assets/admins";

const Post = ({ post }) => {
  // ========= VARIABLES ========== //

  const [readMore, setReadMore] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  // ========= FUNCTIONS =========== //

  const saveBookmark = () => {
    dispatch(saveMessage(post._id));
  };

  const likeBtn = () => {
    dispatch(likePost(post._id));
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="post">
      <div className="post__profile">
        <div className="post__profile-details">
          <img src={post.creatorImage} alt={post.creatorName} />
          <div>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              {post.creatorName}{" "}
              {checkAdmin(post?.creatorId) && (
                <img
                  src="https://img.icons8.com/color/48/000000/verified-badge.png"
                  style={{
                    width: "14px",
                    objectFit: "contain",
                    height: "14px",
                    marginLeft: "5px",
                  }}
                  alt=""
                />
              )}
            </Link>
            <p>@{post.creatorUsername}</p>
          </div>
        </div>
        {checkAdmin(post?.creatorId) &&
          (post?.creatorId === user?.user?._id && (
            <AiOutlineDelete className="delete-icon" />
          ))}
      </div>

      <div className="post__content">
        <img src={post.image} alt="" className="image" />
        <p className="message">
          {truncate(post.message, readMore ? 999 : 200)}{" "}
          {post.message.length > 200 && (
            <span onClick={() => setReadMore((prevState) => !prevState)}>
              read {readMore ? "less" : "more"}
            </span>
          )}
        </p>
      </div>

      <div className="post__actions">
        <div className="post__actions-action">
          <div className="like">
            {!post?.likes?.find((like) => like === user?.user?._id) ? (
              <AiOutlineHeart className=" icon" onClick={likeBtn} />
            ) : (
              <AiTwotoneHeart className="icon liked" onClick={likeBtn} />
            )}
            {post?.likes?.length}
          </div>
          <div className="comment disabled">
            <BiComment />
            {post?.comments?.length}
          </div>
        </div>

        {true ? (
          <BsBookmark onClick={saveBookmark} />
        ) : (
          <BsBookmarkFill className="bookmarkFilled" onClick={saveBookmark} />
        )}
      </div>
    </div>
  );
};

export default Post;
