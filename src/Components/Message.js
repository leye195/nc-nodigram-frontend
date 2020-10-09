import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Avatar from "./Avatar";
import { flex, whiteBox } from "../Styles/Mixin";

const Container = styled.div`
  width: 100%;
  height: 55px;
  padding: 10px 5px;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
`;
const From = styled(Section)`
  ${flex("row", "center", "flex-start")};
  padding-left: 10px;
`;

const Me = styled(Section)`
  ${flex("row", "center", "flex-end")};
  padding-right: 10px;
`;

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const Text = styled.p`
  min-height: 44px;
  padding: 15px;
  ${whiteBox};
  border-radius: 35%;
  font-weight: 400;
`;

const Message = ({ isMe = false, url, text }) => {
  return (
    <Container>
      {isMe && (
        <Me>
          <TextWrapper>
            <Text>{text}</Text>
          </TextWrapper>
        </Me>
      )}
      {!isMe && (
        <From>
          <Avatar url={url} size={"sm"} />
          <TextWrapper>
            <Text>{text}</Text>
          </TextWrapper>
        </From>
      )}
    </Container>
  );
};
Message.propTypes = {
  isMe: propTypes.bool.isRequired,
  url: propTypes.string,
  text: propTypes.string.isRequired,
};
export default Message;
