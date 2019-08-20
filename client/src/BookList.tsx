import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

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
      <Card style={{ height: '150px', border: '3px solid #FFC107' }} border='warning' onClick={() => setSelectedBook(book)} key={index}>
        <Link to={`/books/${book.isbn}`} style={{color: 'black', textDecoration: 'none'}}>
        <Card.Body style={{textAlign: 'center'}}>
          <h5>{book.title}</h5>
          <h6>{book.author}</h6>
        </Card.Body>
        </Link>
      </Card>
      )
    })
    return(
      <>
        <SearchFilter setFilter={setFilter} filter={filter} />
        <div style={{padding: '5px 15px'}}>
          <CardColumns>
            {filteredList}
          </CardColumns>
        </div>
      </>
      )
  } else {
    return(<p>No Books In Your Library!</p>)
  }
}

export default BookList;