const { gql } = require("apollo-boost");

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollowUser($followId: String!) {
    toggleFollowUser(followId: $followId)
  }
`;
