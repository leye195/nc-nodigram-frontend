import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Post from "../Routes/Post";
import Profile from "../Routes/Profile";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import EditProfile from "../Routes/EditProfile";
const LoggedInRoutes = () => (
  <>
    <Route exact component={Feed} path={"/"} />
  </>
);
const LoggedOutRoutes = () => (
  <>
    <Route exact component={Auth} path={"/"} />
  </>
);
const Router = ({ isLoggedIn }) => (
  <HashRouter>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  </HashRouter>
);

Router.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Router;
