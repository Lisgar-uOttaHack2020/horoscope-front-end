
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
          Thank you for using DocBooks! If you enjoyed your experience using our product, please consider
          <a href="#">giving us a 5 star rating</a> or <a href="#">buying us a coffee.</a>
        </p>
      </div>
    );
  }
}

export default EndPage;
