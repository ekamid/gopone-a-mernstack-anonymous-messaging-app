import React, { useContext, Fragment } from "react";
import AuthContext from "../context/authContext/authContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { userAuth } = useContext(AuthContext);
  return (
    <section className="jumbotron text-center" style={{ height: "100vh" }}>
      <div className="container">
        <h1>Gopone</h1>
        <h3>Send Secret Anonymous Messages Online</h3>
        <p className="lead text-muted">
          Gopone is an interactive anonymous messaging app with a dare game.
          Create your Profile Link and Send it to all your contacts to check
          what do your friends think about you. With the help of Kubool, you can
          send and recieve anonymous compliments easily for free!
        </p>
        <div className="d-flex justify-content-center">
          {userAuth ? (
            <Link to="/Profile" className="btn btn-primary">
              Profile
            </Link>
          ) : (
            <Fragment>
              {" "}
              <Link to="/login" className="btn btn-primary mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary mx-2">
                Register
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
