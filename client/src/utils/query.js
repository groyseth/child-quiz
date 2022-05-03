import { gql } from "@apollo/client";

export const SCORES = gql`
query Query {
    users {
      _id
      userName
      password
      firstName
      lastName
      scores {
        _id
        scored
        createdAt
      }
    }
  }
`;