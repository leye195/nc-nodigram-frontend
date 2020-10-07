import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "react-apollo-hooks";
import { useParams } from "react-router-dom";
import { GET_USER } from "./ProfileQueries";

const ProfileContainer = () => {
  const { username } = useParams();
  const { data, loading } = useQuery(GET_USER, {
    skip: !username && true,
    variables: { username },
  });
  return <ProfilePresenter username={username} loading={loading} data={data} />;
};
export default ProfileContainer;
