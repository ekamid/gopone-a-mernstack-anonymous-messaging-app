import React, { useContext } from "react";
import MessageContext from "../../context/messageContext/messageContext";

const Message = ({ message }) => {
  const { removeMessage } = useContext(MessageContext);
  const { text, date, _id } = message;

  return (
    <div className="card border-success mb-3">
      <div className="card-body text-success">
        <h5 className="card-title">Message:</h5>
        <p style={{ fontSize: "20px" }} className="card-text">
          {text}
        </p>
        <h6>-Anonymous [{date}]</h6>
        <button
          onClick={() => removeMessage(_id)}
          className="btn btn-outline-danger btn-block"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Message;
