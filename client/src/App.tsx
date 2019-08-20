import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// components
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Nav from './Nav';
import './App.css';

// interfaces
import { IUser } from './interfaces';

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
        <Route path='/' render={() => <Profile libraryId={user.library} />} />
      </>
    )
  } else {
    contents = (
      <>
        <Route path='/login' render={(props) => <Login setToken={setToken} {...props} /> } />
        <Route path='/signup' render={(props) => <Signup setToken={setToken} {...props} /> } />        
      </>
    )
  }
  
  return (
    <Router >
      <div className='app' >
        <Nav logout={logout} libraryId={user.library} />
        {contents}
      </div>
    </Router>
  );
}

export default App;
