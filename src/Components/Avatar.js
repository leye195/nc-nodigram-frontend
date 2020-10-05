import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { avatarImageSize } from "../Styles/Mixin";
const Container = styled.div`
  ${(props) => avatarImageSize(props.size)}
  background-image:url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

const Avatar = ({ size = "sm", url }) => {
  return <Container size={size} url={url}></Container>;
};
Avatar.propTypes = {
  size: propTypes.oneOf(["sm", "md", "lg"]).isRequired,
  url: propTypes.string.isRequired,
};
export default Avatar;
