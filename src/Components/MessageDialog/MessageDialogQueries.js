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
