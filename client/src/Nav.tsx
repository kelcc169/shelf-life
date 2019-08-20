import React from 'react';
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

import { INav } from './interfaces';

const Navigation: React.FC<INav> = ({logout}) => {
  return(
    <nav className="justify-content-between navbar navbar-expand navbar-light sticky-top bg-warning">
      <span className='navbar-brand' ><i className="fas fa-book" />  Shelf-Life</span>
      <Nav>
        <Link to='/library' className="nav-link topnav" >Library</Link>
        <Link to='/library/add' className="nav-link topnav">Add Book</Link>
      </Nav>
      <Nav>
        <Link to='/' className="nav-link topnav" onClick={(e) => logout(e)}>Logout</Link>
      </Nav>
    </nav>
  )
}

export default Navigation;