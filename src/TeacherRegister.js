
import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import ViewContainer from './ViewContainer';
import { post } from './utils/request';
import queryString from 'query-string';
import './css/ParentRegister.css';

class TeacherControlPanel extends React.Component {

  // Tracks data to be sent for the register request.
  data = {};
  confirmPasswordField = null;

  onFormChange = (e, { name, value }) => {

    this.data[name] = value;
  }

  nextScreen = async () => {

    this.props.enableLoaderFunc();

    if (this.data.password === this.confirmPasswordField) {

      try {
        
        let registerQuery = await post('/teachers/register', this.data);

        Cookies.set('teacher-token', registerQuery.token);
        this.props.changeViewFunc('teacher / booking list');
        
      } catch (json) {
        
        this.props.displayModalMessageFunc(json.error);
        this.props.disableLoaderFunc();
      }
    }
    else {
      this.props.displayModalMessageFunc('Password and confirm password fields do not match.');
      this.props.disableLoaderFunc();
    }
  }

  componentDidMount() {

    // Get code from URL.
    this.data['security-key'] = queryString.parse(this.props.location.search).code;
  }

  render() {

    return (
      <ViewContainer loaderVisible={this.props.loaderVisible}>

        <div>Registration (teacher)</div>

        <Form>
          <Form.Group widths='equal'>
            <Form.Input label="First name" placeholder='First name' name='first-name'
              onChange={this.onFormChange}
            />
            <Form.Input label="Last name" placeholder='Last name' name='last-name'
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Input label='Email' placeholder='Email' name='email'
            onChange={this.onFormChange}
          />
          <Form.Input label='Password' placeholder='Password' name='password' type='password'
            onChange={this.onFormChange}
          />
          <Form.Input label='Confirm password' placeholder='Password' name='confirm-password' type='password'
            onChange={(e, { value }) => (this.confirmPasswordField = value)}
          />
          <div style={{textAlign: 'center'}}>
            <button className='link-button' onClick={() => {this.props.changeViewFunc('teacher / login')}}>
              Already have an account?
            </button>
          </div>
        </Form>

        <Form>
          <Form.Button icon labelPosition='right' fluid primary onClick={this.nextScreen}>
            <Icon name='arrow right' />Next
          </Form.Button>
        </Form>

      </ViewContainer>
    );
  }
}

export default TeacherControlPanel;
