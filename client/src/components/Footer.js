import React from "react";

const Footer = () => {
  return (
    <div className="text-center">
      <p>
        <a className="text-dark" href="/">
          Home
        </a>{" "}
        ||{" "}
        <a href="/profile" className="text-dark">
          Profile
        </a>
        ||© Gopone - 2020{" "}
      </p>
    </div>
  );
};

export default Footer;
