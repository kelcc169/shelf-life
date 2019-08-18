import React, { useState } from 'react';

import { IFilter } from './interfaces';

const SearchFilter: React.FC<IFilter> = ({setFilter, filter}) => {
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  return(
    <div>
      <input 
        type='text' 
        placeholder='Search Library...' 
        value={filter} 
        onChange={handleFilterChange} />
    </div>
  )
}

export default SearchFilter;