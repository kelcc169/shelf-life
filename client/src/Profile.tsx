import React, { useState, useEffect } from 'react';
import { IAdditionalProps } from './App';

const Profile: React.FC<IAdditionalProps> = ({user}) => {
  const [ books, setBooks ] = useState([]);

  // get all the books
  // render nav bar, with links!
  
  return(
    <>
      <p>Hello, {user.name}</p>
      <p>I'm a profile!</p>
    </>
  )
}

export default Profile;