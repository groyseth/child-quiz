const {gql} = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    userName: String
    password: String
    firstName: String
    lastName: String
}

type Auth{
    token: ID!
    users: User
}

type Query{
    users: [User]
}

type Mutation{
    addUser(userName: String!, password: String!, firstName: String!, lastName: String!): Auth
}
`;

module.exports = typeDefs;