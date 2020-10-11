import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import { useHistory, useParams } from "react-router-dom";
import { ME } from "../../Components/Post/PostQueries";
import useInput from "../../Hooks/useInput";
import MessagePresenter from "./MessagePresenter";
import {
  NEW_MESSAGE,
  SEE_ROOM,
  SEE_ROOMS,
  SEND_MESSAGE,
} from "./MessageQueries";
import WithSuspense from "../../Components/WithSuspense";

const MessageContainer = () => {
  const { type } = useParams();
  const input = useInput("");
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading } = useQuery(SEE_ROOMS);
  const { data: meQuery, loading: meLoading } = useQuery(ME);
  const { data: roomData, loading: roomLoading } = useQuery(SEE_ROOM, {
    suspend: true,
    skip: type === "inbox" || type === "new" || !type,
    variables: { roomId: type },
  });
  const [messages, setMessages] = useState([]);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { data: newMessageData } = useSubscription(NEW_MESSAGE, {
    skip: type === "inbox" || type === "new" || !type,
    variables: { roomId: type },
  });

  const toggleModal = () => {
    setIsModalOpen((cur) => !cur);
    history.push(`/direct/new`);
  };

  const onKeyPress = async (e) => {
    const { key } = e;
    if (key === "Enter") {
      e.preventDefault();
      if (input.value !== "") {
        await sendMessageMutation({
          variables: { roomId: type, message: input.value },
        });
        input.setValue("");
      }
    }
  };

  const handleNewMessage = useCallback(() => {
    if (newMessageData) {
      const { newMessage } = newMessageData;
      //console.log(newMessage);
      setMessages((cur) => [...cur, newMessage]);
    }
  }, [newMessageData]);
  //console.log(roomData, roomLoading);
  useEffect(() => {
    if (type !== "new" && type !== "inbox") {
      setIsModalOpen((cur) => false);
      if (roomData) {
        setMessages((cur) => roomData?.seeRoom?.messages);
      }
    }
    handleNewMessage();
  }, [type, handleNewMessage, roomData]);
  //console.log(roomData, messages);
  return (
    <MessagePresenter
      data={data}
      loading={loading}
      meQuery={meQuery}
      meLoading={meLoading}
      type={type}
      roomData={roomData}
      messages={messages}
      roomLoading={roomLoading}
      input={input}
      onKeyPress={onKeyPress}
      toggleModal={toggleModal}
      isModalOpen={isModalOpen}
    />
  );
};
export default WithSuspense(MessageContainer);
