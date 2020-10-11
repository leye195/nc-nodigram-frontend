const { gql } = require("apollo-boost");

export const USER_BY_USERNAME = gql`
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      avatar
      username
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($username: String!) {
    createRoom(username: $username) {
      id
    }
  }
`;
