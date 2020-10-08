const { gql } = require("apollo-boost");

export const EXPLORE_POST = gql`
  query explorePost {
    explorePost {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;
