
import React from 'react';

import { Segment, Header, Form, Button, Input, Icon } from 'semantic-ui-react';

import './ViewCustomerRegister.css';

const fetch = require('node-fetch');

class ViewCustomerRegister extends React.Component {

  state = {
    childList: []  // A list of all of the child view objects.
  };

  // Tracks data to be sent for the register request.
  data = {
    'name': null,
    'email': null,
    'tempChildren': {},'children': []
  };

  generateDataChildren = () => {

    // create data.children from data.tempChildren (object to array)
    this.data.children = [];
    for (let key in this.data.tempChildren) {
      if (this.data.tempChildren.hasOwnProperty(key)) {
        this.data.children.push(this.data.tempChildren[key]);
      }
    }
  }

  // Runs when the name or email is changed. Does NOT run when the child views are changed.
  onFormChange = (e, {name, value}) => {

    this.data[name] = value;
  }

  addChild = () => {

    let tempChildList = this.state.childList.slice();
    tempChildList.push(
      <ViewChild
        key={Date.now()}
        index={Date.now()}
        deleteFunc={this.deleteChild}
        updateValueFunc={this.updateChildValue}
      />
    );

    this.setState({
      childList: tempChildList
    });
  }

  deleteChild = (index) => {

    let tempChildList = this.state.childList.slice();

    tempChildList.forEach((child, i) => {
      if (child.props.index === index) {
        tempChildList.splice(i, 1);
      }
    });

    this.setState({
      childList: tempChildList
    });

    delete this.data.tempChildren['id_' + index];  // Data must be deleted.
    this.generateDataChildren();
  }

  // Runs when the [index] child value changes.
  updateChildValue = (index, newVal) => {

    this.data.tempChildren['id_' + index] = newVal;
    this.generateDataChildren();
  }

  sendData = () => {

    const body = {
      'name': this.data.name,
      'email': this.data.email,
      'children': this.data.children
    };
 
    fetch('/customers', {
      method: 'post',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
      this.props.changeViewFunc('childChooseDateAndTime', json);
    });
    
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h1'>Customer Registration</Header></Segment>
          <Segment>
            <Form>
              <Form.Field>
                <label>Full Name</label>
                <Input placeholder='Full Name' name='name' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input placeholder='Email' name='email' onChange={this.onFormChange} />
              </Form.Field>
              <Form.Field>
                <label>Patients </label>
                <div id='customer-register-child-list'>
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
                  Add Patient
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
        <div style={{backgroundColor: '#202020', color: '#ffffff', fontFamily: 'monospace'}} id="res-dump"></div>
      </div>
    );
  }
}

class ViewChild extends React.Component {

  onUpdate = (e, {name, value}) => {

    this.props.updateValueFunc(this.props.index, value);
  }

  render() {

    return (
      <div className='customer-register-child-list-element' style={{display: 'flex'}}>
        <Input placeholder="Patient's full name" onChange={this.onUpdate} />

        <Button icon onClick={() => this.props.deleteFunc(this.props.index)}>
          <Icon name='minus' />
        </Button>
      </div>
    );
  }
}

export default ViewCustomerRegister;
