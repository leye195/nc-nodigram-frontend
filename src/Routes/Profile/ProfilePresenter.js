import React from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FollowButton from "../../Components/FollowButton";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import { flex } from "../../Styles/Mixin";
import { Helmet } from "react-helmet";
import SquarePost from "../../Components/SquarePost";
import Divide from "../../Components/Divide";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 5px;
  min-height: 80vh;
`;

const Header = styled.header`
  ${flex("row", "center", "space-between")}
  margin-bottom:40px;
`;

const AvatarWrapper = styled.div`
  ${flex("row", "flex-start", "center")};
  margin-right: 5px;
  flex: 0.5;
`;

const Section = styled.section`
  ${flex("column")};
  height: 100%;
  flex: 1;
`;

const UserNameRow = styled.div`
  ${flex("row", "center")};
  margin-bottom: 20px;
`;

const Username = styled(FatText)`
  width: 100%;
  font-size: 25px;
  font-weight: 400;
  margin-right: 20px;
`;

const CountSection = styled(Section)`
  ${flex("row", "center", "space-between")};
  margin-bottom: 20px;
`;

const UserSection = styled(Section)`
  ${flex("column")}
  span {
    margin-bottom: 10px;
  }
`;

const Span = styled.span`
  font-size: 15px;
  margin-right: 20px;
  font-weight: 300;
  & > span {
    margin-left: 5px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  white-space: pre-wrap;
  line-height: 1.5;
`;

const Posts = styled.article`
  width: 100%;
  height: 100%;
`;

const PostSection = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 230px;
  grid-auto-rows: 230px;
`;

const Button = styled.button`
  font-weight: 300;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  color: black;
  width: 100%;
  text-align: center;
  padding: 8px 5px;
  font-size: 12px;
  white-space: pre;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ProfilePresenter = ({ username, data, loading }) => {
  return (
    <Wrapper>
      <Helmet title={`${username} | Nodigram`} />
      {loading && <Loader />}
      {!loading && (
        <>
          <Header>
            <AvatarWrapper>
              <Avatar url={data?.seeProfile?.user?.avatar} size={"lg"} />
            </AvatarWrapper>
            <Section>
              <UserNameRow>
                <Username text={username} />
                {!data?.seeProfile?.user?.isSelf ? (
                  <FollowButton
                    id={data?.seeProfile?.user?.id}
                    isFollowing={data?.seeProfile?.user?.isFollowing}
                  />
                ) : (
                  <Link to={`/accounts/edit`}>
                    <Button>Edit Profile</Button>
                  </Link>
                )}
              </UserNameRow>
              <CountSection>
                <Span>
                  Posts
                  <FatText text={String(data?.seeProfile?.user?.postsCount)} />
                </Span>
                <Span>
                  Followers
                  <FatText
                    text={String(data?.seeProfile?.user?.followersCount)}
                  />
                </Span>
                <Span>
                  Followings
                  <FatText
                    text={String(data?.seeProfile?.user?.followingCount)}
                  />
                </Span>
              </CountSection>
              <UserSection>
                <FullName text={data?.seeProfile?.user?.fullName} />
                <Bio>{data?.seeProfile?.user?.bio}</Bio>
              </UserSection>
            </Section>
          </Header>
          <Divide />
          <Posts>
            <PostSection>
              {data?.seeProfile?.posts?.map((post) => (
                <SquarePost
                  key={post.id}
                  id={post.id}
                  file={post.files[0]}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                />
              ))}
            </PostSection>
          </Posts>
        </>
      )}
    </Wrapper>
  );
};
export default ProfilePresenter;
