
import React from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import ViewContainer from './ViewContainer';
import queryString from 'query-string';
import { post } from './utils/request';
import './css/TeacherLogin.css';

class TeacherLogin extends React.Component {

  state = {

  };

  data = {};

  onFormChange = (e, { name, value }) => {

    this.data[name] = value;
  }

  render() {

    return (
      <ViewContainer>

        <div>Teacher Login</div>

        <Form>
          <Form.Input label="Email" placeholder='Email' name='email' onChange={this.onFormChange} />
          <Form.Input type="password" label="Password" placeholder='Password' name='password' onChange={this.onFormChange} />
        </Form>

        <div id="footer">
          <Button primary onClick={() => {this.props.changeViewFunc('teacher / booking list')}}>Login</Button>
          <a onClick={() => {this.props.changeViewFunc('teacher / register')}}>New to Qonpherense/Horra/Symplosium?</a>
        </div>

      </ViewContainer>
    );
  }
}
export default TeacherLogin;
