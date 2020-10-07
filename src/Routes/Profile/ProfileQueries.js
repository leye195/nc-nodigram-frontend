const { gql } = require("apollo-boost");

export const GET_USER = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      user {
        id
        username
        avatar
        bio
        fullName
        isSelf
        followers {
          username
          avatar
        }
        following {
          username
          avatar
        }
        followingCount
        followersCount
        isFollowing
        postsCount
      }
      posts {
        id
        likeCount
        commentCount
        files {
          id
          url
        }
      }
    }
  }
`;
