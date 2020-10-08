import React from "react";
import { useQuery } from "react-apollo-hooks";
import { useParams } from "react-router-dom";
import { ME } from "../../Components/Post/PostQueries";
import MessagePresenter from "./MessagePresenter";
import { SEE_ROOMS } from "./MessageQueries";

const MessageContainer = () => {
  const { type } = useParams();
  const { data, loading } = useQuery(SEE_ROOMS);
  const { data: meQuery, loading: meLoading } = useQuery(ME);
  return (
    <MessagePresenter
      data={data}
      loading={loading}
      meQuery={meQuery}
      meLoading={meLoading}
      type={type}
    />
  );
};
export default MessageContainer;
