import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation Mutation($userName: String!, $password: String!, $firstName: String!, $lastName: String!) {
  addUser(userName: $userName, password: $password, firstName: $firstName, lastName: $lastName) {
    users {
      userName
      _id
      password
      firstName
      lastName
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
mutation Mutation($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    token
    users {
      userName
      password
      _id
    }
  }
}
`