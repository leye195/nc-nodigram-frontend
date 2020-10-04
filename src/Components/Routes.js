import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Post from "../Routes/Post";
import Profile from "../Routes/Profile";
import Explore from "../Routes/Explore/ExploreContainer";
import EditProfile from "../Routes/EditProfile/EditProfilePresenter";
import Search from "../Routes/Search";
const LoggedInRoutes = () => (
  <Switch>
    <Route exact component={Feed} path={"/"} />
    <Route exact component={Explore} path={`/explore`} />
    <Route exact component={Search} path={`/search`} />
    <Route exact component={EditProfile} path={`/accounts/edit`} />
    <Route component={Profile} path={`/:username`} />
  </Switch>
);
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact component={Auth} path={"/"} />
  </Switch>
);
const Router = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

Router.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Router;
