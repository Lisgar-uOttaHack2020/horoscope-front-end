import React from 'react';

import ViewCustomerRegister from './ViewCustomerRegister';
import ViewChildChooseDateAndTime from './ViewChildChooseDateAndTime';
import LandingPage from './LandingPage';
import EndPage from './EndPage';

import './App.css';

class App extends React.Component {

  state = {
    view: 'landingPage',
    paramsToPass: null
  };

  changeView = (newView, newParams) => {

    this.setState({
      view: newView,
      paramsToPass: newParams
    });
  }

  render() {

    if (this.state.view === 'landingPage') {
      return <LandingPage changeViewFunc={this.changeView} params={this.state.paramsToPass} />;
    }

    else if (this.state.view === 'customerRegister') {
      return <ViewCustomerRegister changeViewFunc={this.changeView} params={this.state.paramsToPass} />;
    }

    else if (this.state.view === 'childChooseDateAndTime') {
      return <ViewChildChooseDateAndTime changeViewFunc={this.changeView} params={this.state.paramsToPass} />;
    }

    else if (this.state.view === 'endPage') {
      return <EndPage changeViewFunc={this.changeView} params={this.state.paramsToPass} />;
    }

    return <div>:(</div>
  }
}

export default App;
