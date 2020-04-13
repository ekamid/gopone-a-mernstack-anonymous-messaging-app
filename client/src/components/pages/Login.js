import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import Alert from "../others/Alert";

const Login = (props) => {
  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (userAuth) {
      props.history.push("/profile");
    }
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const handleChange = (e) => {
    clearError();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className=" text-center">Sign In</h2>
              <form className="form-signin" onSubmit={handleSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={username || ""}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                  <label htmlFor="inputUsername">Username</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-outline-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign in
                </button>
                <hr className="my-2" />
                {errors === null ? null : (
                  <Alert
                    alertType="alert-danger"
                    alertMessage={errors.error[0].msg} //.error[0].msg
                  />
                )}
                <Link
                  to="/register"
                  style={{ fontSize: "16px" }}
                  className="text-center text-secondary"
                >
                  Don't have an account? register..
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
