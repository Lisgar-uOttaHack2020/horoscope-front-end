import React from 'react';

import ViewCustomerRegister from './ViewCustomerRegister';
//import ViewChildChooseDataAndTime from './ViewChildChooseDateAndTime';

import './App.css';

class App extends React.Component {

  render() {

    return (
      <div>
        <ViewCustomerRegister />
        {/*<ViewChildChooseDataAndTime />*/}
      </div>
    );
  }
}

export default App;
