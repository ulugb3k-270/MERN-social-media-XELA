import {
  GET_POSTS,
  CREATE_POST,
  LIKE_POST,
  GET_POPULAR_POSTS,
  GET_LATEST_POSTS,
} from "../constants/actionTypes";
import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();

    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPopularPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POPULAR_POSTS });
  } catch (error) {
    console.log(error);
  }
};

export const getLatestPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LATEST_POSTS });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (formData) => async (dispatch) => {
    try {
      const { data } = await api.createPost(formData);
      dispatch({ type: CREATE_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
};
