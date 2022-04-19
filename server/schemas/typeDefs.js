const {gpl} = require('apollo-server-express');

const typeDefs = gpl`

type User {
    _id: ID
    userName: String
    password: String
    firstName: String
    lastName: String
}

type Auth{
    token: ID!
    user: User
}

type Query{
    user: [User]
}

type Mutation{
    addUser(userName: String, password: String, firstName: String, lastName: String): Auth
}
`