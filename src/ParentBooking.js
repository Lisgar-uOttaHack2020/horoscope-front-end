
import React from 'react';

import { Segment, Header, Form, Icon, Button, Dropdown, TextArea } from 'semantic-ui-react';

import './ParentBooking.css';

const fetch = require('node-fetch');

class ParentBooking extends React.Component {

  customerId = null;
  childList = null;
  childIndex = null;
  teacherData = null;

  state = {
    childName: null,
    selectTeacherList: []
  };

  data = {};

  selectTeacherSelectTime = (index, val) => {

    this.data[index].time = val;
  }

  selectTeacherSelectDate = (index, val) => {

    this.data[index].date = val;
  }

  selectTeacherSelectTeacher = (index, val) => {

    this.data[index].teacherId = val;
  }

  addSelectTeacher = () => {

    let index = Date.now();

    let tempSelectTeacherList = this.state.selectTeacherList.slice();

    tempSelectTeacherList.push(
      <ViewSelectConsultant
        key={index}
        index={index}
        teacherData={this.teacherData}
        deleteFunc={this.deleteSelectTeacher}
        selectDateFunc={this.selectTeacherSelectDate}
        selectTimeFunc={this.selectTeacherSelectTime}
        selectTeacherFunc={this.selectTeacherSelectTeacher}
      />
    );

    this.setState({
      selectTeacherList: tempSelectTeacherList
    });

    this.data[index] = {
      "customerId": this.customerId,
      "teacherId": null,
      "child": this.state.childName,
      "date": null,
      "time": {
        "start": null,
        "end": null
      }
    }
  }

  deleteSelectTeacher = (index) => {
    
    let tempSelectTeacherList = this.state.selectTeacherList.slice();

    tempSelectTeacherList.forEach((selectTeacher, i) => {
      if (selectTeacher.props.index === index) {
        tempSelectTeacherList.splice(i, 1);
      }
    });

    this.setState({
      selectTeacherList: tempSelectTeacherList
    });

    delete this.data[index];
  }

  sendData = () => {

    // Create booking

    if (this.childIndex >= this.childList.length - 1) {

      this.props.changeViewFunc('endPage', null);
    }
    else {

      this.childIndex++;
      this.setState({
        childName: this.childList[this.childIndex],
        selectTeacherList: []
      });
    }
  }

  componentDidMount() {

    this.customerId = this.props.params[0];
    this.childList = this.props.params[1];
    this.childIndex = this.props.params[2];

    this.setState({
      childName: this.childList[this.childIndex]
    });
 
    fetch('/consultants', {
      method: 'get'
    })
    .then(res => res.json())
    .then(json => {

      this.teacherData = json;
    });

  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h2'>Appointment booking: {this.state.childName}</Header></Segment>
          <Segment>
            <Form>
              <Form.Field>
                {
                  this.state.selectTeacherList.map((selectTeacher) => {
                    return selectTeacher;
                  })
                }
              </Form.Field>
              <Form.Field>
                <Button icon labelPosition='left' fluid onClick={() => this.addSelectTeacher()}>
                  <Icon name='plus' />
                  Add appointment
                </Button>
              </Form.Field>
            </Form>
          </Segment>
          <Segment>
            <Button icon labelPosition='right' fluid onClick={this.sendData} primary>
              <Icon name='arrow right' />
              Next
            </Button>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

class ViewSelectConsultant extends React.Component {

  constructor(props) {

    super(props);

    this.dateDropdownRef = React.createRef();
    this.timeDropdownRef = React.createRef();
  }

  state = {
    selectedTeacher: null,
    selectedDate: null,
    selectedTime: null,

    teacherOptions: [],
    teacherList: {},
  };

  numberToDisplayTime = (num) => {
    
    let hours = Math.floor(num / 60);
    let mins = num % 60;
    let PM = true;
    
    if (hours < 12) {
      PM = false;
    }
    if (hours > 12) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    if (mins < 10) {
      mins = '0' + mins;
    }

    return hours + ':' + mins + (PM ? ' PM' : ' AM');
  }

  getDateOptions = (teacherId) => {

    if (!teacherId) {
      return [];
    }

    return this.state.teacherList[teacherId].dates;
  }

  getTimeOptions = (teacherId, date) => {

    if (!teacherId || !date) {
      return [];
    }

    let timeline = this.state.teacherList[teacherId].times[date];
    let arr = [];

    timeline.forEach((element, i) => {
      
      if (i % 2 === 0 && i < timeline.length - 1) {

        // a block of available times.

        let interval = this.state.teacherList[teacherId].timeInt;

        for (let j = element; j + interval <= timeline[i + 1]; j += interval) {

          let startTime = j, endTime = j + interval;
          let text = this.numberToDisplayTime(startTime) + ' to ' + this.numberToDisplayTime(endTime);
          arr.push(
            { key: i + '_' + j, text: text, value: { start: startTime, end: endTime } }
          );
        }
      }
    });

    return arr;
  }

  onTeacherChange = (e, { value }) => {

    this.setState({
      selectedTeacher: value,
      selectedDate: null,
      selectedTime: null
    });

    this.dateDropdownRef.current.setState({
      value: null
    });
    this.timeDropdownRef.current.setState({
      value: null
    });

    this.props.selectTeacherFunc(this.props.index, value);
    this.props.selectDateFunc(this.props.index, null);
    this.props.selectTimeFunc(this.props.index, null);
  }

  onDateChange = (e, { value }) => {

    this.setState({
      selectedDate: value,
      selectedTime: null
    });

    this.timeDropdownRef.current.setState({
      value: null
    });

    this.props.selectDateFunc(this.props.index, value);
    this.props.selectTimeFunc(this.props.index, null);
  }

  onTimeChange = (e, { value }) => {

    this.setState({
      selectedTime: value
    });

    this.props.selectTimeFunc(this.props.index, value);
  }

  componentDidMount() {

    this.props.teacherData.forEach((teacher, i) => {

      let tempTeacherOptions = this.state.teacherOptions;
      let tempTeacherList = this.state.teacherList;

      tempTeacherOptions.push({
        key: Date.now() + '_' + i, value: teacher._id, text: teacher.name
      });

      // Convert dates (from keys) to array.
      let availableDatesArr = [];
      for (let key in teacher.availability.dates) {
        if (teacher.availability.dates.hasOwnProperty(key)) {
          availableDatesArr.push({
            key: key, value: key, text: key
          });
        }
      }
      
      tempTeacherList[teacher._id] = {
        dates: availableDatesArr,
        times: teacher.availability.dates,
        timeInt: parseInt(teacher.timeInt)
      }

      this.setState({
        teacherOptions: tempTeacherOptions,
        teacherList: tempTeacherList
      });
    });
  }

  render() {

    return (
      <Form.Field className='select-teacher-container'>
        <label>Appointment</label>
        <Dropdown
          placeholder='Select a teacher'
          fluid
          search
          onChange={this.onTeacherChange}
          selection
          options={this.state.teacherOptions}
        />
        <Dropdown
          ref={this.dateDropdownRef}
          placeholder='Select date'
          fluid
          onChange={this.onDateChange}
          selection
          options={this.getDateOptions(this.state.selectedTeacher)}
          disabled={!this.state.selectedTeacher}
        />
        <Dropdown
          ref={this.timeDropdownRef}
          placeholder='Select time'
          fluid
          onChange={this.onTimeChange}
          selection
          options={this.getTimeOptions(this.state.selectedTeacher, this.state.selectedDate)}
          disabled={!this.state.selectedDate}
        />
        <TextArea placeholder='Comments' fluid style={{marginBottom: 8}} />
        <Button icon fluid labelPosition='left' onClick={() => this.props.deleteFunc(this.props.index)}>
          <Icon name='minus' />
          Remove appointment
        </Button>
      </Form.Field>
    );
  }
}

export default ParentBooking;
