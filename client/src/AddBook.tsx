import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IAddBook } from './interfaces';

const AddBook: React.FC<IAddBook> = ({libraryId, setSelectedBook, newStatus, setNewStatus}) => {
  const [ search, setSearch ] = useState<string>('')
  const [ results, setResults ] = useState(null as any)

  // set title search parameters
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  // call api for book options
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    axios.get(`http://openlibrary.org/search.json?title=${search}&limit=10`)
      .then(res => {
        setResults(res.data)
      })
  }

  // save the selected book to user's library
  function saveBook(book: any) {
    axios.post(`/api/library/book`, {
      libraryId: libraryId,
      title: book.title_suggest,
      author: book.author_name[0],
      isbn: book.isbn[0]
    }).then(res => {
      setSelectedBook(res.data)
      setNewStatus(newStatus ? false : true)
    })
  }

  if (results !== null) {
    var searchResults;
    searchResults = results.docs.map((book: any, index: number) => {
      if (book.author_name) {
        var author = book.author_name[0]
      }
      
      if (book.publish_date) {
        var publication = book.publish_date[0]
      }
      
      return(
      <div key={index} >
        <p>{book.title_suggest}</p>
        <p>{author}</p>
        <p>{publication}</p>
        <Link to='/library' ><button onClick={() => saveBook(book)}>Save Book</button></Link>
      </div>
      )
    })
  } else {
    searchResults = <p>Enter Book Title</p>
  }

  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type='text' 
          name='search'
          placeholder='Book Title'
          onChange={handleSearchChange}
          value={search} />
        <input type='submit' value='Search' />
      </form>
      {searchResults}
    </div>
  )
}

export default AddBook;