import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import useInput from "../../Hooks/useInput";
import MessageDialogPresenter from "./MessageDialogPresenter";
import { USER_BY_USERNAME, CREATE_ROOM } from "./MessageDialogQueries";

const MessageDialogContainer = () => {
  const receiver = useInput("");
  const history = useHistory();
  const { data, loading } = useQuery(USER_BY_USERNAME, {
    skip: receiver.value === "",
    variables: { username: receiver.value },
  });
  const [createRoomMutation] = useMutation(CREATE_ROOM);

  const selectUser = async (username) => {
    const {
      data: { createRoom },
    } = await createRoomMutation({
      variables: { username },
    });
    history.push(`/direct/${createRoom.id}`);
  };

  useEffect(() => {}, [receiver.value]);
  return (
    <MessageDialogPresenter
      receiver={receiver}
      data={data}
      loading={loading}
      selectUser={selectUser}
    />
  );
};
export default MessageDialogContainer;
