import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

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
    axios.get(`https://openlibrary.org/search.json?title=${searchTitle}&limit=20`)
      .then(res => {
        setResults(res.data)
      })
  }

  // call api for book - isbn
  function handleIsbnSubmit(e: React.FormEvent) {
    e.preventDefault()
    axios.get(`https://openlibrary.org/search.json?isbn=${searchIsbn}&limit=20`)
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
        <Card key={index} style={{ height: '200px', border: '3px solid #FFC107' }}>
          <Card.Body style={{ textAlign: 'center', height: '100%' }}>
            <Card.Text style={{height: '110px'}}>
              <h5>{book.title_suggest}</h5>
              <p>{author}</p>
              <p>{publication}</p>
            </Card.Text>
            <Link to='/library' >
              <Button style={{ bottom: '15px' }} 
                variant='warning' 
                onClick={() => saveBook(book)}>Save Book</Button>
            </Link>
          </Card.Body>
        </Card>
      )
    })
  } else {
    searchResults = <p></p>
  }

  return(
    <div>
    <Tabs defaultActiveKey="title" id="uncontrolled-tab-example">
      <Tab eventKey="title" title="Search Titles">
        <div style={{height: '70px'}}>
          <form onSubmit={handleTitleSubmit} >
            <input type='text' name='title' placeholder='Book Title' value={searchTitle} onChange={handleTitleChange} />
            <input type='submit' value='Search' className="btn btn-warning" />
          </form>
        </div>
        <div className='container'>
          <CardColumns>
            {searchResults}
          </CardColumns>
        </div>
      </Tab>
      <Tab eventKey="isbn" title="Search ISBN">
        <div style={{height: '70px'}}>
          <form onSubmit={handleIsbnSubmit} >
            <input type='text' name='isbn' placeholder='Book ISBN' value={searchIsbn} onChange={handleIsbnChange} />
            <input type='submit' value='Search' className="btn btn-warning" />
          </form>
        </div>
        <CardColumns>
          {searchResults}
        </CardColumns>
      </Tab>
    </Tabs>
  </div>
  )
}

export default AddBook;