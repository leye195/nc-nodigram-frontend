import React, { useState } from "react";
import propTypes from "prop-types";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_FOLLOW } from "./FollowButtonQueries";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ id, isFollowing }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [toggleFollowMutation, { loading }] = useMutation(TOGGLE_FOLLOW);
  const handleFollow = async () => {
    try {
      await toggleFollowMutation({
        variables: { followId: id },
      });
      if (isFollowingS) {
        setIsFollowing((cur) => false);
      } else {
        setIsFollowing((cur) => true);
      }
    } catch (e) {
      toast.error("Can't perform follow/unfollow action");
    }
  };
  return (
    <FollowButtonPresenter
      isFollowing={isFollowingS}
      handleFollow={handleFollow}
      loading={loading}
    />
  );
};
FollowButtonContainer.propTypes = {
  id: propTypes.string.isRequired,
  isFollowing: propTypes.bool.isRequired,
};
export default FollowButtonContainer;
