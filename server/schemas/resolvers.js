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
          return User.findById(userId).populate("scores")
        }
    },

    Mutation: {
        addUser: async (parent, { userName, password, firstName }) => {
            const users = await User.create({userName, password, firstName})
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
        },
        // removeScore: async (parent, {userId}) => {
        //   const score = await Score.deleteMany({scores: score})
        //   await User.findOneAndUpdate(
        //     { _id: userId },
        //     { $pull: { scores: score.score}}
        //   );
          
        //   console.log(score);
          
        // }
        deleteScore: async (parent, {  userId}) => {
          try{
          const currentUser = await User.findOne({_id:userId})
          console.log(currentUser);
          const deletedScore = await Score.deleteMany({_id:currentUser.scores})
          return deletedScore;
          }catch(err){
            console.log(err); 
            return; 
          }
        },
        updateUser: async (parent, args) =>{
          try{
            const updateUser = await User.findByIdAndUpdate({_id: args.userId},{$set: args})
            return updateUser;
          }catch(err){
            console.log(err);
            return
          }
        },
        deleteAcount: async (parent, {userId}) =>{
          try{
            const currentUser = await User.findOne({_id:userId})
            console.log(currentUser);
            const deletedScore = await Score.deleteMany({_id:currentUser.scores})
            const deleteUser = await User.findByIdAndDelete({_id:userId})
            return deleteUser;
            }catch(err){
              console.log(err); 
              return; 
            }
          },
        }
      }


module.exports = resolvers;