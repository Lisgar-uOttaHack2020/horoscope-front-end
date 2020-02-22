
import React from 'react';
import { Segment, Header, Form, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import ViewContainer from './ViewContainer';
import './css/TeacherBookingList.css';

class TeacherBookingList extends React.Component {

  data = {};

  timeSlot_add = () => {
      
  }

  render() {

    return (
      <ViewContainer width='100%'>

       <div>Bookings</div>

       <div>
        <BookedDay>
          <TimeSlot /><TimeSlot /><TimeSlot />
          <TimeSlot /><TimeSlot /><TimeSlot />
          <TimeSlot /><TimeSlot /><TimeSlot />
        </BookedDay>
        <BookedDay>
          <TimeSlot />
          <TimeSlot />
        </BookedDay>
        </div>

        <Form>
          <Form.Button icon labelPosition='left' fluid onClick={this.timeSlot_add}>
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
      <Segment>
        <Header size='small'>{this.state.date}</Header>
        <div className='booking-time-container'>
          {this.props.children}
        </div>
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

      <div className='booking-time-slot'>
        <div className='definitions'>
          <div>Time</div>
          <div>{this.state.startTime} to {this.state.endTime}</div>
          <div>Student</div>
          <div>{this.state.student}</div>
          <div>Room</div>
          <div>{this.state.room}</div>
        </div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Button icon='edit' fluid onClick={this.openModal} />
            </Grid.Column>
            <Grid.Column>
              <Button icon='delete' fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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

    </>;
  }
}

export default TeacherBookingList;
