import React, { useContext } from "react";
import AuthContext from "../../context/authContext/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = (props) => {
  const { component: Component, ...rest } = props;
  const { userAuth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        userAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoutes;
