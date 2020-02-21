
import React from 'react';

import { Header } from 'semantic-ui-react';

import './css/Page.css';

import docBook from './img/docBook.svg';

class LandingPage extends React.Component {

  render() {

    return (
      <div className='app-container' style={{textAlign: 'center'}}>
        <img id="central-logo" src={docBook} alt="logo" />
        <Header as='h1' style={{marginTop: 72}}>Welcome to BOOKING APP</Header>
        <Header as='h3'>SUBTITLE</Header>
        <p className='center-block'>
          Description of the app.
        </p>
      </div>
    );
  }
}

export default LandingPage;
