import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Avatar from "../../Components/Avatar";
import Button from "../../Components/Button";
import FatText from "../../Components/FatText";
import { PaperPlaneEmpty } from "../../Components/Icons";
import Loader from "../../Components/Loader";
import { flex, whiteBox } from "../../Styles/Mixin";
import { filterToUser, getRecentMessage } from "../../utills";

const Container = styled.div`
  min-height: 80vh;
  max-height: 80vh;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 935px;
  ${flex("row")}
  ${whiteBox};
`;

const UserSection = styled.section`
  min-width: 350px;
  min-height: 80vh;
  overflow: hidden;
  ${flex("column", "center")};
  ${whiteBox};
  border-top: none;
  border-left: none;
  border-bottom: none;
  flex: 0.5;
`;

const Title = styled.div`
  width: 100%;
  padding: 0 10px;
  height: 60px;
  ${flex("row", "center", "center")};
  ${whiteBox};
  border-top: none;
  border-left: none;
  border-right: none;
  span {
    width: 100%;
    text-align: center;
    font-size: 1.05rem;
  }
`;

const UserList = styled.ul`
  flex: 1;
  width: 100%;
  height: 100%;
  max-height: 715px;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  ${flex("column", "stretch")};
  overflow-y: scroll;
`;

const UserRow = styled.li`
  padding: 8px 15px;
  ${flex("row", "center", "space-between")};
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const UserColumn = styled.div`
  ${flex("column")};
  margin-left: 20px;
  margin-right: auto;
`;

const RecentMessage = styled.p`
  margin-top: 5px;
  color: ${(props) => props.theme.lightGreyColor};
`;

const RecordSection = styled.section`
  ${whiteBox};
  min-height: 80vh;
  width: 100%;
  flex: 1;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  ${flex("column", "center", "center")}
`;

const MessageWrapper = styled.article`
  ${flex("column", "center", "center")}
  height: 100%;
  svg,
  span {
    margin-bottom: 20px;
  }

  span {
    font-size: 1.2rem;
    font-weight: 400;
  }

  button {
    padding: 10px 20px;
  }
`;

const MessagePresenter = ({ loading, data, meQuery, meLoading }) => {
  return (
    <Container>
      {loading && meLoading && <Loader />}
      {!loading && !meLoading && (
        <Wrapper>
          <UserSection>
            <Title>
              <FatText text={"Direct"} />
            </Title>
            <UserList>
              {data?.seeRooms?.map((room) => (
                <UserRow key={room.id}>
                  <Avatar
                    url={
                      filterToUser(room?.participants, meQuery?.myProfile?.user)
                        .avatar
                    }
                    size={"md"}
                  />
                  <UserColumn>
                    <FatText
                      text={
                        filterToUser(
                          room?.participants,
                          meQuery?.myProfile?.user
                        ).username
                      }
                    />
                    <RecentMessage>
                      {getRecentMessage(room?.messages)}
                    </RecentMessage>
                  </UserColumn>
                </UserRow>
              ))}
            </UserList>
          </UserSection>
          <RecordSection>
            <MessageWrapper>
              <PaperPlaneEmpty size={50} />
              <FatText text={"My Message"} />
              <Button text={"Send Message"} />
            </MessageWrapper>
          </RecordSection>
        </Wrapper>
      )}
    </Container>
  );
};
MessagePresenter.propTypes = {
  loading: propTypes.bool.isRequired,
  meLoading: propTypes.bool.isRequired,
};
export default MessagePresenter;
