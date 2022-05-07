import { gql } from "@apollo/client";

export const SCORES = gql`
query Query($userId: ID!) {
  singleUser(userId: $userId) {
    _id
    userName
    firstName
    lastName
    scores {
      _id
      scored
      createdAt
      quizTaken
    }
  }
}
`;