import React, { useEffect, useContext, Fragment } from "react";
import MessageContext from "../context/messageContext/messageContext";
import SortBtn from "./SortBtn";
import { Link } from "react-router-dom";
import Message from "./Message";

const Messages = () => {
  const { messages, loading, getMessages, sortType } = useContext(
    MessageContext
  );

  useEffect(() => {
    getMessages(sortType);
  }, [getMessages, sortType]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className="card-title text-center">My Messages</h2>
              <p className="my-4 text-center">
                Scroll down to check out the messages that you have received.
              </p>
              {messages.length === 0 ? (
                <h2 className="my-3 text-center text-primary font-weight-light">
                  {loading ? "Loading" : "Empty"}
                </h2>
              ) : (
                <Fragment>
                  <SortBtn />
                  {messages.map((message) => (
                    <Message key={message._id} message={message} />
                  ))}
                </Fragment>
              )}
              <hr className="my-4" />
              <Link
                className="btn btn-lg btn-outline-warning btn-block text-uppercase"
                to="/profile"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
