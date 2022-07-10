import { AUTH, LOG_OUT, SAVE_POST, IS_LOADING, ERROR } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING });
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING });
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const saveMessage = (id) => async (dispatch) => {
  try {
    const { data } = await api.saveMessage(id);
    dispatch({ type: SAVE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};

export const error = () => {
  return {
    type: ERROR
  }
}
