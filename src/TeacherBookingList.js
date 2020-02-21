
import React from 'react';
import { Segment, Header, Form, Button, Modal, Icon } from 'semantic-ui-react';
import './css/TeacherBookingList.css';

class TeacherBookingList extends React.Component {

  data = {};

  addNew = () => {
      
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h2'>List of Bookings</Header></Segment>
          <Segment>
            <Form>
              <BookedDay>
                <TimeSlot />
                <TimeSlot />
                <TimeSlot />
              </BookedDay>
              <BookedDay>
                <TimeSlot />
                <TimeSlot />
              </BookedDay>
            </Form>
          </Segment>
          <Segment>
            <Button onClick={this.addNew}>Add a new time slot</Button>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

class BookedDay extends React.Component {

  state = {
    date: "[Date]"
  };

  render() {

    return (
      <Segment className='booking-day'>
        <label><strong>{this.state.date}</strong></label>
        {this.props.children}
      </Segment>
    );
  }
}

class TimeSlot extends React.Component {

  state = {
    startTime: "[Start Time]",
    endTime: "[End Time]",
    room: "[Room]",
    modalOpen: false
  };

  closeModal = () => { this.setState({ modalOpen: false }) }
  openModal = () => { this.setState({ modalOpen: true }) }

  render() {

    return (
      <div className='booking-time-slot'>
        <label>{this.state.startTime} - {this.state.endTime}</label><br />
        <label>Room: {this.state.room}</label>
        <div className="time-slot-options">
          <a href="#edit" onClick={this.openModal}>Edit</a>
          <a href="#delete">Delete</a>
        </div>
        <Modal open={this.state.modalOpen}>
          <Header content='Edit time slot' />
          <Modal.Content>
            EDIT CONTENT HERE
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal}>
              <Icon name='remove' />Cancel
            </Button>
            <Button primary onClick={this.closeModal}>
              <Icon name='checkmark' />Apply
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default TeacherBookingList;
