import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { INav } from './interfaces';

const Navigation: React.FC<INav> = ({logout}) => {
  return(
    <Navbar sticky="top" bg="warning" className="justify-content-between">
      <Navbar.Brand>Shelf-Life</Navbar.Brand>
      <Nav>
        <Link to='/library' className="nav-link" >Library</Link>
        <Link to='/library/add' className="nav-link">Add A Book</Link>
      </Nav>
      <Nav>
        <Link to='/' className="nav-link" onClick={(e) => logout(e)}>Logout</Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation;