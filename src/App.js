import React from 'react';

import { Modal, Button, Message } from 'semantic-ui-react';

import ViewCustomerRegister from './ViewCustomerRegister';
import ViewChildChooseDateAndTime from './ViewChildChooseDateAndTime';
import LandingPage from './LandingPage';
import EndPage from './EndPage';

import './App.css';

class App extends React.Component {

  state = {
    view: 'landingPage',
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

    else if (this.state.view === 'customerRegister') {
      viewWidget = <ViewCustomerRegister
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
        params={this.state.paramsToPass}
      />;
    }

    else if (this.state.view === 'childChooseDateAndTime') {
      viewWidget = <ViewChildChooseDateAndTime
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
      <div>
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

export default App;
