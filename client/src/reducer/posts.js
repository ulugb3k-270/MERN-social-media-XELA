import {
  GET_POSTS,
  CREATE_POST,
  LIKE_POST,
  GET_POPULAR_POSTS,
  GET_LATEST_POSTS,
} from "../constants/actionTypes";

const initialState = {
  globalPosts: [],
  localPosts: [],

  isLoading: false,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        localPosts: action.payload,
      };

    case GET_POPULAR_POSTS: {
      return {
        ...state,
        localPosts: state.localPosts.sort(
          (a, b) => a.likes.length - b.likes.length
        ),
      };
    }

    case "CLEAR_POSTS": {
      return {
        ...state,
        localPosts: [],
      };
    }

    // case CREATE_POST:
    //   return {
    //     ...state,
    //     localPosts: [...state.localPosts, action.payload],
    //   };
    // case LIKE_POST:
    // return{
    //   ...state,
    //   localPosts: state.localPosts.map(post => post._id === action.payload._id ? action.payload : post)
    // }

    default:
      return state;
  }
};
