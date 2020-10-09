import { gql } from "apollo-boost";

export const SEE_ROOMS = gql`
  query seeRoomss {
    seeRooms {
      id
      participants {
        id
        username
        avatar
      }
      messages {
        id
        text
        to {
          username
          avatar
        }
        from {
          username
          avatar
        }
        createdAt
      }
    }
  }
`;

export const SEE_ROOM = gql`
  query seeRoom($roomId: String!) {
    seeRoom(roomId: $roomId) {
      id
      participants {
        id
        username
        avatar
      }
      messages {
        id
        text
        to {
          username
          avatar
        }
        from {
          username
          avatar
        }
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String, $message: String!, $toId: String) {
    sendMessage(roomId: $roomId, message: $message, toId: $toId) {
      id
      text
      room {
        id
      }
      from {
        id
        username
        avatar
      }
      to {
        id
        username
        avatar
      }
      createdAt
    }
  }
`;

export const ME = gql`
  {
    myProfile {
      user {
        username
      }
    }
  }
`;
