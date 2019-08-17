import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ILibraryProps } from './interfaces';

const AddBook: React.FC<ILibraryProps> = ({libraryId}) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ isbn, setIsbn ] = useState('')

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }

  function handleAuthorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(e.target.value)
  }

  function handleIsbnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsbn(e.target.value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    axios.post(`/api/library/${libraryId}`, {
      title: title,
      author: author,
      isbn: isbn
    }).then(res => {
      
      console.log(res.data.results)
    })
  }
  
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' 
          name='title'
          placeholder='Book Title'
          onChange={handleTitleChange}
          value={title} />
        <input type='text' 
          name='author'
          placeholder='Author'
          onChange={handleAuthorChange}
          value={author} />
        <input type='text' 
          name='isbn'
          placeholder='ISBN'
          onChange={handleIsbnChange}
          value={isbn} />
        <Link to='/'><input type='submit' value='AddBook!' /></Link>
      </form>
    </div>
  )
}

export default AddBook;