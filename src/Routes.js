import React from "react";
import { Route, Switch, } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
// import Welcome from "./Welcome";
import Dashboard from "./component/Dashboard";

export default () =>
  <Switch>
    <Route path="/" exact component={Register} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register}  />
    <Route path="/dashboard" exact component={Dashboard}  />
  </Switch>;