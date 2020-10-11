import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Post from "../Routes/Post";
import Profile from "../Routes/Profile";
import Explore from "../Routes/Explore/ExploreContainer";
import EditProfile from "../Routes/EditProfile";
import Search from "../Routes/Search";
import Message from "../Routes/Message";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact component={Feed} path={"/"} />
    <Route exact component={Post} path={`/post/:id`} />
    <Route exact component={Explore} path={`/explore`} />
    <Route exact component={Search} path={`/search`} />
    <Route exact component={EditProfile} path={`/accounts/edit`} />
    <Route exact component={Message} path={`/direct/:type`} />
    <Route component={Profile} path={`/:username`} />
    <Redirect from="*" to="/" />
  </Switch>
);
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact component={Auth} path={"/"} />
    <Redirect from="*" to="/" />
  </Switch>
);
const Router = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

Router.propTypes = {
  isLoggedIn: PropTypes.bool,
};
export default Router;
