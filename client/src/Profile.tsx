import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

// components!
import BookDetail from './BookDetail';
import BookList from './BookList';
import AddBook from './AddBook';

// interfaces!
import { ILibraryProps, IBook } from './interfaces';

const Profile: React.FC<ILibraryProps> = ({libraryId}) => {
  const [ books, setBooks ] = useState<IBook[]>([]);
  const [ selectedBook, setSelectedBook ] = useState<IBook>({} as IBook);
  const [ newStatus, setNewStatus ] = useState<boolean>(false);

  // delete a book
  function removeBook(bookId: string) {
    axios.delete(`/api/library/${libraryId}/${bookId}`)
      .then(res => {
      })
      setNewStatus(newStatus ? false : true)
  }

  // get all books associated with the user if the id changes or if a book is added or removed
  useEffect(() =>{
    axios.get(`/api/library/${libraryId}`)
      .then(res => {
        setBooks(res.data.books)
      })
  }, [libraryId, newStatus])

  return(
    <>
      <Route exact path='/library' 
        render={() => 
        <BookList 
          setSelectedBook={setSelectedBook} 
          books={books} /> } />
      <Route path='/library/add' 
        render={() => 
        <AddBook 
          libraryId={libraryId} 
          setSelectedBook={setSelectedBook} 
          setNewStatus={setNewStatus} 
          newStatus={newStatus} /> } />
      <Route path={`/books/${selectedBook.isbn}`} 
        render={() => 
        <BookDetail 
          selectedBook={selectedBook} 
          removeBook={removeBook} 
          libraryId={libraryId} /> } />
    </>
  )
}

export default Profile;