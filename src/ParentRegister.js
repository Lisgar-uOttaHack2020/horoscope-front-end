
import React from 'react';
import { Segment, Header, Form, Button, Input, Icon } from 'semantic-ui-react';
import queryString from 'query-string';
import './css/ParentRegister.css';

class ParentRegister extends React.Component {

  state = {
    childSelectionList: []
  };

  data = {};
  tempChildren = {};  // Stores children as an object (later converted to an array). Useful for deleting/updating children.

  onFormChange = (e, { name, value }) => {

    this.data[name] = value;
  }

  addChildSelection = () => {

    let tempList = this.state.childSelectionList.slice();

    tempList.push(
      <ChildSelection key={Date.now()} index={Date.now()}
        deleteFunc={this.deleteChildSelection}
        updateFunc={this.updateChildSelection}
      />
    );

    this.setState({ childSelectionList: tempList });
  }

  deleteChildSelection = (index) => {

    let tempList = this.state.childSelectionList.slice();

    tempList.forEach((child, i) => {
      if (child.props.index === index) {
        tempList.splice(i, 1);
      }
    });

    this.setState({ childSelectionList: tempList });
    delete this.tempChildren[index];
  }

  updateChildSelection = (index, newVal) => {

    this.tempChildren[index] = newVal;
  }

  sendData = () => {

    // Generate data.children by converting tempChildren from an object to an array.
    this.data.children = [];
    for (let key in this.tempChildren) {
      if (this.tempChildren.hasOwnProperty(key)) {
        this.data.children.push(this.tempChildren[key]);
      }
    }

    // TODO: Transition into Parent / Book Child.
    console.log(this.data); // Temporary.
  }

  componentDidMount() {

    // Get security key from URL.
    this.data['security-key'] = queryString.parse(this.props.location.search)['security-key'];
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment><Header as='h2'>Registration</Header></Segment>
          <Segment>
            <Form>
              <Form.Input label="Full name" placeholder='Full name' name='name' onChange={this.onFormChange} />
              <Form.Input label="Email" placeholder='Email' name='email' onChange={this.onFormChange} />
              <Form.Field>
                <label>Children</label>
                <div id='child-selection-list'>
                  {this.state.childSelectionList.map(childSelection => childSelection)}
                </div>
              </Form.Field>
              <Form.Button icon labelPosition='left' fluid onClick={this.addChildSelection}>
                <Icon name='plus' />Add child
              </Form.Button>
            </Form>
          </Segment>
          <Segment>
            <Form>
              <Form.Button icon labelPosition='right' fluid primary onClick={this.sendData}>
                <Icon name='arrow right' />Next
              </Form.Button>
            </Form>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

class ChildSelection extends React.Component {

  onUpdate = (e, { value }) => {

    this.props.updateFunc(this.props.index, value);
  }

  render() {

    return (
      <div className='child-selection-container'>
        <Input placeholder="Child's full name" onChange={this.onUpdate} />
        <Button icon onClick={() => this.props.deleteFunc(this.props.index)}>
          <Icon name='minus' />
        </Button>
      </div>
    );
  }
}

export default ParentRegister;
