
import React from 'react';
import { Header, Form, Button, Modal, Icon, Grid, List } from 'semantic-ui-react';
import ViewContainer from './ViewContainer';
import './css/TeacherBookingList.css';

class TeacherBookingList extends React.Component {

  state = {
      modalOpen: false
  }

  data = {};

  timeSlot_add = () => {
      
  }

  closeModal = () => { this.setState({ modalOpen: false }) }
  openModal = () => { this.setState({ modalOpen: true }) }

  render() {

    return (
      <ViewContainer width='100%' maxWidth='1140px'>
        <Header>
          <div>Bookings</div>
        </Header>

          <List relaxed divided>
            <BookedDay>
              <TimeSlot /><TimeSlot /><TimeSlot />
              <TimeSlot /><TimeSlot /><TimeSlot />
              <TimeSlot /><TimeSlot /><TimeSlot />
            </BookedDay>
            <BookedDay>
              <TimeSlot />
              <TimeSlot />
            </BookedDay>
          </List>

        <footer>
          <Form>
            <Form.Button icon labelPosition='left' fluid positive onClick={this.openModal}>
              <Icon name='add' />Add appointment
            </Form.Button>
          </Form>
          
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
        </footer>
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
      <List.Item style={{padding: '16px 8px'}}>
        <List.Content>
          <Header size='small'>{this.state.date}</Header>
          <div className='booking-time-container'>
            {this.props.children}
          </div>
        </List.Content>
      </List.Item>
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

    // <></> allow for returning a list of components without a wrapper.
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
              <Button icon='edit' basic primary fluid onClick={this.openModal} />
            </Grid.Column>
            <Grid.Column>
              <Button icon='delete' basic negative fluid />
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
