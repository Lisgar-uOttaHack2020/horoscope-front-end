
import React from 'react';

import { Header, Button } from 'semantic-ui-react';

import './Page.css';

import docBook from './docBook.svg';

class LandingPage extends React.Component {

  startApp = () => {
    this.props.changeViewFunc('parentRegister', null);
  }

  render() {

    return (
      <div style={{textAlign: 'center'}}>
        <img id="central-logo" src={docBook} alt="logo" />
        <Header as='h1' style={{marginTop: 72}}>Welcome to BOOKING APP</Header>
        <Header as='h3'>SUBTITLE</Header>
        <p className='center-block'>
          Description of the app.
        </p>
        <p className='center-block'>
          <Button size='huge' onClick={this.startApp} primary>Start booking!</Button>
        </p>
      </div>
    );
  }
}

export default LandingPage;
