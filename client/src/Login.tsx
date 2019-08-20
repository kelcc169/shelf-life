import React, { useState } from 'react';
import axios from 'axios';

import { ISetTokens } from './interfaces';

const Login: React.FC<ISetTokens> = ({setToken, history}) => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ message, setMessage ] = useState<string>('');

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    axios.post('/auth/login', {
      email: email,
      password: password
    }).then(res => {
      if (res.data.type === 'error') {
        setEmail('');
        setPassword('');
        setMessage(res.data.message);
        console.log(message);
      } else {
        localStorage.setItem('mernToken', res.data.token);
        setMessage('')
        setToken(res.data.token);
      }
    }).catch(err => {
      setMessage('Maximum login attempts exceeded. Please try again later')
    }).finally(() => {
      history.push('/library')
    })
  }

  return(
    <div className="signup">
    <h3>Log into your account:</h3>
    <form onSubmit={handleSubmit}>
      <input type="email"
        name="email"
        placeholder="Enter your email..."
        onChange={handleEmailChange}
        value={email} /><br />
      <input type="password"
        name="password"
        placeholder="Enter your password..."
        onChange={handlePasswordChange}
        value={password} /><br />
      <input className='btn btn-warning' type="submit" value="Log In!" />
    </form>
  </div>
  )
}

export default Login;