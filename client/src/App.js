import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import MessageState from "./context/messageContext/messageState";
import AuthState from "./context/authContext/authState";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Messages from "./components/Messages";
import UserValidity from "./components/UserValidity";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PrivateRoutes from "./components/PrivateRoutes";

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
