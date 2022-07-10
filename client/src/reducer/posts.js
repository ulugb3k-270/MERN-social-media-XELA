import { GET_POSTS, CREATE_POST, LIKE_POST, GET_POPULAR_POSTS } from "../constants/actionTypes";

const initialState = {
  localPosts: [],
  isLoading: false,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    // case GET_POSTS:
    // case GET_POPULAR_POSTS:
    //   return {
    //     ...state,
    //     localPosts: action.payload,
    //   };
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
