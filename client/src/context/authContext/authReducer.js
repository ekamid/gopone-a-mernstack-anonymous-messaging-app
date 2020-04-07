import {
  CHECK_USER,
  SUCCESS_REGISTER,
  SUCCESS_LOGIN,
  FAIL_REGISTER,
  FAIL_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
  AUTH_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CHECK_USER:
      return {
        ...state,
        userExist: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.username,
        userId: action.payload._id,
        userAuth: true,
        errors: null,
      };
    case SUCCESS_REGISTER:
    case SUCCESS_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userAuth: true,
        errors: null,
      };
    case FAIL_LOGIN:
    case FAIL_REGISTER:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: null,
        errors: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: null,
        user: null,
        errors: null,
      };

    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
