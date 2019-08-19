import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { ILoanProps, ILoan } from './interfaces';

const Loan: React.FC<ILoanProps> = ({selectedBookId, libraryId}) => {
  const [ loan, setLoan ] = useState<ILoan>({} as ILoan);
  const [ name, setName ] = useState<string>('');

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function loanBook() {
    axios.post(`/api/library/${libraryId}/${selectedBookId}`, {
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
    })
  }

  useEffect(() => {
    axios.get(`/api/library/${libraryId}/${selectedBookId}`)
      .then(res => {
        setLoan(res.data)
      })
  }, [libraryId, selectedBookId, loan.currentStatus])
  

  if (loan.currentStatus) {
    return(<p onClick={checkInBook} >Check In</p>)
  } else {
    return(
      <div>
        <p onClick={loanBook} >Loan</p>
        <input type='text' name='name' placeholder='Loaned to...' value={name} onChange={handleNameChange} />
      </div>
    )
  }


}

export default Loan;