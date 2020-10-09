import React, { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import MessageDialogPresenter from "./MessageDialogPresenter";
import { USER_BY_USERNAME } from "./MessageDialogQueries";

const MessageDialogContainer = () => {
  const receiver = useInput("");
  const { data, loading } = useQuery(USER_BY_USERNAME, {
    skip: receiver.value === "",
    variables: { username: receiver.value },
  });
  useEffect(() => {}, [receiver.value]);
  return (
    <MessageDialogPresenter receiver={receiver} data={data} loading={loading} />
  );
};
export default MessageDialogContainer;
