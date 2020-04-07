import React, { useReducer } from "react";
import axios from "axios";
import MessageContext from "./messageContext";
import messageReducer from "./messageReducer";
import {
  SEND_MESSAGE,
  GET_MESSAGES,
  REMOVE_MESSAGE,
  CLEAR_MESSAGES,
  SET_ERROR,
} from "../types";

const MainState = ({ children }) => {
  const initialState = {
    messages: [],
    loading: true,
    errors: null,
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);
  const getMessages = async () => {
    const res = await axios.get("/messages");
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
    console.log(message);
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(`/${username}/message`, message, config);
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
    await axios.delete(`/messages/${id}`);
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

  const clearMessages = async (userId) => {
    await axios.delete(`/messages/${userId}`);
    try {
      dispatch({
        type: CLEAR_MESSAGES,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        errors: state.errors,
        loading: state.loading,
        sendMessage,
        getMessages,
        removeMessage,
        clearMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MainState;
