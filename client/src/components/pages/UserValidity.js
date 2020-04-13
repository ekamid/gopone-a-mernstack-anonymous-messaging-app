import React, { useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import SendMessage from "../messages/SendMessage";
import UserDoesNotExist from "./UserDoesNotExist";

const UserValidity = () => {
  const { checkUser, userExist } = useContext(AuthContext);
  const { username } = useParams();
  useEffect(() => {
    checkUser(username);
  }, [username, checkUser]);
  return (
    <Fragment>
      {userExist === null ? (
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h2 className="card-title text-center text-warning">
                    Checking
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          {userExist ? <SendMessage /> : <UserDoesNotExist />}{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserValidity;
