import {
  GET_MESSAGES,
  SEND_MESSAGE,
  REMOVE_MESSAGE,
  SORT_MESSAGES,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages:
          payload.sortType === "asc" ? payload.data : payload.data.reverse(),
        loading: false,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { text: payload.text, date: payload.date },
        ],
      };

    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message._id !== payload),
      };

    case SORT_MESSAGES:
      return {
        ...state,
        sortType: payload,
      };

    case SET_ERROR:
      return {
        ...state,
        errors: payload,
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
