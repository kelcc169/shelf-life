import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { INav } from './interfaces';

const Navigation: React.FC<INav> = ({logout, libraryId}) => {
  var links;
  if (!libraryId) {
    links =
    <Nav>
      <Link to='/signup' className='nav-link' >Sign Up</Link>
      <Link to='/login' className='nav-link' >Login</Link>
    </Nav>
  } else {
    links =
    <>
      <Nav>
        <Link to='/library' className="nav-link" >Library</Link>
        <Link to='/library/add' className="nav-link">Add A Book</Link>
      </Nav>
      <Nav>
        <Link to='/' className="nav-link" onClick={(e) => logout(e)}>Logout</Link>
      </Nav>
    </>
  }
  
  return(
    <Navbar sticky="top" bg="warning" className="justify-content-between">
      <Navbar.Brand>Shelf-Life</Navbar.Brand>
      {links}
    </Navbar>
  )
}

export default Navigation;