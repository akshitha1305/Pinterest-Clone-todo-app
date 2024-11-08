import jwtDecode from "jwt-decode";
import axios from "axios";

import * as userService from "../services/users.js";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const RECEIVE_SESSION_ERROR = "RECEIVE_SESSION_ERROR";
export const CLEAR_SESSION_ERROR = "CLEAR_SESSION_ERROR";

export const setAuthToken = (token) => {
  if (token) {
    userService.instance.defaults.headers.common["Authorization"] = token;
  } else {
    delete userService.instance.defaults.headers.common["Authorization"];
  }
};

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const receiveError = (error) => ({
  type: RECEIVE_SESSION_ERROR,
  error,
});

export const clearError = (error) => ({
  type: CLEAR_SESSION_ERROR,
  error,
});

export const signup = (userData) => async (dispatch) => {
  try {
    await userService.signup(userData);
    dispatch(login(userData));
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await userService.login(userData);
    const token = response.data.token;
    const auth_username = response.data.username;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("authusername", auth_username);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};


export const requestPasswordReset = (username) => async (dispatch) => {
  try {
    const response = await userService.forgot({ username });
    dispatch(clearError());
    return response; // Return the response to capture it in the component
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error));
  }
};


export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await userService.resetPassword(data);
    dispatch(clearError());
    return response; // Return the response to capture it in the component
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error));
    return Promise.reject(exception.response.data.error); // Return error to capture it as well
  }
};
