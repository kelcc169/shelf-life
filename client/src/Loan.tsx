import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Table from 'react-bootstrap/Table';

import { IIdProps, ILoan, LibraryCard } from './interfaces';

const Loan: React.FC<IIdProps> = ({selectedBookId, libraryId}) => {
  const [ loan, setLoan ] = useState<ILoan>({} as ILoan);
  const [ name, setName ] = useState<string>('');

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function loanBook(e: React.FormEvent) {
    e.preventDefault();
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
    axios.get(`/api/loan/${libraryId}/${selectedBookId}`)
      .then(res => {
        setLoan(res.data)
      })
  }, [libraryId, selectedBookId])

  // past loans
  var loanHistory;
  if (loan !== null && Object.keys(loan).length > 0) {
    loanHistory = loan.loans.map((entry: LibraryCard, index: number) => {
      return (
        <tr key={index} >
          <td>{index + 1}</td>
          <td>{entry.date}</td>
          <td>{entry.name}</td>
        </tr>
      )
    })
  } else {
    loanHistory = <p></p>
  }

  // based on current status, what can you do
  var loanOptions;
  if (loan !== null && loan.currentStatus === true) {
    loanOptions = 
    <div style={{height: '68px', padding: '15px' }}>
      <button className='btn btn-warning' onClick={checkInBook} >Check In</button>
    </div>
  } else {
    loanOptions = 
      <div>
        <form onSubmit={loanBook} >
          <input type='text' name='name' placeholder='Loan book to...' value={name} onChange={handleNameChange} />
          <input className='btn btn-warning' type='submit' value='Loan Book' />
        </form>
      </div>
  }

  return(
      <div>
        {loanOptions}
        <Table>
          <thead>
            <th>#</th>
            <th>Date</th>
            <th>Name</th>
          </thead>
          <tbody>
            {loanHistory}
          </tbody>
        </Table>
      </div>
    )
}

export default Loan;