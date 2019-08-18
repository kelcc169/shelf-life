import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Loan from './Loan';

import { IBookProps } from './interfaces';

const BookDetail: React.FC<IBookProps> = ({selectedBook, removeBook, libraryId}) => {
  const [ details, setDetails ] = useState()

  // when selected book changes, make a new api call
  useEffect(() => {
    const search = 'ISBN:' + selectedBook.isbn
    axios.get(`https://openlibrary.org/api/books?bibkeys=${search}&jscmd=data&format=json`)
      .then(res => {
        setDetails(res.data[search])
      })
  }, [selectedBook.isbn])

  if (details) {
    const authors = details.authors.map((author: any, index: number) => {
      return <h4 key={index} >{author.name}</h4>
    })

    var image;
    if (details.cover) {
      image = <img src={details.cover.medium} alt='book cover' />
    } else {
      image = <div>Cover Image Unavailable</div>
    }

    return(
      <div>
        <h2>{details.title}</h2>
        {authors}
        {image}
        <Loan selectedBookId={selectedBook._id} libraryId={libraryId} />
        <Link to='/library' ><button onClick={() => removeBook(selectedBook._id)} >Remove Book</button></Link>
      </div>
    )
  } else {
    return(<p>Loading Book Details</p>)
  }
}

export default BookDetail;