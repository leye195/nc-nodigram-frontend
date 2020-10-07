import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import moment from "moment";
import {
  flex,
  TextAreaStyle,
  TextAreaWrapperStyle,
  TimeStampStyle,
  whiteBox,
} from "../../Styles/Mixin";
import Avatar from "../Avatar";
import FatText from "../FatText";
import TextareaAutosize from "react-autosize-textarea";
import ClipLoader from "react-spinners/ClipLoader";

import {
  Comment,
  HeartEmpty,
  HeartFull,
  LeftArrow,
  RightArrow,
} from "../Icons";

const Post = styled.article`
  ${whiteBox}
  height: 557px;
  max-width: 900px;
  width: 100vw;
  margin-bottom: 50px;
  ${flex("row")}
`;

const Files = styled.section`
  position: relative;
  height: 100%;
  flex: 2;
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

const Section = styled.section`
  flex: 1;
  ${flex("column", "flex-start", "flex-start")};
  height: 100%;
`;

const Header = styled.header`
  ${flex("row", "center")};
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid ${(props) => props.theme.boxBorder};
`;

const Comments = styled.ul`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.boxBorder};
  max-height: 350px;
  min-height: 350px;
  overflow-y: scroll;
`;

const UserComment = styled.li`
  margin-top: 10px;
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Meta = styled.section`
  flex: 2;
  height: 100%;
  width: 100%;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  padding: 10px;
  & + span {
    margin-left: 10px;
  }
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

const TimeStamp = styled.span`
  ${TimeStampStyle};
  margin: 0;
  padding: 10px;
`;

const TextAreaWrapper = styled.form`
  ${TextAreaWrapperStyle};
  padding: 10px;
`;

const TextArea = styled(TextareaAutosize)`
  ${TextAreaStyle};
  max-height: 30px;
`;

const UserCaption = styled.section`
  margin-top: 10px;
  margin-bottom: 20px;
  span {
    margin-right: 10px;
  }
`;

const UserLink = styled(Link)`
  color: ${(props) => props.theme.blackColor};
`;

const LoaderWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${flex("row", "center", "center")}
`;

const FullPostPresenter = ({
  id,
  location,
  caption,
  files,
  slide,
  currentItem,
  comments,
  user: { avatar, username },
  isLiked,
  history,
  createdAt,
  likeCount,
  setIsLiked,
  likedRef,
  onKeyPress,
  addCommentLoading,
  newComment,
  selfComment,
}) => {
  return (
    <Post>
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
      <Section>
        <Header>
          <Avatar size={"sm"} url={avatar} />
          <UserColumn>
            <Link to={`/${username}`}>
              <FatText text={username} />
            </Link>
            <Location>{location}</Location>
          </UserColumn>
        </Header>
        <Meta>
          <Comments>
            <UserCaption>
              <UserLink to={`/${username}`}>
                <FatText text={username} />
              </UserLink>
              {caption}
            </UserCaption>
            {[...comments, ...selfComment].map((comment) => (
              <UserComment key={comment.id}>
                <UserLink to={`/${comment?.user?.username}`}>
                  <FatText text={comment?.user?.username} />
                </UserLink>
                {comment.text}
              </UserComment>
            ))}
          </Comments>
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
          <FatText
            text={`${likeCount === 1 ? `1 like` : `${likeCount} likes`} `}
          />
          <TimeStamp>
            {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
          </TimeStamp>
          <TextAreaWrapper>
            <TextArea
              placeholder={"Add a comment..."}
              value={newComment.value}
              onChange={newComment.onChange}
              onKeyPress={onKeyPress}
            />
            {addCommentLoading && (
              <LoaderWrapper>
                <ClipLoader size={20} />
              </LoaderWrapper>
            )}
          </TextAreaWrapper>
        </Meta>
      </Section>
    </Post>
  );
};
export default FullPostPresenter;
