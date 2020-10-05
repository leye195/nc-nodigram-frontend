import { gql } from "apollo-boost";

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $postId: String!) {
    addComment(text: $text, postId: $postId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
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
