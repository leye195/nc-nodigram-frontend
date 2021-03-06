const { gql } = require("apollo-boost");

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      username
      avatar
      isFollowing
      isSelf
    }
  }
`;
