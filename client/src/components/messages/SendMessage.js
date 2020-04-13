import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import MessageContext from "../../context/messageContext/messageContext";
import Alert from "../others/Alert";

const SendMessage = () => {
  const { sendMessage } = useContext(MessageContext);

  const [message, setMessage] = useState({ text: "" });
  const [charCounts, setCharCounts] = useState(0);
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { username } = useParams();
  const maxChars = 300;

  const { text } = message;

  const handleChange = (e) => {
    setWarning("");
    setSuccessMessage("");
    if (
      charCounts !== maxChars ||
      window.event.inputType === "deleteContentBackward"
    ) {
      setMessage({ text: e.target.value });
    }
  };

  useEffect(() => {
    setCharCounts(text.length);
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length < 10) {
      setWarning("Please lengthen the message minimum to 10 characters.");
    } else {
      sendMessage(username, message);
      setMessage({ text: "" });
      setSuccessMessage("Message Sent..");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className="card-title text-center">
                Say Something Gopone to{" "}
                <span style={{ color: "red" }}>{username}</span>
              </h2>
              <p className="my-4 text-center">
                Scroll down to check out the messages that you have received.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="md-form">
                  <label>Say Something..</label>
                  <textarea
                    style={{ minHeight: "7rem" }}
                    className="md-textarea form-control mb-2"
                    rows="3"
                    value={text}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                {warning === "" ? null : (
                  <Alert alertType="alert-warning" alertMessage={warning} />
                )}
                {successMessage === "" ? null : (
                  <Alert
                    alertType="alert-success"
                    alertMessage={successMessage}
                  />
                )}
                <p style={{ fontSize: "18px" }}>
                  <span style={{ color: "red" }}>{maxChars - charCounts}</span>{" "}
                  characters remaining
                </p>
                <hr className="mb-2" />
                <input
                  type="submit"
                  className="btn btn-lg btn-outline-primary btn-block text-uppercase"
                  value="Send"
                />
              </form>
              <Link
                className="btn btn-lg btn-outline-warning btn-block text-uppercase mt-2"
                to="/"
              >
                Go Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
