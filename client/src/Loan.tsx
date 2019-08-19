import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { IIdProps, ILoan } from './interfaces';

const Loan: React.FC<IIdProps> = ({selectedBookId, libraryId}) => {
  const [ loan, setLoan ] = useState<ILoan>({} as ILoan);
  const [ name, setName ] = useState<string>('');

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function loanBook() {
    axios.post(`/api/library/loan/`, {
      libraryId: libraryId,
      bookId: selectedBookId,
      date: moment().format('MM-DD-YYYY'),
      name: name
    }).then(res => {
        setLoan(res.data)
      })
  }

  function checkInBook() {
    axios.put(`/api/library/${loan._id}`, {
      currentStatus: false
    }).then(res => {
      setLoan(res.data)
      setName('')
    })
  }

  useEffect(() => {
    axios.get(`/api/library/${libraryId}/${selectedBookId}`)
      .then(res => {
        setLoan(res.data)
      })
  }, [libraryId, selectedBookId])

  // past loans
  var loanHistory;
  if (loan !== null && Object.keys(loan).length > 0) {
    loanHistory = loan.loans.map((entry, index ) => {
      return <p key={index} >{entry.date} - {entry.name}</p>
    })
  } else {
    loanHistory = <p></p>
  }

  // based on current status, what can you do
  var loanOptions;
  if (loan !== null && loan.currentStatus === true) {
    loanOptions = 
    <div>
      <p onClick={checkInBook} >Check In</p>
    </div>
  } else {
    loanOptions = 
      <div>
        <p onClick={loanBook} >Loan</p>
        <input type='text' name='name' placeholder='Loan book to...' value={name} onChange={handleNameChange} />
      </div>
  }

  return(
      <div>
        {loanOptions}
        {loanHistory}
      </div>
    )
}

export default Loan;