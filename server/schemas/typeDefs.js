const {gql} = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    userName: String
    password: String
    firstName: String
    lastName: String
    scores: [Score]
}

type Score {
    _id: ID
    scored: Int
    createdAt: String
    quizTaken: Int
}

type Auth{
    token: ID!
    users: User
}

type Query{
    users: [User]
    scores: [Score]
    singleUser(userId: ID!): User
}

type Mutation{
    addUser(userName: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(userName: String!, password: String!): Auth
    addScore(userId: ID! scored: Int! createdAt: String! quizTaken: Int! ): Score
    deleteScore(userId: ID!): User
}
`;

module.exports = typeDefs;