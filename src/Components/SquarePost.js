import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { CommentFull, HeartFull } from "./Icons";
import { flex } from "../Styles/Mixin";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url("${props.url}")`};
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  ${flex("row", "center", "center")}
  opacity:0;
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const PostLink = styled(Link)`
  ${flex("row", "center", "center")};
  width: 100%;
  height: 100%;
`;

const Number = styled.div`
  ${flex("row", "center", "center")};
  padding: 5px;
`;

const NumberText = styled.span`
  margin-left: 10px;
  color: white;
  font-size: 13px;
`;

const SquarePost = ({ id, file: { url }, likeCount, commentCount }) => {
  return (
    <Container url={url}>
      <Overlay>
        <PostLink to={`/post/${id}`}>
          <Number>
            <HeartFull color={"#FAFAFA"} />
            <NumberText>{likeCount}</NumberText>
          </Number>
          <Number>
            <CommentFull color={"#FAFAFA"} />
            <NumberText>{commentCount}</NumberText>
          </Number>
        </PostLink>
      </Overlay>
    </Container>
  );
};

SquarePost.propTypes = {
  id: propTypes.string.isRequired,
  file: propTypes.shape({
    id: propTypes.string.isRequired,
    url: propTypes.string.isRequired,
  }),
  likeCount: propTypes.number.isRequired,
  commentCount: propTypes.number.isRequired,
};
export default SquarePost;
