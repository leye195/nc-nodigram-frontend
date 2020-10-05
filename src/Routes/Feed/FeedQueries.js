import { gql } from "apollo-boost";

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      user {
        id
        username
        avatar
      }
      files {
        id
        url
      }
      location
      caption
      likeCount
      commentCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;
