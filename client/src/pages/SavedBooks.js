import React from 'react';
import { useParams } from 'react-router-dom';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery , useMutation } from '@apollo/client';
// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries'
import { REMOVE_BOOK } from '../utils/mutations'

const SavedBooks = () => {
  //const [userData, setUserData] = useState({});
  const { userId: userParam } = useParams();
  const [deleteBook , {error}] = useMutation(REMOVE_BOOK)

  const { loading, userData } = useQuery(GET_ME, {
    variable: { userId: userParam }
  })

  if (!userData) {
    throw new Error('something went wrong!');
  }

  // todo: Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function 
  // instead of the deleteBook() function that's imported from API file. 
  // (Make sure you keep the removeBookId() function in place!)

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //const response = await deleteBook(bookId, token);
      const mutationResponse = await deleteBook({
        variables: {bookId: bookId}
      })

      if (error) {
        throw new Error('something went wrong!');
      }

      //const updatedUser = await response.json();
      //setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
