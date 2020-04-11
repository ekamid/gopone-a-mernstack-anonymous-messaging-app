import React, { useReducer } from "react";
import axios from "axios";
import MessageContext from "./messageContext";
import messageReducer from "./messageReducer";
import {
  SEND_MESSAGE,
  GET_MESSAGES,
  REMOVE_MESSAGE,
  SORT_MESSAGES,
  SET_ERROR,
} from "../types";

const MainState = ({ children }) => {
  const initialState = {
    messages: [],
    loading: true,
    sortType: "asc",
    errors: null,
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);

  const getMessages = async (sortType) => {
    const res =
      sortType === "asc"
        ? await axios.get("/api/messages")
        : await axios.get("/api/messages/reverse");
    try {
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };

  const sendMessage = async (username, message) => {
    const config = {
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.post(`/api/${username}/message`, message, config);
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };

  const removeMessage = async (id) => {
    await axios.delete(`/api/messages/${id}`);
    try {
      dispatch({
        type: REMOVE_MESSAGE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };

  const sortMessages = (sortType) => {
    dispatch({
      type: SORT_MESSAGES,
      payload: sortType,
    });
  };

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        errors: state.errors,
        loading: state.loading,
        sortType: state.sortType,
        sendMessage,
        getMessages,
        removeMessage,
        sortMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MainState;
