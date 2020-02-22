
import React from 'react';
import { Segment, Header, Form, Icon, Button, Dropdown, TextArea } from 'semantic-ui-react';
import { uniqueArray, getFullName, numberToDisplayTime } from './utils/funcs';
import './css/ParentBookChild.css';

class ParentBookChild extends React.Component {

  teachersData = [
    {
      '_id': 'ta',
      'first-name': 'Nour',
      'last-name': 'Harriz',
      'email': 'nour.harriz@ocdsb.ca',
      'bookings': [ 'a', 'b', 'c' ]
    },
    {
      '_id': 'tb',
      'first-name': 'Jeremy',
      'last-name': 'Cheeseman',
      'email': 'jeremy.cheeseman@ocdsb.ca',
      'bookings': [ 'a', 'b', 'c' ]
    },
  ];

  bookingsData = [
    {
      '_id': 'bd',
      'parent-id': 'pa',
      'teacher-id': 'ta',
      'room': '109',
      'date': 'March 26th',
      'time': { 'start': 700, 'end': 720 }
    },
    {
      '_id': 'ba',
      'parent-id': null,
      'teacher-id': 'ta',
      'room': '109',
      'date': 'March 26th',
      'time': { 'start': 720, 'end': 740 }
    },
    {
      '_id': 'bb',
      'parent-id': null,
      'teacher-id': 'ta',
      'room': '109',
      'date': 'March 26th',
      'time': { 'start': 740, 'end': 760 }
    },
    {
      '_id': 'bc',
      'parent-id': null,
      'teacher-id': 'ta',
      'room': '110',
      'date': 'March 27th',
      'time': { 'start': 660, 'end': 680 }
    },
  ];

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h2'>Book appointments for: XYZ</Header></Segment>
          <Segment>
            <Form>
              <AppointmentSelection teachersData={this.teachersData} bookingsData={this.bookingsData} />
            </Form>
          </Segment>
          <Segment>
            <Form>
              <Form.Button icon labelPosition='right' fluid primary>
                <Icon name='arrow right' />Next
              </Form.Button>
            </Form>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

class AppointmentSelection extends React.Component {

  constructor(props) {

    super(props);

    this.dateDropdownRef = React.createRef();
    this.timeDropdownRef = React.createRef();
  }

  state = {
    selectedTeacher: null,
    selectedDate: null,
    selectedTime: null,
    teacherOptions: null,
    dateOptions: null,
    timeOptions: null
  };

  selectTeacher = (e, { name, value }) => {

    // Filter only available bookings for the specified teacher.
    let filterFunc = (booking) => (!booking['parent-id'] && booking['teacher-id'] === value);

    // Filter and format bookingsData to be compatible with the "options" attribute of a dropdown.
    let dateOptions = uniqueArray(               
      this.props.bookingsData
        .filter(booking => filterFunc(booking))
        .map((booking) => booking.date)
    ).map((date, i) => ({ key: Date.now() + '_' + i, text: date, value: date }));
    
    // Clear date and time fields.
    this.dateDropdownRef.current.setState({
      value: null
    });
    this.timeDropdownRef.current.setState({
      value: null
    });

    this.setState({
      selectedTeacher: value,
      selectedDate: null,        // Clear date value.
      selectTime: null,          // Clear time value.
      dateOptions: dateOptions,
    });
  }

  selectDate = (e, { name, value }) => {

    // Filter only available bookings for the specified teacher on the specified date.
    let filterFunc = (booking) => (
      !booking['parent-id'] && booking['teacher-id'] === this.state.selectedTeacher && booking.date === value
    );
    
    // Filter and format bookingsData to be compatible with the "options" attribute of a dropdown.
    let timeOptions = uniqueArray(
      this.props.bookingsData
        .filter(booking => filterFunc(booking))
        .map((booking) => (numberToDisplayTime(booking.time.start) + ' to ' + numberToDisplayTime(booking.time.end)))
    ).map((time, i) => ({ key: Date.now() + '_' + i, text: time, value: time }));
    
    // Clear time field.
    this.timeDropdownRef.current.setState({
      value: null
    });
    
    this.setState({
      selectedDate: value,
      selectTime: null,         // Clear time value.
      timeOptions: timeOptions
    });
  }

  selectTime = (e, { name, value }) => {

    this.setState({
      selectedDate: value
    });
  }

  componentDidMount() {

    let teacherOptions = this.props.teachersData
      .map((teacher, i) => ({ key: Date.now() + '_' + i, text: getFullName(teacher), value: teacher._id }));

    this.setState({
      teacherOptions: teacherOptions
    });
  }

  render() {

    return (
      <Form.Field className='appointment-selection-container'>
        <label>Appointment</label>
        <Dropdown
          placeholder='Select a teacher' fluid search selection
          options={this.state.teacherOptions}
          onChange={this.selectTeacher}
        />
        <Dropdown
          placeholder='Select date' fluid search selection
          ref={this.dateDropdownRef}
          options={this.state.dateOptions}
          onChange={this.selectDate}
          disabled={!this.state.selectedTeacher}
        />
        <Dropdown
          placeholder='Select time' fluid search selection
          ref={this.timeDropdownRef}
          options={this.state.timeOptions}
          onChange={this.selectTime}
          disabled={!this.state.selectedDate}
        />
        <TextArea
          placeholder='Comments'
        />
        <Button icon fluid labelPosition='left'>
          <Icon name='minus' />Remove appointment
        </Button>
      </Form.Field>
    );
  }
}

export default ParentBookChild;
