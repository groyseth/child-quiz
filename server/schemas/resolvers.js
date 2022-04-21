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
        },
        login: async (parent, {  userName, password }) => {
            const users = await User.findOne({ userName });
      console.log(users);
            if (!users) {
              throw new AuthenticationError('No user with this user name found!');
            }
      
            const correctPw = await users.isCorrectPassword(password);
            
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      console.log("Logged In");
            const token = signToken(users);
            return { token, users };
          },
    }
}

module.exports = resolvers;