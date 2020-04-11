import React from "react";

const Footer = () => {
  return (
    <div className="text-center">
      <div>
        <a className="text-light" href="/">
          Home
        </a>{" "}
        ||{" "}
        <a className="text-light" href="/profile">
          Profile
        </a>
      </div>
      <p className="text-light">© Gopone - 2020 </p>
    </div>
  );
};

export default Footer;
