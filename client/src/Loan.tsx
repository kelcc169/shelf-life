import React, { useEffect } from 'react';
import axios from 'axios';

import { ILoanProps } from './interfaces';

const Loan: React.FC<ILoanProps> = ({selectedBookId, libraryId}) => {
  
  
  useEffect(() => {
    // get loan info on the book - library and book id required
    
  })
  
  return(<p>Loan</p>)
}

export default Loan;