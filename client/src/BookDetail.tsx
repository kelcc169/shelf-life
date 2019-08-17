import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IBookProps, IAuthor } from './interfaces';

const BookDetail: React.FC<IBookProps> = ({selectedBook}) => {
  const [ details, setDetails ] = useState()

  useEffect(() => {
    const search = 'ISBN:' + selectedBook.isbn
    axios.get(`https://openlibrary.org/api/books?bibkeys=${search}&jscmd=data&format=json`)
      .then(res => {
        setDetails(res.data[search])
      })
  }, [selectedBook.isbn])

  if (details) {
    const authors = details.authors.map((author: IAuthor, index: number) => {
      return <h4 key={index} >{author.name}</h4>
    })

    return(
      <div>
        <h2>{details.title}</h2>
        {authors}
        <img src={details.cover.medium} alt='book cover' />
      </div>
    )
  } else {
    return(<p>Loading Book Details</p>)
  }
}

export default BookDetail;