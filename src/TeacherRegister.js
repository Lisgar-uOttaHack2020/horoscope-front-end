
import React from 'react';
import { Segment, Header, Form, Icon } from 'semantic-ui-react';
import queryString from 'query-string';
import './css/ParentRegister.css';

class TeacherRegister extends React.Component {

  state = {

    bodyMaxHeight: 0
  };

  // Tracks data to be sent for the register request.
  data = {};

  onFormChange = (e, { name, value }) => {

    this.data[name] = value;
  }

  nextScreen = () => {

    this.props.changeViewFunc('teacher / booking list', null);

    console.log(this.data);
  }

  componentDidMount() {

    this.setState({
      bodyMaxHeight:
        'calc(100vh - 218px - ' /* 218px = height of footer + height of padding */
          + document.querySelector('#header-segment').clientHeight + 'px - '
          + document.querySelector('#footer-segment').clientHeight + 'px)'
    });

    // Get code from URL.
    this.data.code = queryString.parse(this.props.location.search).code;
  }

  render() {

    return (
      <div className='view-container'>
        <Segment.Group>
          <Segment id='header-segment'><Header as='h2'>Registration</Header></Segment>
          <Segment style={{maxHeight: this.state.bodyMaxHeight, overflowY: 'auto'}}>
            <Form>
              <Form.Input label='First name' placeholder='First name' name='first-name' onChange={this.onFormChange} />
              <Form.Input label='Last name' placeholder='Last name' name='last-name' onChange={this.onFormChange} />
              <Form.Input label='Email' placeholder='Email' name='email' onChange={this.onFormChange} />
              <Form.Input label='Password' placeholder='Password' name='password' type='password' onChange={this.onFormChange} />
              <Form.Input label='Confirm password' placeholder='Password' name='confirm-password' type='password' />
            </Form>
          </Segment>
          <Segment id='footer-segment'>
            <Form>
              <Form.Button icon labelPosition='right' fluid primary onClick={this.nextScreen}>
                <Icon name='arrow right' />Next
              </Form.Button>
            </Form>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default TeacherRegister;
