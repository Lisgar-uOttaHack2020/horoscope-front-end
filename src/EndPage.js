
import React from 'react';

import './Page.css';

import docBook from './docBook.svg';

class EndPage extends React.Component {

  render() {

    return (
      <div style={{textAlign: 'center'}}>
        <img id="central-logo" src={docBook} alt="logo" />
        <p className='center-block' style={{marginTop: 72}}>
          An email has been sent to confirm your bookings.
        </p>
        <p className='center-block'>
          THANK YOU NOTE
        </p>
      </div>
    );
  }
}

export default EndPage;
