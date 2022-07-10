import {
  AUTH,
  LOG_OUT,
  SAVE_POST,
  IS_LOADING,
  ERROR,
} from "../constants/actionTypes";

const initialState = {
  authData: null,
  user: false,
  isLoading: false,
  infoMsg: "",
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return {
        ...state,
        authData: action.payload,
        user: true,
        isLoading: false,
        infoMsg: "Logged in. Please wait.",
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ERROR:
      return {
        ...state,
        isLoading: false,
        infoMsg: "Error, Please check your email and password and try again !",
      };

    case LOG_OUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null, user: false, infoMsg: "" };

    case "SET_USER":
      return { ...state, user: true, authData: action.payload };

    // case SAVE_POST:
    //   return { ...state, authData: action.payload };

    default:
      return { ...state };
  }
};
