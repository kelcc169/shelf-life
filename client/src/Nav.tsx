import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return(
    <div>
      <Link to='/' >Home Page</Link>
      <Link to='/library/add' >Add A Book</Link>
    </div>
  )
}

export default Nav;