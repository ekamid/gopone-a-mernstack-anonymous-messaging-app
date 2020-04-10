import React, { useEffect, useContext } from "react";
import AuthContext from "../context/authContext/authContext";

import { Link } from "react-router-dom";

const Profile = () => {
  const { user, getUser, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className="card-title text-center">{user}'s Profile</h2>
              <p className="my-4 text-center">
                Share your profile link to get responses from your friend. Go to
                "View Messages" to check out the responses.
              </p>
              <Link
                className="btn btn-lg btn-outline-primary btn-block text-uppercase"
                to="/messages"
              >
                View Messages
              </Link>
              <button
                className="btn btn-lg btn-outline-info btn-block text-uppercase"
                onClick={async () => {
                  const profileLink = `https://gopone.herokuapp.com/${user}`;
                  try {
                    await navigator.clipboard.writeText(profileLink);
                    alert("Profile Link Copied To Clipboard");
                  } catch (err) {
                    console.error("Async: Could not copy text: ", err);
                  }
                }}
              >
                Copy Profile Link
              </button>
              <button
                className="btn btn-lg btn-outline-warning btn-block text-uppercase"
                onClick={() => logoutUser()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
