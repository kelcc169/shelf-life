import React from 'react';
import { Link } from 'react-router-dom';

import { INav } from './interfaces';

const Nav: React.FC<INav> = ({logout}) => {
  return(
    <div>
      <Link to='/library' ><button>Library</button></Link>
      <Link to='/library/add' ><button>Add A Book</button></Link>
      <Link to='/' ><button onClick={(e) => logout(e)}>Logout</button></Link>
    </div>
  )
}

export default Nav;