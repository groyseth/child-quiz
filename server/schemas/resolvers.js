const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate()
        },
    },

    Mutation: {
        addUser: async (parent, { userName, password, firstName, lastName }) => {
            const users = await User.create({userName, password, firstName, lastName})
            console.log("added user");
            const token = signToken(users)
            return { token, users }
        }
    }
}

module.exports = resolvers;