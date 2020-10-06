import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import moment from "moment";
import Avatar from "../Avatar";
import FatText from "../FatText";
import {
  Comment,
  HeartEmpty,
  HeartFull,
  LeftArrow,
  RightArrow,
} from "../Icons";
import { flex, whiteBox } from "../../Styles/Mixin";
import TextareaAutosize from "react-autosize-textarea";
import ClipLoader from "react-spinners/ClipLoader";

const Post = styled.article`
  ${whiteBox}
  height: 100%;
  max-width: 600px;
  width: 100vw;
  margin-bottom: 30px;
  user-select: none;
`;

const Header = styled.header`
  ${flex("row", "center")}
  padding:15px;
`;

const UserColumn = styled.div`
  margin-left: 15px;
  a {
    color: ${(props) => props.theme.blackColor};
  }
`;

const Location = styled.span`
  ${flex("column", "flex-start", "flex-start")}
  margin-top:5px;
`;

const Files = styled.section`
  position: relative;
  padding-top: 100%;
  & .like {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
  }
`;

const File = styled.div`
  position: absolute;
  top: 0;
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url("${props.src}")`};
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.55s ease-in-out;
`;

const Button = styled.span`
  cursor: pointer;
  ${(props) =>
    props.position === "absolute" &&
    css`
      position: absolute;
      top: 50%;
      ${(props) =>
        props.direction === "left" &&
        css`
          left: 5px;
        `}
      ${(props) =>
        props.direction === "right" &&
        css`
          right: 5px;
        `}
      z-index:10;
      opacity: 0.8;
    `}
`;

const Meta = styled.section`
  padding: 15px;
`;

const Buttons = styled.section`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const TimeStamp = styled.span`
  display: block;
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.8;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const TextAreaWrapper = styled.form`
  position: relative;
  ${flex("row", "center", "center")};
  padding: 10px 0;
`;

const TextArea = styled(TextareaAutosize)`
  resize: none;
  flex: 1;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  &:disabled {
    outline: none;
    background-color: white;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const UserComment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${flex("row", "center", "center")}
`;

const PostPresenter = ({
  id,
  caption,
  location,
  isLiked,
  likeCount,
  user: { username, avatar },
  commentCount,
  comments,
  selfComment,
  files,
  createdAt,
  setIsLiked,
  setLikeCount,
  setCommentCount,
  newComment,
  currentItem,
  slide,
  likedRef,
  onKeyPress,
  onSubmit,
  addCommentLoading,
}) => {
  //console.log(addCommentLoading);
  return (
    <Post>
      <Header>
        <Avatar size={"sm"} url={avatar} />
        <UserColumn>
          <Link to={`/${username}`}>
            <FatText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files.length > 1 && (
          <Button
            position={"absolute"}
            direction={"left"}
            onClick={() => slide("left")}
          >
            <LeftArrow color={"#FAFAFA"} />
          </Button>
        )}
        {files?.map((file, idx) => (
          <File key={file.id} src={file.url} showing={idx === currentItem} />
        ))}
        {files.length > 1 && (
          <Button
            position={"absolute"}
            direction={"right"}
            onClick={() => slide("right")}
          >
            <RightArrow color={"#FAFAFA"} />
          </Button>
        )}
        <HeartFull color={"#ED4956"} size={45} likedRef={likedRef} />
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={setIsLiked}>
            {isLiked ? <HeartFull color={"#ED4956"} /> : <HeartEmpty />}
          </Button>
          <Button>
            <Comment />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? `1 like` : `${likeCount} likes`} />
        {comments && (
          <Comments>
            {comments.map((comment) => (
              <UserComment key={comment.id}>
                <FatText text={comment?.user?.username} />
                {comment.text}
              </UserComment>
            ))}
            {selfComment.map((comment) => (
              <UserComment key={comment.id}>
                <FatText text={comment?.user?.username} />
                {comment.text}
              </UserComment>
            ))}
          </Comments>
        )}
        <TimeStamp>{moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}</TimeStamp>
        <TextAreaWrapper>
          <TextArea
            value={newComment.value}
            onChange={newComment.onChange}
            placeholder={"Add a comment..."}
            onKeyPress={onKeyPress}
          />
          <Button
            onClick={
              (!addCommentLoading || newComment.value !== "") && onSubmit
            }
          >
            Submit
          </Button>
          {addCommentLoading && (
            <LoaderWrapper>
              <ClipLoader size={20} />
            </LoaderWrapper>
          )}
        </TextAreaWrapper>
      </Meta>
    </Post>
  );
};
export default PostPresenter;
