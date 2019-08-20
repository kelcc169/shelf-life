import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

import Loan from './Loan';
import BookNotes from './BookNotes';

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
    var image;
    if (details.cover) {
      image = <img src={details.cover.medium} alt='book cover' />
    } else {
      image = <div>Cover Image Unavailable</div>
    }

    return(
      <div>
        <h3 style={{margin: '10px'}}>{details.title}</h3>
        <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
          <Tab eventKey="details" title="Details">
            <div style={{textAlign: 'center', padding: '25px'}}>
              <h5>Author - {selectedBook.author}</h5>
              {image}
              <br />
              <Link to='/library' ><Button style={{ margin: '5px auto'}}variant='warning' onClick={() => removeBook(selectedBook._id)} >Remove Book</Button></Link>
            </div>
          </Tab>
          <Tab eventKey="loan" title="Loan Book">
            <Loan selectedBookId={selectedBook._id} libraryId={libraryId} />
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <BookNotes selectedBookId={selectedBook._id} libraryId={libraryId} />
          </Tab>
        </Tabs>
      </div>
    )
  } else {
    return(<p>Loading Book Details</p>)
  }
}

export default BookDetail;