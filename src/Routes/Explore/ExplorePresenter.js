import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Loader from "../../Components/Loader";
import SquarePost from "../../Components/SquarePost";
import Helmet from "../../Components/Helmet";

const Container = styled.div`
  min-height: 80vh;
`;

const Posts = styled.article`
  width: 100%;
  height: 100%;
`;

const PostSection = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 260px;
  grid-auto-rows: 230px;
`;

const ExplorePresenter = ({ loading, data }) => {
  return (
    <Container>
      <Helmet>
        <title>Nodigram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && (
        <Posts>
          <PostSection>
            {data?.explorePost?.map((post) => (
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
      )}
    </Container>
  );
};

ExplorePresenter.propTypes = {
  loading: propTypes.bool.isRequired,
};
export default ExplorePresenter;
