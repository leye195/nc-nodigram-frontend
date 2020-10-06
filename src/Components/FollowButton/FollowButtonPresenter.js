import React from "react";
import styled from "styled-components";
import { flex } from "../../Styles/Mixin";
import MoonLoader from "react-spinners/MoonLoader";
import Button from "../Button";

const Container = styled.div`
  ${flex("row", "center", "center")};
`;

const FollowButtonPresenter = ({ isFollowing, loading, handleFollow }) => {
  return (
    <Container onClick={handleFollow}>
      {loading ? (
        <MoonLoader size={20} />
      ) : (
        <Button text={isFollowing ? "Unfollow" : "Follow"} />
      )}
    </Container>
  );
};
export default FollowButtonPresenter;
