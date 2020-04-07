import React, { useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authContext/authContext";
import SendMessage from "./SendMessage";
import UserDoesNotExist from "./UserDoesNotExist";

const UserValidity = () => {
  const { checkUser, userExist } = useContext(AuthContext);
  const { username } = useParams();
  useEffect(() => {
    checkUser(username);
  }, [username, checkUser]);
  return (
    <Fragment>{userExist ? <SendMessage /> : <UserDoesNotExist />}</Fragment>
  );
};

export default UserValidity;
