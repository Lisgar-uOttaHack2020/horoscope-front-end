import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './css/index.css';
import LandingPage from './LandingPage';
import ParentApp from './ParentApp';
import TeacherApp from './TeacherApp';

ReactDOM.render(
  <BrowserRouter>
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/parent' component={ParentApp} />
    <Route exact path='/teacher' component={TeacherApp} />
  </BrowserRouter>
, document.getElementById('root'));
