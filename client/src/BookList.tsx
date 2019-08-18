import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchFilter from './SearchFilter';

import { IBook, ISelectBook } from './interfaces';

const BookList: React.FC<ISelectBook> = ({books, setSelectedBook}) => {
  const [ filter, setFilter ] = useState<string>('')

  if (books.length > 0) {    
    const bookFilter = Array.from(books).filter(book => {
      var bookString = JSON.stringify(book)
      return bookString.toLowerCase().includes(filter.toLowerCase())
    })

    const filteredList = bookFilter.map((book: IBook, index: number) => {
      return <Link to={`/books/${book.isbn}`} key={index}><button onClick={() =>setSelectedBook(book)}>{book.title}</button></Link>
    })
    return(
      <>
        <SearchFilter setFilter={setFilter} filter={filter} />
        {filteredList}
      </>
      )
  } else {
    return(<p>No Books In Your Library!</p>)
  }
}

export default BookList;