
import React from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';
import TeacherRegister from './TeacherRegister';
import TeacherBookingList from './TeacherBookingList';
import './css/App.css';

class TeacherApp extends React.Component {

  state = {
    view: 'teacher / booking list',
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

    let viewWidget = <div>Failed to load view</div>;

    if (this.state.view === 'teacher / register') {
      viewWidget = <TeacherRegister
        location={this.props.location}
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
        params={this.state.paramsToPass}
      />;
    }

    else if (this.state.view === 'teacher / booking list') {
      viewWidget = <TeacherBookingList
        location={this.props.location}
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

export default TeacherApp;
