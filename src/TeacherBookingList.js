
import React from 'react';

import { Segment, Header, Form, Button } from 'semantic-ui-react';

import './css/TeacherBookingList.css';

const funcs = require('./utils/funcs');
const request = require('./utils/request');

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

  constructor(props) {

    super(props);
  }

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

  constructor(props) {

    super(props);
  }

  state = {
      startTime: "[Start Time]",
      endTime: "[End Time]",
      room: "[Room]"
  };

  render() {

    return (
      <div className='booking-time-slot'>
        <label>{this.state.startTime} - {this.state.endTime}</label><br />
        <label>Room: {this.state.room}</label>
        <div class="time-slot-options">
            <a href="#edit">Edit</a>
            <a href="#delete">Delete</a>
        </div>
      </div>
    );
  }
}

export default TeacherBookingList;
