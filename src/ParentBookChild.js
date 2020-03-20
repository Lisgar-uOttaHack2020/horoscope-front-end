
import React from 'react';
import { Form, Icon, Button, Dropdown } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import ViewContainer from './ViewContainer';
import { displayDate, displayTime } from './utils/time';
import { get, post } from './utils/request';
import './css/ParentBookChild.css';

class ParentBookChild extends React.Component {

  state = {
    childList: [],
    childIndex: 0,
    appointmentSelectionList: []
  };

  data = {};
  bookingsObj = {};

  teachersData = [];
  bookingsData = [];

  appointmentSelection_add = () => {

    let tempList = this.state.appointmentSelectionList.slice();

    tempList.push(
      <AppointmentSelection key={Date.now()} index={Date.now()}
        teachersData={this.teachersData}
        bookingsData={this.bookingsData}
        deleteFunc={this.appointmentSelection_delete}
        updateFunc={this.appointmentSelection_update}
      />
    );

    this.setState({ appointmentSelectionList: tempList });
  }

  appointmentSelection_delete = (index) => {
    
    let tempList = this.state.appointmentSelectionList.slice();

    tempList.forEach((appointmentSelection, i) => {
      if (appointmentSelection.props.index === index) {
        tempList.splice(i, 1);
      }
    });

    this.setState({ appointmentSelectionList: tempList });
    delete this.bookingsObj[index];
  }

  appointmentSelection_update = (index, newVal) => {

    this.bookingsObj[index] = newVal;
  }

  nextScreen = async () => {

    await new Promise(resolve => {

      // Generate data by converting bookingsObj from an object to an array.

      this.data.bookings = [];
      for (let key in this.bookingsObj) {
        if (this.bookingsObj.hasOwnProperty(key)) {
          this.data.bookings.push(this.bookingsObj[key]);
        }
      }
      resolve();
    });

    try {
      
      await post('/bookings/parent', this.data);

      if (this.state.childIndex + 1 < this.state.childList.length) {
        this.nextChild();
      }
      else {
        this.props.changeViewFunc('parent / end');
      }
    } catch (json) { this.props.displayModalMessageFunc(json.error) }
  }

  nextChild = () => {

    this.setState((state) => ({
      childIndex: state.childIndex + 1
    }),
      () => this.refreshAppointments()
    );
  }

  refreshAppointments = async () => {

    this.props.enableLoaderFunc();

    try {
      
      let parentsQuery  = await get('/parents',  { token: Cookies.get('parent-token') });
      let teachersQuery = await get('/teachers', {});
      let bookingsQuery = await get('/bookings', {});

      this.setState({
        childList: parentsQuery.children,
        appointmentSelectionList: []
      });
      this.data = {
        'token': Cookies.get('parent-token'),
        'child-name': parentsQuery.children[this.state.childIndex]
      };
      this.bookingsObj = {};
      this.teachersData = teachersQuery;
      this.bookingsData = bookingsQuery;

      this.props.disableLoaderFunc();
      
    } catch (json) {
      
      this.props.displayModalMessageFunc(json.error);
      this.props.disableLoaderFunc();

      // TODO: proper handling.
    }
  }

  componentDidMount() {

    this.refreshAppointments();
  }

  renderChildSelectionList = () => {

    if (this.state.appointmentSelectionList.length === 0) {
      return <p className='empty'>No appointments added.</p>;
    }

    return this.state.appointmentSelectionList.map(appointmentSelection => appointmentSelection);
  }

  render() {

    return (
      <ViewContainer loaderVisible={this.props.loaderVisible}>

        <div>Book appointments for: {this.state.childList[this.state.childIndex]}</div>

        <Form>{ this.renderChildSelectionList() }</Form>

        <Form>
          <Form.Button icon labelPosition='left' fluid positive onClick={this.appointmentSelection_add}>
            <Icon name='add' />Add appointment
          </Form.Button>
          <Form.Button icon labelPosition='right' fluid primary onClick={this.nextScreen}>
            <Icon name='arrow right' />Next
          </Form.Button>
        </Form>

      </ViewContainer>
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

  selectTeacher = (e, { value }) => {

    // Filter only available bookings for the specified teacher.
    const filterFunc = (booking) => (
      !booking['parent-id'] && booking['teacher-id'] === value
    );

    // Filter and format bookingsData to be compatible with the "options" attribute of a dropdown.
    let dateOptions = this.props.bookingsData;
        dateOptions = dateOptions.filter(booking => filterFunc(booking));
        dateOptions = dateOptions.map(booking => booking.date);
        dateOptions = [...new Set(dateOptions)];
        dateOptions = dateOptions.map((date, i) => ({ key: Date.now() + '_' + i, text: displayDate(date), value: date }));
    
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

    // Remove selected booking.
    this.props.updateFunc(this.props.index, null);
  }

  selectDate = (e, { value }) => {

    const displayTextFunc = (booking) => (
      displayTime(booking.time.start) + ' to ' + displayTime(booking.time.end) + ' > Room ' + booking.room
    );

    // Filter only available bookings for the specified teacher on the specified date.
    const filterFunc = (booking) => (
      !booking['parent-id'] && booking['teacher-id'] === this.state.selectedTeacher && booking.date === value
    );
    
    // Filter and format bookingsData to be compatible with the "options" attribute of a dropdown.
    // Times are unique after filtering.
    let timeOptions = this.props.bookingsData;
        timeOptions = timeOptions.filter(booking => filterFunc(booking));
        timeOptions = timeOptions.map(booking => ({ text: displayTextFunc(booking), value: booking._id }));
        timeOptions = timeOptions.map((time, i) => ({ key: Date.now() + '_' + i, text: time.text, value: time.value }));
    
    // Clear time field.
    this.timeDropdownRef.current.setState({
      value: null
    });
    
    this.setState({
      selectedDate: value,
      selectTime: null,         // Clear time value.
      timeOptions: timeOptions
    });

    // Remove selected booking.
    this.props.updateFunc(this.props.index, null);
  }

  selectTime = (e, { value }) => {

    this.setState({
      selectedDate: value
    });

    // Update selected booking.
    this.props.updateFunc(this.props.index, value);
  }

  onDelete = () => {

    this.props.deleteFunc(this.props.index);
  }

  componentDidMount() {

    const displayTextFunc = (teacher) => (teacher['first-name'] + ' ' + teacher['last-name']);

    let teacherOptions = this.props.teachersData
      .map((teacher, i) => ({ key: Date.now() + '_' + i, text: displayTextFunc(teacher), value: teacher._id }));

    this.setState({
      teacherOptions: teacherOptions
    });
  }

  render() {

    return (
      <Form.Field className='appointment-selection-container'>
        <label>Appointment</label>
        <Dropdown placeholder='Select a teacher' fluid search selection
          options={this.state.teacherOptions}
          onChange={this.selectTeacher}
        />
        <Dropdown placeholder='Select date' fluid search selection
          ref={this.dateDropdownRef}
          options={this.state.dateOptions}
          onChange={this.selectDate}
          disabled={!this.state.selectedTeacher}
        />
        <Dropdown placeholder='Select time' fluid search selection
          ref={this.timeDropdownRef}
          options={this.state.timeOptions}
          onChange={this.selectTime}
          disabled={!this.state.selectedDate}
        />
        <Button icon labelPosition='left' fluid basic negative onClick={this.onDelete}>
          <Icon name='delete' />Remove appointment
        </Button>
      </Form.Field>
    );
  }
}

export default ParentBookChild;
