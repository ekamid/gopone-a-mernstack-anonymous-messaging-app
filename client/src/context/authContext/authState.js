import React, { useEffect, useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setToken from "../../utils/setToken";
import {
  SUCCESS_REGISTER,
  SUCCESS_LOGIN,
  CHECK_USER,
  FAIL_REGISTER,
  FAIL_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
  AUTH_ERROR,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    user: null,
    userId: null,
    userAuth: null,
    userExist: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("userAuth")) {
      getUser();
    }
  }, []);

  //checkUser
  const checkUser = async (username) => {
    try {
      const res = await axios.get(`/api/auth/${username}`);
      dispatch({
        type: CHECK_USER,
        payload: res.data.exist,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };

  //get User
  const getUser = async () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

  //register user
  const registerUser = async (userData) => {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/register", userData, config);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FAIL_REGISTER,
        payload: err.response.data,
      });
    }
  };

  //login user
  const loginUser = async (userData) => {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", userData, config);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FAIL_LOGIN,
        payload: err.response.data,
      });
    }
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userId: state.userId,
        userAuth: state.userAuth,
        errors: state.errors,
        userExist: state.userExist,
        checkUser,
        registerUser,
        loginUser,
        logoutUser,
        getUser,
        setError,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
