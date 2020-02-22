
import React from 'react';
import { Segment, Header, Form, Button, Modal, Icon, List } from 'semantic-ui-react';
import ViewContainer from './ViewContainer';
import './css/TeacherBookingList.css';

class TeacherBookingList extends React.Component {

  data = {};

  addNew = () => {
      
  }

  render() {

    return (
      <ViewContainer width='100%'>

       <div>Bookings</div>

       <div>
        <BookedDay>
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
        </BookedDay>
        <BookedDay>
          <TimeSlot />
          <TimeSlot />
        </BookedDay>
        </div>

        <Form>
          <Form.Button icon labelPosition='left' fluid onClick={this.addNew}>
            <Icon name='plus' />Add appointment
          </Form.Button>
        </Form>
        
      </ViewContainer>
    );
  }
}

class BookedDay extends React.Component {

  state = {
    date: '[Date]'
  };

  render() {

    return (
      <Segment className='booking-day'>
        <Header size='small'>{this.state.date}</Header>
        <List divided relaxed>
          {this.props.children}
        </List>
      </Segment>
    );
  }
}

class TimeSlot extends React.Component {

  state = {
    startTime: '[Start Time]',
    endTime: '[End Time]',
    room: '[Room]',
    student: '[Student]',
    modalOpen: false
  };

  closeModal = () => { this.setState({ modalOpen: false }) }
  openModal = () => { this.setState({ modalOpen: true }) }

  render() {

    // <></> allow for returning a list of components without a wrapper. Wrappers mess up List.Item's formatting.
    return <>
      <List.Item className='booking-time-slot'>
        <List.Content floated='right'>
          <Button icon='edit' onClick={this.openModal} />
          <Button icon='delete' />
        </List.Content>
        <List.Content className='booking-time-slot-info'>
          <div className='definitions'>
            <div>Time</div>
            <div>{this.state.startTime} to {this.state.endTime}</div>
            <div>Student</div>
            <div>{this.state.student}</div>
            <div>Room</div>
            <div>{this.state.room}</div>
          </div>
        </List.Content>
      </List.Item>
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
    </>;
  }
}

export default TeacherBookingList;
