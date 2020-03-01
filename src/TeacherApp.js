
import React from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';
import TeacherRegister from './TeacherRegister';
import TeacherLogin from './TeacherLogin';
import TeacherControlPanel from './TeacherControlPanel';
import './css/App.css';

class TeacherApp extends React.Component {

  state = {
    view: 'teacher / login',
    modalOpen: false,
    modalMessage: ''
  };

  changeView = (newView) => {

    this.setState({
      view: newView,
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
      />;
    }

    if (this.state.view === 'teacher / login') {
      viewWidget = <TeacherLogin
        location={this.props.location}
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
      />;
    }

    else if (this.state.view === 'teacher / booking list') {
      viewWidget = <TeacherControlPanel
        location={this.props.location}
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
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
