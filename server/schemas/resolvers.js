const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
    },

    Mutation: {
        addUser: async (parent, {userName, password, firstName, lastName }) => {
            const user = await User.create({
                userName, password, firstName, lastName
            })
            const token = signToken(user)
            return { token, user}
        }
    }
}