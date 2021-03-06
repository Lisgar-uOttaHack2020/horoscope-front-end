
import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import ViewContainer from './ViewContainer';
import { post } from './utils/request';
import './css/TeacherLogin.css';

class TeacherLogin extends React.Component {

  data = {};

  onFormChange = (e, { name, value }) => {

    this.data[name] = value;
  }

  nextScreen = async () => {

    this.props.enableLoaderFunc();

    try {
      
      let loginQuery = await post('/teachers/login', this.data);

      Cookies.set('teacher-token', loginQuery.token);
      this.props.changeViewFunc('teacher / booking list');
      
    } catch (json) {

      this.props.displayModalMessageFunc(json.error);
      this.props.disableLoaderFunc();
    }
  }

  render() {

    return (
      <ViewContainer loaderVisible={this.props.loaderVisible}>

        <div>Teacher Login</div>

        <Form>
          <Form.Input label="Email" placeholder='Email' name='email' onChange={this.onFormChange} />
          <Form.Input type="password" label="Password" placeholder='Password' name='password' onChange={this.onFormChange} />
          <div style={{textAlign: 'center'}}>
            <button className='link-button' onClick={() => {this.props.changeViewFunc('teacher / register')}}>
              New to Qonpherense/Horra/Symplosium?
            </button>
          </div>
        </Form>

        <Form>
          <Form.Button icon labelPosition='right' fluid primary onClick={this.nextScreen}>
            <Icon name='arrow right' />Login
          </Form.Button>
        </Form>

      </ViewContainer>
    );
  }
}
export default TeacherLogin;
