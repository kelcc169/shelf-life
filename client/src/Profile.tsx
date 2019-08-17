import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

// components!
import BookDetail from './BookDetail';
import BookList from './BookList';
import Nav from './Nav';
import AddBook from './AddBook';

// interfaces!
import { ILibraryProps, IBook } from './interfaces';

const Profile: React.FC<ILibraryProps> = ({libraryId}) => {
  const [ books, setBooks ] = useState<IBook[]>([]);
  const [ selectedBook, setSelectedBook ] = useState<IBook>({} as IBook);

  // get all books associated with the user
  useEffect(() =>{
    if (libraryId) {
      axios.get(`/api/library/${libraryId}`)
        .then(res => {
          setBooks(res.data.books)
        })
    }
  }, [libraryId])

  return(
    <>
      <Nav />
      <BookList setSelectedBook={setSelectedBook} books={books} />
      <Route path='/library/add' render={() => <AddBook libraryId={libraryId} /> } />
      <Route path={`/books/${selectedBook.isbn}`} render={() => <BookDetail selectedBook={selectedBook} />}/>
    </>
  )
}

export default Profile;