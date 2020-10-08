import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";
import Divide from "../../Components/Divide";

const Container = styled.div`
  min-height: 80vh;
`;

const Section = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 150px;
  grid-auto-rows: 150px;
  margin-bottom: 40px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 220px);
  grid-template-rows: 220px;
  grid-auto-rows: 220px;
`;

const SearchPresenter = ({ term, data, loading }) => {
  //console.log(data, loading);
  return (
    <Container>
      {term === undefined ? (
        <FatText text={"Search for something"} />
      ) : (
        <>
          {loading && <Loader />}
          {!loading && (
            <>
              <Section>
                {data?.searchUser?.length === 0 ? (
                  <FatText text={"No Users Found"} />
                ) : (
                  data?.searchUser?.map((user) => (
                    <UserCard
                      key={user.id}
                      id={user.id}
                      isFollowing={user.isFollowing}
                      isSelf={user.isSelf}
                      username={user.username}
                      url={user.avatar}
                    />
                  ))
                )}
              </Section>
              <Divide />
            </>
          )}
          {!loading && (
            <PostSection>
              {data?.searchPost?.length === 0 ? (
                <FatText text={"No Posts Found"} />
              ) : (
                data?.searchPost?.map((post) => (
                  <SquarePost
                    key={post.id}
                    id={post.id}
                    user={post.user}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    file={post.files[0]}
                  />
                ))
              )}
            </PostSection>
          )}
        </>
      )}
    </Container>
  );
};
SearchPresenter.propTypes = {
  searchTerm: propTypes.string,
  loading: propTypes.bool.isRequired,
};
export default SearchPresenter;
