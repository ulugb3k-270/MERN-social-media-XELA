import React, { useState } from "react";

// STYLES
import "./posts.scss";

// COMPONENTS
import Post from "./Post/Post";

// REDUX
import { useSelector } from "react-redux";
import { getPosts, getPopularPosts } from "../../../actions/posts";
import { useDispatch } from "react-redux";

// MUI
import { CircularProgress } from "@material-ui/core";

const Posts = () => {
  const [activeButton, setActiveButton] = useState(true);
  const arr = [
    {
      creatorId: "62c5dc28b293f7e593d1e1a0",
      creatorName: "Ulugbek",
      creatorImage: "https://firebasestorage.googleapis.com/v0/b/shorturl-phototourl.appspot.com/o/message%2F810472051%2Fimage?alt=media&token=1215db97-115f-4ddb-bf2a-ae43592f31c9",
      creatorUsername: "ulugbek",
      creatorLocation: "uzb",
      message: "HAPPY NEW YEAR",
      image: "https://external-preview.redd.it/0n6iBJzBY-gLgb6Yn8rEF7gKGqNOLM2JrtZTd2BoWqg.png?auto=webp&s=f68de69a27bb3a0831695b86574f4ab129b65c9f",
      likes: ["123", "32"],
      createdAt: new Date(),
      verified: true
    },
    {
      creatorId: "9992",
      creatorName: "Nobody",
      creatorImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      creatorUsername: "nobody",
      creatorLocation: "uzb",
      message: "TEST",
      image: "https://media-exp1.licdn.com/dms/image/C5612AQFgrBZUgERfwA/article-inline_image-shrink_1000_1488/0/1520194990944?e=1663200000&v=beta&t=59vDLfqMgaVdHbWcUwnEf8dZxvAQAkc5JbGCIqmpjzk",
      likes: ["123", "32", '123'],
      createdAt: new Date(),
      verified: false
    },
  ];
  const dispatch = useDispatch();
  return (
    <div className="posts">
      <div className="posts__top">
        <h3>Feeds</h3>
        <div className="posts__top-btns">
          <button
            className={`posts__top-btn ${activeButton && "active"}`}
            onClick={() => {
              setActiveButton(true);
              dispatch(getPosts());
            }}
          >
            Latest
          </button>
          <button
            className={`posts__top-btn ${!activeButton && "active"}`}
            onClick={() => {
              setActiveButton(false);
              dispatch(getPopularPosts());
            }}
          >
            Popular
          </button>
        </div>
      </div>
      <div className="posts__post">
        {true ? (
          <>
            {arr?.map((post, id) => (
              <Post post={post} key={id} />
            ))}
          </>
        ) : (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
      </div>
    </div>
  );
};

export default Posts;
