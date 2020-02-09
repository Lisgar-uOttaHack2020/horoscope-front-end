
import React from 'react';

import { Segment, Header, Form, Icon, Button, Dropdown, TextArea } from 'semantic-ui-react';

import './ViewChildChooseDateAndTime.css';

const fetch = require('node-fetch');

class ViewChildChooseDateAndTime extends React.Component {

  customerId = null;
  childList = null;
  childIndex = null;
  teacherData = null;

  state = {
    childName: null,
    selectConsultantList: []
  };

  data = {};

  selectConsultantSelectTime = (index, val) => {

    this.data[index].time = val;
  }

  selectConsultantSelectDate = (index, val) => {

    this.data[index].date = val;
  }

  selectConsultantSelectTeacher = (index, val) => {

    this.data[index].consultantId = val;
  }

  addSelectConsultant = () => {

    let index = Date.now();

    let tempSelectConsultantList = this.state.selectConsultantList.slice();

    tempSelectConsultantList.push(
      <ViewSelectConsultant
        key={index}
        index={index}
        teacherData={this.teacherData}
        deleteFunc={this.deleteSelectConsultant}
        selectDateFunc={this.selectConsultantSelectDate}
        selectTimeFunc={this.selectConsultantSelectTime}
        selectTeacherFunc={this.selectConsultantSelectTeacher}
      />
    );

    this.setState({
      selectConsultantList: tempSelectConsultantList
    });

    this.data[index] = {
      "customerId": this.customerId,
      "consultantId": null,
      "child": this.state.childName,
      "date": null,
      "time": {
        "start": null,
        "end": null
      }
    }
  }

  deleteSelectConsultant = (index) => {
    
    let tempSelectConsultantList = this.state.selectConsultantList.slice();

    tempSelectConsultantList.forEach((selectConsultant, i) => {
      if (selectConsultant.props.index === index) {
        tempSelectConsultantList.splice(i, 1);
      }
    });

    this.setState({
      selectConsultantList: tempSelectConsultantList
    });

    delete this.data[index];
  }

  sendData = () => {

    console.log(this.data);

    // Create booking

    if (this.childIndex >= this.childList.length - 1) {

      this.props.changeViewFunc('endPage', null);
    }
    else {

      this.childIndex++;
      this.setState({
        childName: this.childList[this.childIndex],
        selectConsultantList: []
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
          <Segment><Header as='h2'>Appointment Booking for {this.state.childName}</Header></Segment>
          <Segment>
            <Form>
              <Form.Field>
                {
                  this.state.selectConsultantList.map((selectConsultant) => {
                    return selectConsultant;
                  })
                }
              </Form.Field>
              <Form.Field>
                <Button icon labelPosition='left' fluid onClick={() => this.addSelectConsultant()}>
                  <Icon name='plus' />
                  Add Appointment
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
      <Form.Field className='select-consultant-container'>
        <label>Appointment</label>
        <Dropdown
          placeholder='Select a doctor'
          fluid
          search
          onChange={this.onTeacherChange}
          selection
          options={this.state.teacherOptions}
        />
        <Dropdown
          ref={this.dateDropdownRef}
          placeholder='Select Date'
          fluid
          onChange={this.onDateChange}
          selection
          options={this.getDateOptions(this.state.selectedTeacher)}
          disabled={!this.state.selectedTeacher}
        />
        <Dropdown
          ref={this.timeDropdownRef}
          placeholder='Select Time'
          fluid
          onChange={this.onTimeChange}
          selection
          options={this.getTimeOptions(this.state.selectedTeacher, this.state.selectedDate)}
          disabled={!this.state.selectedDate}
        />
        <TextArea placeholder='Comments' fluid style={{marginBottom: 8}} />
        <Button icon fluid labelPosition='left' onClick={() => this.props.deleteFunc(this.props.index)}>
          <Icon name='minus' />
          Remove Appointment
        </Button>
      </Form.Field>
    );
  }
}

export default ViewChildChooseDateAndTime;
