import React from "react";
import styled from "styled-components";
import { flex } from "../../Styles/Mixin";
import FatText from "../FatText";
import Input from "../Input";
import { Close } from "../Icons";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  ${flex("row", "center")};
  position: relative;
  height: 10%;
  padding: 0 10px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
  span {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    font-size: 18px;
  }
`;

const CloseWrapper = styled.div`
  z-index: 1;
  cursor: pointer;
`;

const Receiver = styled.div`
  ${flex("row", "center")};
  height: 10%;
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
  span {
    margin-left: 10px;
    font-size: 14px;
  }
  input {
    width: 100%;
    background: white;
    border: none;
    font-size: 14px;
  }
`;

const ListWrapper = styled.div`
  height: 80%;
`;

const Loading = styled.div`
  ${flex("row", "center", "center")};
  width: 100%;
  padding: 10px 0;
`;

const List = styled.ul`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Item = styled.li``;

const MessageDialogPresenter = ({ receiver, data, loading }) => {
  return (
    <Container className={"dialog"}>
      <Header>
        <CloseWrapper className="close">
          <Close size={18} />
        </CloseWrapper>
        <FatText text={"New Message"} />
      </Header>
      <Receiver>
        <FatText text={"Receiver:"} />
        <Input
          placeholder={"Search..."}
          value={receiver.value}
          onChange={receiver.onChange}
        />
      </Receiver>
      <ListWrapper>
        {loading && (
          <Loading>
            <ClipLoader size={20} />
          </Loading>
        )}
        {!loading && <List></List>}
      </ListWrapper>
    </Container>
  );
};
export default MessageDialogPresenter;
