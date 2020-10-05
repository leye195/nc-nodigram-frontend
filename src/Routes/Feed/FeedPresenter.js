import React from "react";
import styled from "styled-components";
import Helmet from "../../Components/Helmet";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";
import { flex } from "../../Styles/Mixin";
const Wrapper = styled.section`
  ${flex("column", "center", "flex-start")}
  min-height:80vh;
`;

const FeedPresenter = ({ data, loading }) => {
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Nodigram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data?.seeFeed?.map((post) => <Post key={post.id} {...post} />)}
    </Wrapper>
  );
};
export default FeedPresenter;
