import React, { useContext } from "react";
import MessageContext from "../../../context/messageContext/messageContext";

const RefreshBtn = () => {
  const { getMessages, sortType } = useContext(MessageContext);
  return (
    <div className="my-2 mr-2">
      <button
        onClick={() => {
          getMessages(sortType);
        }}
        className="bg-primary text-light px-3"
        style={{ border: "none" }}
      >
        <i className="fa fa-sync-alt"></i>
      </button>
    </div>
  );
};

export default RefreshBtn;
