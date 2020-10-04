import React from "react";
import { useParams } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const { username } = useParams();
  return <ProfilePresenter username={username} />;
};
export default ProfileContainer;
