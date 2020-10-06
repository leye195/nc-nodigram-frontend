import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import FollowButton from "./FollowButton";
import { flex, whiteBox } from "../Styles/Mixin";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${whiteBox}
  ${flex("column", "center")}
  padding:20px;
`;
const UserAvatar = styled(Avatar)`
  margin-bottom: 10px;
`;
const UserLink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
const UserCard = ({ id, isFollowing, url, username, isSelf }) => {
  return (
    <Card>
      <UserAvatar url={url} size={"md"} />
      <UserLink to={`/${username}`}>
        <FatText text={username} />
      </UserLink>
      {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
    </Card>
  );
};

UserCard.propTypes = {
  id: propTypes.string.isRequired,
  isFollowing: propTypes.bool.isRequired,
  url: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  isSelf: propTypes.bool.isRequired,
};
export default UserCard;
