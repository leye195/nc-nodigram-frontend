import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Loader from "../../Components/Loader";
import FullPost from "../../Components/FullPost";
import { flex } from "../../Styles/Mixin";
import SquarePost from "../../Components/SquarePost";
import FatText from "../../Components/FatText";
import Divide from "../../Components/Divide";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  ${flex("column", "center")};
  max-width: 900px;
  min-height: 80vh;
  margin: 0 auto;
`;

const Section = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 150px;
  grid-auto-rows: 150px;
  margin-bottom: 40px;
`;

const Posts = styled.article`
  width: 100%;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 220px;
  grid-auto-rows: 220px;
  max-width: 900px;
`;

const TextWrapper = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Span = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 300;
`;

const UserLink = styled(Link)`
  margin: 0 5px;
  color: ${(props) => props.theme.blackColor};
`;

const PostPresenter = ({ id, loading, data }) => {
  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading && (
        <>
          <FullPost {...data?.seeFullPost} />
          {data?.seeFullPost?.user?.post?.length > 1 && (
            <>
              <Divide />
              <TextWrapper>
                <Span>{`See more`}</Span>
                <UserLink to={`/${data?.seeFullPost?.user?.username}`}>
                  <FatText text={`${data?.seeFullPost?.user?.username}'s`} />
                </UserLink>
                <Span>{`posts`}</Span>
              </TextWrapper>
              <Posts>
                <PostSection>
                  {data?.seeFullPost?.user?.post
                    ?.filter((p) => p.id !== id)
                    ?.slice(0, 6)
                    ?.map((p) => (
                      <SquarePost
                        key={p.id}
                        id={p.id}
                        file={p.files[0]}
                        likeCount={p.likeCount}
                        commentCount={p.commentCount}
                      />
                    ))}
                </PostSection>
              </Posts>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
PostPresenter.propTypes = {
  id: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired,
};
export default PostPresenter;
