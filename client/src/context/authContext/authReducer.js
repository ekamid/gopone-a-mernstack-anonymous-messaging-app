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
      localStorage.setItem("userAuth", state.userAuth);
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
      localStorage.setItem("userAuth", state.userAuth);
      return {
        ...state,
        userAuth: true,
        errors: null,
      };
    case FAIL_LOGIN:
    case FAIL_REGISTER:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("userAuth");
      return {
        ...state,
        errors: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userAuth");
      return {
        ...state,
        userAuth: null,
        user: null,
        errors: null,
      };

    case SET_ERROR:
      console.log(action.payload);
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
