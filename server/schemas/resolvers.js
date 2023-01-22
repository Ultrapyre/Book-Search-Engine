const { User } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
      // getSingleUser,
      me: async (parent, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
    Mutation: {
      // addUser(username: String!, email: String!, password: String!): Auth
      addUser: async(parent, {username, email, password}) => {
        const user = await User.create({username, email, password})
        const token = signToken(user)
        return { token, user }
      },
      // saveBook, saveBook(book: bookTemplate!): User
      saveBook: async(parent, { bookBody }, context) => {
        if (context.user){
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookBody } },
            { new: true, runValidators: true }
          )
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      // removeBook
      removeBook: async(parent, { bookId }, context) => {
        if (context.user){
          return await User.findOneAndUpdate(
            {_id: context.user._id},
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          )
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      // login, login(email: String!, password: String!): Auth
      login: async(parent, { email, password }) => {
        const user = await User.findOne({email})

        if(!user){
          throw new AuthenticationError('No user found with this email address!')
        }

        const correctPw = user.isCorrectPassword(password)

        if(!correctPw){
          throw new AuthenticationError('Wrong credientals!')
        }

        const token = signToken(user);
        return { token, user };
      }
    }
}

module.exports = resolvers