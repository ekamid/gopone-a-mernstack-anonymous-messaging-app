import React from "react";
import { Link, useParams } from "react-router-dom";

const UserDoesNotExist = () => {
  const { username } = useParams();
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className="card-title text-center text-warning">Ooppps</h2>
              <p className="my-4 text-center">
                <span className="text-danger">{username}</span> Does not exist.
                Try a valid user.
              </p>
              <Link
                className="btn btn-lg btn-outline-primary btn-block text-uppercase"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-lg btn-outline-warning btn-block text-uppercase"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDoesNotExist;
