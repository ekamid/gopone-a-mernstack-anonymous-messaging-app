import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import Alert from "../others/Alert";

const Register = (props) => {
  const { registerUser, userAuth, setError, clearError, errors } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (userAuth) {
      props.history.push("/profile");
    }
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = user;

  const handleChange = (e) => {
    clearError();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ error: [{ msg: "Password does'n match" }] });
    } else {
      registerUser({ username, password });
      setUser({
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className="text-center">Register</h2>
              <form className="form-signin" onSubmit={handleSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={username}
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

                <div className="form-label-group">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button
                  className="btn btn-lg btn-outline-primary btn-block text-uppercase"
                  type="submit"
                >
                  Register
                </button>
                <hr className="my-2" />
                {errors === null ? null : (
                  <Alert
                    alertType="alert-danger"
                    alertMessage={errors.error[0].msg}
                  />
                )}
                <Link
                  to="/login"
                  style={{ fontSize: "16px" }}
                  className="text-secondary"
                >
                  Already have an account? Login..
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
