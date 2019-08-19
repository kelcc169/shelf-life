import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ILoanProps, ILoan } from './interfaces';

const Loan: React.FC<ILoanProps> = ({selectedBookId, libraryId}) => {
  const [ loan, setLoan ] = useState<ILoan>({} as ILoan)

  function loanBook() {
    axios.post(`/api/library/${libraryId}/${selectedBookId}`, {
      date: '8/17/2019',
      name: 'Nanners'
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
    return(<p onClick={loanBook} >Loan</p>)
  }


}

export default Loan;