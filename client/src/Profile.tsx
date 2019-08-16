import React, { useState, useEffect } from 'react';
import { IUser } from '../../src/models/user';

const Profile: React.FC<IUser> = ({...user}) => {
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