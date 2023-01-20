const { gql } = require('apollo-server-express')

const TypeDefs = gql`
    type Query {
        me: User
    }
    type Mutation {
        login:
        addUser:
        saveBook:
        removeBook:
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
        token:
        user: User
    }
`

module.exports = TypeDefs;