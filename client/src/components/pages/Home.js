import React, { useContext, Fragment } from "react";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { userAuth } = useContext(AuthContext);
  return (
    <section className="jumbotron">
      <div className="d-flex flex-column container">
        <h1>Gopone</h1>
        <h3>Send Secret Anonymous Messages Online</h3>
        <p>
          Gopone is an interactive anonymous messaging app with a dare game.
          Create your Profile Link and Send it to all your contacts to check
          what do your friends think about you. With the help of Kubool, you can
          send and recieve anonymous compliments easily for free!
        </p>
        <div className="d-flex justify-content-center mt-4">
          {userAuth ? (
            <Link to="/Profile" className="btn btn-primary px-3">
              Profile
            </Link>
          ) : (
            <Fragment>
              {" "}
              <Link to="/login" className="btn btn-primary mx-2 px-3">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary mx-2 px-3">
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
