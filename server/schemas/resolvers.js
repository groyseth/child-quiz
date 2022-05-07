const { AuthenticationError } = require('apollo-server-express');
const { User, Score } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate("scores")
        },
        scores: async () => {
          return Score.find()
        },
        singleUser: async (parent, {userId}) => {
          return User.findOne({userId}).populate("scores")
        }
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

        addScore: async (parent, {userId, scored, createdAt, quizTaken}) => {
          const score = await Score.create({scored,createdAt, quizTaken});
          await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { scores: score._id }}
          );
          
          console.log(score);
          return score;
        }
    }
}

module.exports = resolvers;