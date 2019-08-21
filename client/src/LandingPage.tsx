import React from 'react';

const LandingPage: React.FC = () => {
  return(
    <div className='landing-page'>
      <div className='info'>
        <h3>Welcome to Shelf-Life!</h3>
        <p>Shelf-Life is a personal library app.</p> 
        <p>Manage what's in your library.</p>
        <p>Keep track of who you've loaned books to.</p>
        <p>Make personal notes about each book.</p>
      </div>
      <p style={{ color: 'rgb(250, 228, 161)', position: 'fixed', bottom: '2px', right: '5px'}}>Photo by Erol Ahmed on Unsplash</p>
    </div>
  )
}

export default LandingPage;