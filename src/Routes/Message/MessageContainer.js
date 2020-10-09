import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { useParams } from "react-router-dom";
import { ME } from "../../Components/Post/PostQueries";
import useInput from "../../Hooks/useInput";
import MessagePresenter from "./MessagePresenter";
import { SEE_ROOM, SEE_ROOMS, SEND_MESSAGE } from "./MessageQueries";

const MessageContainer = () => {
  const { type } = useParams();
  const input = useInput("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading } = useQuery(SEE_ROOMS);
  const { data: meQuery, loading: meLoading } = useQuery(ME);
  const { data: roomData, loading: roomLoading } = useQuery(SEE_ROOM, {
    skip: type === "inbox" || !type,
    variables: { roomId: type },
  });
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const toggleModal = () => {
    setIsModalOpen((cur) => !cur);
  };

  const onKeyPress = async (e) => {
    const { key } = e;
    if (key === "Enter") {
      await sendMessageMutation({
        variables: { roomId: type },
      });
    }
  };
  //console.log(roomData, roomLoading);
  return (
    <MessagePresenter
      data={data}
      loading={loading}
      meQuery={meQuery}
      meLoading={meLoading}
      type={type}
      roomData={roomData}
      roomLoading={roomLoading}
      input={input}
      onKeyPress={onKeyPress}
      toggleModal={toggleModal}
      isModalOpen={isModalOpen}
    />
  );
};
export default MessageContainer;
