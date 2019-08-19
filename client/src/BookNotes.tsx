import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { INotes, IIdProps, SingleNote } from './interfaces';

const BookNotes: React.FC<IIdProps> = ({selectedBookId, libraryId}) => {
  const [ notes, setNotes ] = useState<INotes>({} as INotes)
  const [ content, setContent ] = useState<string>('')

  function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value)
  }

  function saveNote() {
    axios.post(`/api/notes`, {
      bookId: selectedBookId,
      libraryId: libraryId,
      date: moment().format('MM-DD-YYYY'),
      content: content
    })
  }

  useEffect(() => {
    console.log('i\'m off to find some notes')
    axios.get(`/api/library/${libraryId}/${selectedBookId}/notes`)
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
      })
  }, [selectedBookId, libraryId])

  var noteContent;
  if (notes !== null && Object.keys(notes).length > 0) {
    noteContent = notes.notes.map((note: SingleNote, index: number) => {
      return(
        <div>
          <p>{note.date}</p>
          <p>{note.content}</p>
        </div>
      )
    })
  } else {
    noteContent = <p>No Notes Yet!</p>
  }

  return(
    <>
      <p>I will have notes someday!</p>
      {noteContent}
    </>
  )
}

export default BookNotes;