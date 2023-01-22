const { gql } = require('apollo-server-express')

const TypeDefs = gql`
    input bookTemplate {
        bookId: String
        authors: [String!]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(userId: ID!, bookBody: bookTemplate!): User
        removeBook(userId: ID!, bookId: String!): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
`

module.exports = TypeDefs;