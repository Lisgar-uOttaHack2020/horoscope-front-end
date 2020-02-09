
import React from 'react';

import { Header, Button } from 'semantic-ui-react';

import './Page.css';

import docBook from './docBook.svg';

class LandingPage extends React.Component {

  startApp = () => {
    this.props.changeViewFunc('customerRegister', null);
  }

  render() {

    return (
      <div style={{textAlign: 'center'}}>
        <img id="central-logo" src={docBook} alt="logo" />
        <Header as='h1' style={{marginTop: 72}}>Welcome to DocBook</Header>
        <Header as='h3'>Making Appointment Booking as Easy as 123!</Header>
        <p className='center-block'>
          DocBook is a doctor booking web application that allows patients to book appointments from the comfort of their own homes.
        </p>
        <p className='center-block'>
          <Button size='huge' onClick={this.startApp} primary>Start Booking!</Button>
        </p>
      </div>
    );
  }
}

export default LandingPage;
