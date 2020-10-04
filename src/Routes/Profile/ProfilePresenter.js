import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const ProfilePresenter = ({ username }) => {
  return <Wrapper>{username}p</Wrapper>;
};
export default ProfilePresenter;
