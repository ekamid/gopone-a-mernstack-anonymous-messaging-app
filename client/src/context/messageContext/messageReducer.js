import {
  GET_MESSAGES,
  SEND_MESSAGE,
  REMOVE_MESSAGE,
  CLEAR_MESSAGES,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types";

export default (state, { type, payload }) => {
  if (type === GET_MESSAGES) {
    return {
      ...state,
      messages: payload,
      loading: false,
    };
  } else if (type === SEND_MESSAGE) {
    return {
      ...state,
      messages: [...state.messages, payload],
    };
  } else if (type === REMOVE_MESSAGE) {
    return {
      ...state,
      messages: state.messages.filter((message) => message._id !== payload),
    };
  } else if (type === CLEAR_MESSAGES) {
    return {
      ...state,
      messages: [],
    };
  } else if (type === SET_ERROR) {
    return {
      ...state,
      errors: payload,
    };
  } else if (type === CLEAR_ERROR) {
    return {
      ...state,
      errors: null,
    };
  }

  return state;
};

// switch (type) {
//   case GET_MESSAGES:
//     return {
//       ...state,
//       messages: payload,
//       loading: false,
//     };
//   case SEND_MESSAGE:
//     return {
//       ...state,
//       messages: [...state.messages, payload],
//     };
//   case REMOVE_MESSAGE:
//     return {
//       ...state,
//       messages: state.messages.filter((message) => message._id !== payload),
//     };
//   case CLEAR_MESSAGES:
//     return {
//       ...state,
//       messages: [],
//     };
//   case SET_ERROR:
//     return {
//       ...state,
//       errors: payload,
//     };
//   case CLEAR_ERROR:
//     return {
//       ...state,
//       errors: null,
//     };
//   default:
//     return state;
// }
