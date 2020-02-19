
import React from 'react';

import { Segment, Header, Form, Button, Input, Icon } from 'semantic-ui-react';

import './css/ParentRegister.css';

const request = require('./utils/request');

class ParentRegister extends React.Component {

  state = {
    childList: []  // A list of all of the child view objects.
  };

  // Tracks data to be sent for the register request.
  data = {
    'name': null,
    'email': null,
    'tempChildren': {},'children': []
  };

  // Runs when the name or email is changed. Does NOT run when the child views are changed.
  onFormChange = (e, {name, value}) => {

    this.data[name] = value;
  }

  addChild = () => {

    let tempList = this.state.childList.slice();
    tempList.push(
      <ChildSelection key={Date.now()} index={Date.now()}
        deleteFunc={this.deleteChild}
        updateFunc={this.updateChild}
      />
    );

    this.setState({
      childList: tempList
    });
  }

  deleteChild = (index) => {

    let tempList = this.state.childList.slice();

    tempList.forEach((child, i) => {
      if (child.props.index === index) {
        tempList.splice(i, 1);
      }
    });

    this.setState({
      childList: tempList
    });

    delete this.data.tempChildren[index];  // Data must be deleted.
  }

  // Runs when the [index] child value changes.
  updateChild = (index, newVal) => {

    this.data.tempChildren[index] = newVal;
  }

  sendData = () => {

    // generate data.children
    this.data.children = [];
    for (let key in this.data.tempChildren) {
      if (this.data.tempChildren.hasOwnProperty(key)) {
        this.data.children.push(this.data.tempChildren[key]);
      }
    }

    const body = {
      'name': this.data.name,
      'email': this.data.email,
      'children': this.data.children
    };

    request.send('/customers', {
      method: 'post',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    },
    (json) => {
      this.props.changeViewFunc('parentBooking', [
        json.id, this.data.children, 0
      ]);
    },
    (json) => {
      this.props.displayModalMessageFunc(json.error);
    });
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h2'>Registration</Header></Segment>
          <Segment>
            <Form>
              <Form.Field>
                <label>Full name</label>
                <Input placeholder='Full name' name='name' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input placeholder='Email' name='email' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Children</label>
                <div id='child-selection-list'>
                  {
                    this.state.childList.map((child) => {
                      return child;
                    })
                  }
                </div>
              </Form.Field>
              <Form.Field>
                <Button icon labelPosition='left' fluid onClick={this.addChild}>
                  <Icon name='plus' />
                  Add child
                </Button>
              </Form.Field>
            </Form>
          </Segment>
          <Segment>
            <Button icon labelPosition='right' fluid primary onClick={this.sendData}>
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

export default ParentRegister;
