import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Post from "../Routes/Post";
import Profile from "../Routes/Profile";

import Explore from "../Routes/Explore/ExploreContainer";
import EditProfile from "../Routes/EditProfile/EditProfilePresenter";
const LoggedInRoutes = () => (
  <>
    <Route exact component={Feed} path={"/"} />
    <Route component={Post} path={`/post/:id`} />
    <Route component={Profile} path={`/profile/:id`} />
    <Route component={Explore} path={`/search`} />
    <Route component={EditProfile} path={`/edit`} />
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
