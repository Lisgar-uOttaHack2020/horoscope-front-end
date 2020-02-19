
import React from 'react';

import { Segment, Header, Form, Icon, Button, Dropdown, TextArea } from 'semantic-ui-react';

import './ParentBooking.css';

const funcs = require('./funcs');
const fetch = require('node-fetch');

class ParentBooking extends React.Component {

  parentId = null;
  childList = null;
  childIndex = null;
  teacherData = null;

  state = {
    childName: null,
    selectTeacherList: []
  };

  data = {};

  bookTeacher_add = () => {

    let index = Date.now();
    let tempList = this.state.selectTeacherList.slice();

    tempList.push(
      <BookTeacher
        key={index}
        index={index}
        teacherData={this.teacherData}
        deleteFunc={this.bookTeacher_delete}
        setAttributesFunc={this.bookTeacher_setAttributes}
      />
    );

    this.setState({
      selectTeacherList: tempList
    });

    this.data[index] = {
      'child-name': this.state.childName,
      'parent-id': this.parentId,
      'teacher-id': null,
      'date': null,
      'time': { 'start': null, 'end': null },
      'comments': ''
    }
  }

  bookTeacher_delete = (index) => {
    
    let tempList = this.state.selectTeacherList.slice();

    tempList.forEach((selectTeacher, i) => {
      if (selectTeacher.props.index === index) {
        tempList.splice(i, 1);
      }
    });

    this.setState({
      selectTeacherList: tempList
    });

    delete this.data[index];
  }

  bookTeacher_setAttributes = (index, attrs) => {

    for (let key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        this.data[index][key] = attrs[key];
      }
    }
  }

  sendData = () => {

    if (this.childIndex >= this.childList.length - 1) {

      console.log(this.data);
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

    this.parentId = this.props.params[0];
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
                <Button icon labelPosition='left' fluid onClick={() => this.bookTeacher_add()}>
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

class BookTeacher extends React.Component {

  constructor(props) {

    super(props);

    this.dateDropdownRef = React.createRef();
    this.timeDropdownRef = React.createRef();
  }

  state = {
    selectedTeacher: null,
    selectedDate: null,
    teacherOptions: [],
    teacherList: {},
  };

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
          let text = funcs.numberToDisplayTime(startTime) + ' to ' + funcs.numberToDisplayTime(endTime);
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
    });

    this.dateDropdownRef.current.setState({
      value: null
    });
    this.timeDropdownRef.current.setState({
      value: null
    });

    this.props.setAttributesFunc(this.props.index, {
      'teacher-id': value,
      'date': null,
      'time': null
    });
  }

  onDateChange = (e, { value }) => {

    this.setState({
      selectedDate: value,
    });

    this.timeDropdownRef.current.setState({
      value: null
    });

    this.props.setAttributesFunc(this.props.index, {
      'date': value,
      'time': null
    });
  }

  onTimeChange = (e, { value }) => {

    this.props.setAttributesFunc(this.props.index, {
      'time': value
    });
  }

  onCommentChange = (e, { value }) => {

    this.props.setAttributesFunc(this.props.index, {
      'comments': value
    });
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
      <Form.Field className='book-teacher-container'>
        <label>Appointment</label>
        <Dropdown
          placeholder='Select a teacher' fluid search selection
          onChange={this.onTeacherChange}
          options={this.state.teacherOptions}
        />
        <Dropdown
          placeholder='Select date' fluid selection
          ref={this.dateDropdownRef}
          onChange={this.onDateChange}
          options={this.getDateOptions(this.state.selectedTeacher)}
          disabled={!this.state.selectedTeacher}
        />
        <Dropdown placeholder='Select time' fluid selection
          ref={this.timeDropdownRef}
          onChange={this.onTimeChange}
          options={this.getTimeOptions(this.state.selectedTeacher, this.state.selectedDate)}
          disabled={!this.state.selectedDate}
        />
        <TextArea
          placeholder='Comments' fluid
          style={{marginBottom: 8}}
          onChange={this.onCommentChange}
        />
        <Button icon fluid labelPosition='left' onClick={() => this.props.deleteFunc(this.props.index)}>
          <Icon name='minus' />
          Remove appointment
        </Button>
      </Form.Field>
    );
  }
}

export default ParentBooking;
