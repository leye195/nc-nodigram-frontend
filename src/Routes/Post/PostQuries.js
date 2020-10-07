const { gql } = require("apollo-boost");

export const SEE_POST = gql`
  query seePost($id: String!) {
    seeFullPost(id: $id) {
      id
      caption
      location
      likeCount
      isLiked
      commentCount
      user {
        id
        username
        avatar
        post {
          id
          files {
            id
            url
          }
          likeCount
          commentCount
        }
      }
      files {
        url
        id
      }
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
