import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IBookProps } from './interfaces';

const BookDetail: React.FC<IBookProps> = ({selectedBook, removeBook}) => {
  const [ details, setDetails ] = useState()

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
        <button onClick={() => removeBook(selectedBook._id)} >Remove Book</button>
      </div>
    )
  } else {
    return(<p>Loading Book Details</p>)
  }
}

export default BookDetail;