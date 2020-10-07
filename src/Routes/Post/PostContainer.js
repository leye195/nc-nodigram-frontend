import React from "react";
import { useQuery } from "react-apollo-hooks";
import { useParams } from "react-router-dom";
import PostPresenter from "./PostPresenter";
import { SEE_POST } from "./PostQuries";

const PostContainer = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(SEE_POST, {
    skip: id === undefined,
    variables: { id },
  });
  return <PostPresenter id={id} loading={loading} data={data} />;
};
export default PostContainer;
