import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe ($userId: ID!){
        me(userId: $userId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                image
                title
                description
                authors
                link
            }
        }
    }
`