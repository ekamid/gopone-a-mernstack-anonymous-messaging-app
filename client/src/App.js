import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import AuthState from "./context/authContext/authState";
import MessageState from "./context/messageContext/messageState";

import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Messages from "./components/messages/Messages";
import UserValidity from "./components/pages/UserValidity";
import Footer from "./components/others/Footer";
import Home from "./components/pages/Home";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";

const App = () => {
  return (
    <AuthState>
      <MessageState>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <PrivateRoutes exact path="/profile" component={Profile} />
            <PrivateRoutes exact path="/messages" component={Messages} />
            <Route exact path="/:username" component={UserValidity} />
          </Switch>
          <Footer />
        </div>
      </MessageState>
    </AuthState>
  );
};

export default App;
