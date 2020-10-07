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
import {
  flex,
  TextAreaStyle,
  TextAreaWrapperStyle,
  TimeStampStyle,
  whiteBox,
} from "../../Styles/Mixin";
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
  ${TimeStampStyle};
`;

const TextAreaWrapper = styled.form`
  ${TextAreaWrapperStyle};
`;

const TextArea = styled(TextareaAutosize)`
  ${TextAreaStyle};
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
  cursor: ${(props) => props.clickable && "pointer"};
`;

const UserComment = styled.li`
  margin-top: 10px;
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

const UserCaption = styled.section`
  margin-bottom: 10px;
  margin-top: 10px;
  span {
    margin-right: 10px;
  }
`;

const UserLink = styled(Link)`
  color: ${(props) => props.theme.blackColor};
`;

const PostPresenter = ({
  id,
  caption,
  location,
  isLiked,
  likeCount,
  user: { id: userId, username, avatar },
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
  me,
  history,
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
          <Button
            onClick={() => {
              history.push({
                pathname: `/post/${id}`,
              });
            }}
          >
            <Comment />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? `1 like` : `${likeCount} likes`} />
        <UserCaption>
          <UserLink to={`/${me?.username}`}>
            <FatText text={me?.username} />
          </UserLink>
          {caption}
        </UserCaption>
        {comments && (
          <Comments>
            <CommentCount
              clickable={commentCount > 2}
              onClick={() => {
                history.push({
                  path: `/post/${id}`,
                });
              }}
            >{`${commentCount} comments`}</CommentCount>

            {[...comments, ...selfComment]
              .slice(
                comments.length + selfComment.length - 3,
                comments.length + selfComment.length
              )
              .map((comment) => (
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
