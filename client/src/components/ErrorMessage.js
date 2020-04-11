import React from "react";

const ErrorMessage = (props) => {
  const { errors } = props;
  return <p className="error-messages">{errors.error[0].msg}</p>;
};

export default ErrorMessage;
