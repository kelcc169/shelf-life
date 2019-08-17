import React from 'react';
import { Link } from 'react-router-dom';

import { IBook, ISelectBook } from './interfaces';

const BookList: React.FC<ISelectBook> = ({books, setSelectedBook}) => {
  if (books.length > 0) {
    const bookList = books.map((book: IBook, index: number) => {
      return <Link to={`/books/${book.isbn}`} key={index}><button onClick={() =>setSelectedBook(book)}>{book.title}</button></Link>
    })
    return(
      <>{bookList}</>
      )
  } else {
    return(<p>No Books In Your Library!</p>)
  }
}

export default BookList;