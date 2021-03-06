
import React from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import ViewContainer from './ViewContainer';
import queryString from 'query-string';
import { post } from './utils/request';
import './css/ParentRegister.css';

class ParentRegister extends React.Component {

  state = {
    childSelectionList: []
  };

  data = {};
  childrenObj = {};  // Stores children as an object (later converted to an array). Useful for deleting/updating children.

  onFormChange = (e, { name, value }) => {

    this.data[name] = value;
  }

  childSelection_add = () => {

    let tempList = this.state.childSelectionList.slice();

    tempList.push(
      <ChildSelection key={Date.now()} index={Date.now()}
        deleteFunc={this.childSelection_delete}
        updateFunc={this.childSelection_update}
      />
    );

    this.setState({ childSelectionList: tempList });
  }

  childSelection_delete = (index) => {

    let tempList = this.state.childSelectionList.slice();

    tempList.forEach((child, i) => {
      if (child.props.index === index) {
        tempList.splice(i, 1);
      }
    });

    this.setState({ childSelectionList: tempList });
    delete this.childrenObj[index];
  }

  childSelection_update = (index, newVal) => {

    this.childrenObj[index] = newVal;
  }

  nextScreen = async () => {

    this.props.enableLoaderFunc();

    await new Promise(resolve => {

      // Generate data.children by converting childrenObj from an object to an array.
      
      this.data.children = [];
      for (let key in this.childrenObj) {
        if (this.childrenObj.hasOwnProperty(key)) {
          this.data.children.push(this.childrenObj[key]);
        }
      }
      resolve();
    });

    try {
      
      let registerQuery = await post('/parents/register', this.data);

      Cookies.set('parent-token', registerQuery.token);
      this.props.changeViewFunc('parent / book child');
      
    } catch (json) {

      this.props.displayModalMessageFunc(json.error);
      this.props.disableLoaderFunc();
    }
  }

  componentDidMount() {

    // Get code from URL.
    this.data['security-key'] = queryString.parse(this.props.location.search).code;
  }

  renderChildSelectionList = () => {

    if (this.state.childSelectionList.length === 0) {
      return <p className='empty'>No children added.</p>;
    }

    return this.state.childSelectionList.map(childSelection => childSelection);
  }

  render() {

    return (
      <ViewContainer loaderVisible={this.props.loaderVisible}>

        <div>Registration</div>

        <Form>
          <Form.Group widths='equal'>
            <Form.Input label="First name" placeholder='First name' name='first-name' onChange={this.onFormChange} />
            <Form.Input label="Last name" placeholder='Last name' name='last-name' onChange={this.onFormChange} />
          </Form.Group>
          <Form.Input label="Email" placeholder='Email' name='email' onChange={this.onFormChange} />
          <Form.Field>
            <label>Children</label>
            <div id='child-selection-list'>{ this.renderChildSelectionList() }</div>
          </Form.Field>
        </Form>

        <Form>
          <Form.Button icon labelPosition='left' fluid positive onClick={this.childSelection_add}>
            <Icon name='add' />Add child
          </Form.Button>
          <Form.Button icon labelPosition='right' fluid primary onClick={this.nextScreen}>
            <Icon name='arrow right' />Next
          </Form.Button>
        </Form>

      </ViewContainer>
    );
  }
}

class ChildSelection extends React.Component {

  onUpdate = (e, { value }) => {

    this.props.updateFunc(this.props.index, value);
  }

  onDelete = () => {

    this.props.deleteFunc(this.props.index);
  }

  render() {

    return (
      <div className='child-selection-container'>
        <Input placeholder="Child's full name" onChange={this.onUpdate} />
        <Button icon basic negative onClick={this.onDelete}>
          <Icon name='delete' />
        </Button>
      </div>
    );
  }
}

export default ParentRegister;
