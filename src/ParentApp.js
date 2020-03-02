
import React from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';
import ParentRegister from './ParentRegister';
import ParentBookChild from './ParentBookChild';
import './css/App.css';

class ParentApp extends React.Component {

  state = {
    view: 'parent / register',
    modalOpen: false,
    loaderVisible: false,
    modalMessage: ''
  };

  changeView = (newView) => {

    this.setState({
      view: newView,
    });
  }

  enableLoader = () => {

    this.setState({
      loaderVisible: true
    });
  }
  disableLoader = () => {

    this.setState({
      loaderVisible: false
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

    if (this.state.view === 'parent / register') {
      viewWidget = <ParentRegister
        location={this.props.location}
        loaderVisible={this.state.loaderVisible}
        enableLoaderFunc={this.enableLoader}
        disableLoaderFunc={this.disableLoader}
        changeViewFunc={this.changeView}
        displayModalMessageFunc={this.displayMessage}
      />;
    }

    else if (this.state.view === 'parent / book child') {
      viewWidget = <ParentBookChild
        location={this.props.location}
        loaderVisible={this.state.loaderVisible}
        enableLoaderFunc={this.enableLoader}
        disableLoaderFunc={this.disableLoader}
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

export default ParentApp;
