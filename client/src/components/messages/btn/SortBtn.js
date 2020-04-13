import React, { useContext } from "react";
import MessageContext from "../../../context/messageContext/messageContext";

const SortBtn = () => {
  const { sortMessages, sortType } = useContext(MessageContext);
  return (
    <div className="my-2">
      <button
        onClick={() => {
          let sort = sortType === "asc" ? "dsc" : "asc";
          sortMessages(sort);
        }}
        className="bg-primary text-light px-3"
        style={{ border: "none" }}
      >
        <i className="fas fa-sort"></i>
      </button>
    </div>
  );
};

export default SortBtn;
