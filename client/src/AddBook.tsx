import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { IAddBook } from './interfaces';

const AddBook: React.FC<IAddBook> = ({libraryId, setSelectedBook, newStatus, setNewStatus}) => {
  const [ searchTitle, setSearchTitle ] = useState<string>('')
  const [ searchIsbn, setSearchIsbn] = useState<string>('')
  const [ results, setResults ] = useState(null as any)

  // set title search parameters
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTitle(e.target.value)
  }

  // set isbn search parameters
  function handleIsbnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchIsbn(e.target.value)
  }

  // call api for book options - title
  function handleTitleSubmit(e: React.FormEvent) {
    e.preventDefault()
    axios.get(`http://openlibrary.org/search.json?title=${searchTitle}&limit=20`)
      .then(res => {
        setResults(res.data)
      })
  }

  // call api for book - isbn
  function handleIsbnSubmit(e: React.FormEvent) {
    e.preventDefault()
    axios.get(`http://openlibrary.org/search.json?isbn=${searchIsbn}&limit=20`)
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
    searchResults = <p></p>
  }

  return(
    // <div>
    <div>
    {/* <h5>Search for Books</h5> */}
    <Tabs defaultActiveKey="title" id="uncontrolled-tab-example">
      <Tab eventKey="title" title="Search Titles">
        <div>
          <form onSubmit={handleTitleSubmit} >
            <input type='text' name='title' placeholder='Book Title' value={searchTitle} onChange={handleTitleChange} />
            <input type='submit' value='Search' />
          </form>
        </div>
        {searchResults}
      </Tab>
      <Tab eventKey="isbn" title="Search ISBN">
        <div>
          <form onSubmit={handleIsbnSubmit} >
            <input type='text' name='isbn' placeholder='Book ISBN' value={searchIsbn} onChange={handleIsbnChange} />
            <input type='submit' value='Search' />
          </form>
        </div>
        {searchResults}
      </Tab>
    </Tabs>
  </div>
  )
}

export default AddBook;