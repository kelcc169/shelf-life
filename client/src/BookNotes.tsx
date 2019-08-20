import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Table from 'react-bootstrap/Table';

import { INote, IIdProps, SingleNote } from './interfaces';

const BookNotes: React.FC<IIdProps> = ({selectedBookId, libraryId}) => {
  const [ note, setNote ] = useState<INote>({} as INote)
  const [ content, setContent ] = useState<string>('')

  function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value)
  }

  function saveNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.post(`/api/library/notes`, {
      bookId: selectedBookId,
      libraryId: libraryId,
      date: moment().format('MM-DD-YYYY'),
      content: content
    }).then(res => {
      setNote(res.data)
      setContent('')
    })
  }

  useEffect(() => {
    axios.get(`/api/notes/${libraryId}/${selectedBookId}`)
      .then(res => {
        setNote(res.data)
      })
  }, [libraryId, selectedBookId])

  var noteContent;
  if (note !== null && Object.keys(note).length > 0) {
    noteContent = note.notes.map((note: SingleNote, index: number) => {
      return(
        <tr key={index}>
          <td>{note.date}</td>
          <td>{note.content}</td>
        </tr>
      )       
    })
  } else {
    noteContent = <p>No Notes Yet!</p>
  }

  return(
    <div>
      <div>
      <form onSubmit={saveNote}>
        <input type='text' 
          name='content' 
          placeholder='Add A Note...' 
          value={content} 
          onChange={handleContentChange} />
        <input className='btn btn-warning' type='submit' value='Add Notes' />
      </form>
      </div>
      <Table>
        <thead>
          <th>Date</th>
          <th>Note</th>
        </thead>
        <tbody>
          {noteContent}
        </tbody>
      </Table>
    </div>
  )
}

export default BookNotes;