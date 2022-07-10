import React, { useState, useEffect } from "react";

// STYLES
import "./home.scss";

// ICONS
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

// COMPONENTS
import Stories from "./Stories/Stories";
import Posts from "./Posts/Posts";
import BackToTop from "react-back-to-top-button";

// REDUX
import { useDispatch, useSelector } from "react-redux";
// import { getPosts } from "../../actions/posts";

const Home = ({ setIsUploading, isUploading }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <main className="home">
      <div className="home__top">
        <div className="home__top-search">
          <BiSearch />
          <input type="text" placeholder="Search..." />
        </div>
        <button
          className={`home__top-btn ${!user && "disabled"}`}
          disabled={user ? false : true}
          onClick={() => setIsUploading((prevState) => !prevState)}
        >
          {!isUploading ? <AiOutlinePlus /> : <GrClose />}
          <span>{isUploading ? "Cancel " : "Create new post"}</span>
        </button>
      </div>
      <Stories />
      <Posts />

      <BackToTop
        showOnScrollDown
        showAt={100}
        speed={1000}
        easing="easeInOutQuint"
        className="home__arrowUp"
      >
        <BsArrowUpCircleFill className={`back-to-top-button `} />
      </BackToTop>
    </main>
  );
};

export default Home;
