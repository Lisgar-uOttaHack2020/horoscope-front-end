import React from 'react';

import ViewCustomerRegister from './ViewCustomerRegister';
import ViewChildChooseDateAndTime from './ViewChildChooseDateAndTime';

import './App.css';

class App extends React.Component {

  state = {
    view: 'customerRegister',
    paramsToPass: null
  };

  changeView = (newView, newParams) => {

    this.setState({
      view: newView,
      paramsToPass: newParams
    });
  }

  render() {

    if (this.state.view === 'customerRegister') {
      return <ViewCustomerRegister changeViewFunc={this.changeView} params={this.state.paramsToPass} />;
    }

    else if (this.state.view === 'childChooseDateAndTime') {
      return <ViewChildChooseDateAndTime changeViewFunc={this.changeView} params={this.state.paramsToPass} />;
    }

    return <div>:(</div>
  }
}

export default App;
