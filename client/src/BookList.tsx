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
      return (
      <div className="card" onClick={() =>setSelectedBook(book)}>
          <Link to={`/books/${book.isbn}`} key={index}>
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
          </div>
            </Link>
      </div>
      )
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