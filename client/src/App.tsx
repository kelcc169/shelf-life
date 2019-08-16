import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// components
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import './App.css';

// interfaces
import { IUser } from '../../src/models/user';
export interface ISetTokens {
  setToken: Function;
}
export interface IAdditionalProps {
  user: IUser
}

// APP!
const App: React.FC = () => {
  const [ user, setUser ] = useState<IUser>({} as IUser)
  const [ token, setToken] = useState<string>('')
  const [ errorMessage, setErrorMessage ] = useState<string>('')

  // log out of program
  function logout(): void {
    localStorage.removeItem('mernToken');
    setToken('');
    setUser({} as IUser);
  }

  // check for local token when loading OR when token changes.
  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      localStorage.removeItem('mernToken');
      setToken('');
      setUser({} as IUser);
    } else {
      axios.post('/auth/me/from/token', {token})
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken');
            setToken('');
            setUser({} as IUser);
            setErrorMessage(res.data.message);
            console.log(errorMessage)
          } else {
            localStorage.setItem('mernToken', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
          }
        })
    }
  }, [token, errorMessage])

  var contents;
  if (Object.keys(user).length > 0) {
    contents = (
      <>
        <Profile user={user} />
        <p onClick={logout}>Log Out!</p>
      </>
    )
  } else {
    contents = (
      <>
        <p>Please Log In or Sign Up</p>
        <Link to='/login' >Login</Link>
        <Link to='/signup' >Sign Up</Link>
        <Route path='/login' render={() => <Login setToken={setToken} /> } />
        <Route path='/signup' render={() => <Signup setToken={setToken}  /> } />        
      </>
    )
  }

  // add a nav bar please!
  return (
    <Router >
      {contents}
    </Router>
  );
}

export default App;
