
import React from 'react';
import { Segment, Header, Form, Button, Modal, Icon, List } from 'semantic-ui-react';
import './css/TeacherBookingList.css';

class TeacherBookingList extends React.Component {

  state = {
    maxBodyHeight: 0
  }

  data = {};

  addNew = () => {
      
  }

  componentDidMount() {

    this.setState({
      bodyMaxHeight:
        'calc(100vh - 218px - ' /* 218px = height of footer + height of padding */
          + document.querySelector('#header-segment').clientHeight + 'px - '
          + document.querySelector('#footer-segment').clientHeight + 'px)'
    });
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment id='header-segment'><Header as='h2'>List of appointments</Header></Segment>
          <Segment style={{maxHeight: this.state.bodyMaxHeight, overflowY: 'auto'}}>
            <BookedDay>
              <TimeSlot />
              <TimeSlot />
              <TimeSlot />
            </BookedDay>
            <BookedDay>
              <TimeSlot />
              <TimeSlot />
            </BookedDay>
          </Segment>
          <Segment id='footer-segment'>
            <Form>
              <Form.Button icon labelPosition='left' fluid onClick={this.addNew}>
                <Icon name='plus' />Add appointment
              </Form.Button>
            </Form>
          </Segment>
        </Segment.Group>
      </div>
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

    return (
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
      </List.Item>
    );
  }
}

export default TeacherBookingList;
