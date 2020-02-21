import React from 'react';

import { Modal, Button, Message } from 'semantic-ui-react';

import ParentRegister from './ParentRegister';
import ParentBooking from './ParentBooking';
import LandingPage from './LandingPage';
import EndPage from './EndPage';

import './css/ParentApp.css';

class ParentApp extends React.Component {

  state = {
    view: 'parentRegister',
    paramsToPass: null,
    modalOpen: false,
    modalMessage: ''
  };

  changeView = (newView, newParams) => {

    this.setState({
      view: newView,
      paramsToPass: newParams
    });
  }

  displayMessage = (newMessage) => {

    this.setState({
      modalOpen: true,
      modalMessage: newMessage
    });
  }

  closeMessage = () => {

    this.setState({
      modalOpen: false
    });
  }

  render() {

    let viewWidget = <div>:(</div>;

    if (this.state.view === 'landingPage') {
      viewWidget = <LandingPage
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
        params={this.state.paramsToPass}
      />;
    }

    else if (this.state.view === 'parentRegister') {
      viewWidget = <ParentRegister
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
        params={this.state.paramsToPass}
      />;
    }

    else if (this.state.view === 'parentBooking') {
      viewWidget = <ParentBooking
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
        params={this.state.paramsToPass}
      />;
    }

    else if (this.state.view === 'endPage') {
      viewWidget = <EndPage
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
        params={this.state.paramsToPass}
      />;
    }

    return (
      <div className='app-container'>
        <Modal open={this.state.modalOpen}>
          <Message negative>
            <Message.Header>Error!</Message.Header>
            <p>Message: {this.state.modalMessage}</p>
            <Button default onClick={this.closeMessage} negative fluid>Close</Button>
          </Message>
        </Modal>
        {viewWidget}
      </div>
    );
  }
}

export default ParentApp;
