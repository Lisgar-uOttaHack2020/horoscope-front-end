
import React from 'react';

import { Segment, Header, Form, Button, Input, Icon } from 'semantic-ui-react';

import './css/ParentRegister.css';

const request = require('./utils/request');

class TeacherRegister extends React.Component {

  state = {
    childList: []  // A list of all of the child view objects.
  };

  // Tracks data to be sent for the register request.
  data = {
    'first-name': null,
    'last-name': null,
    'email': null,
    'password': null,
    'confirm-password': null, // necessary?
    'teacher-code': null
  };

  nextScreen = () => {
    this.props.changeViewFunc('teacherBookingList', null);
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h2'>Teacher Registration</Header></Segment>
          <Segment>
            <Form>
              <Form.Field>
                <label>First name</label>
                <Input placeholder='First name' name='first-name' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Last name</label>
                <Input placeholder='Last name' name='last-name' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input placeholder='Email' name='email' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input placeholder='Password' name='password' type="password" onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <Input placeholder='Confirm Password' name='confirm-password' type="password" onChange={this.onFormChange} />
              </Form.Field>
            </Form>
          </Segment>
          <Segment>
            <Button icon labelPosition='right' fluid primary onClick={this.nextScreen}>
              <Icon name='arrow right' />
              Next
            </Button>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

class ChildSelection extends React.Component {

  onUpdate = (e, {name, value}) => {

    this.props.updateFunc(this.props.index, value);
  }

  render() {

    return (
      <div className='child-selection' style={{display: 'flex'}}>
        <Input placeholder="Child's full name" onChange={this.onUpdate} />

        <Button icon onClick={() => this.props.deleteFunc(this.props.index)}>
          <Icon name='minus' />
        </Button>
      </div>
    );
  }
}

export default TeacherRegister;
