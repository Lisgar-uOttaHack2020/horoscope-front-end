
import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import './css/DateTimeInput.css';

class TimeInput extends React.Component {
  constructor (props){
    super(props);
  }

  render() {

    // options for dropdowns
    var hourOptions = [];
    var minuteOptions = [];

    // populate lists
    for (var i = 1; i <= 12; i++){
      var option = {value: i, text: i, key: Date.now() + '_' + i};
      hourOptions.push(option);
    }
    for (var i = 0; i < 60; i++){
      if (i < 10) i = '0' + i;
      var option = {value: i, text: i, key: Date.now() + '_' + i};
      minuteOptions.push(option);
    }

    return (
      <Form.Field className='time-input'>
        <label>{this.props.label}</label>
        <div>
          <Dropdown fluid search selection placeholder='Hrs' options={hourOptions} />
          <span className='spacer'>:</span>
          <Dropdown fluid search selection placeholder='Mins' options={minuteOptions} />
          <span className='spacer'></span>
          <Dropdown fluid search selection placeholder='AM/PM' options={[{value: 'AM', text: 'AM'},{value: 'PM', text: 'PM'}]} />
        </div>
      </Form.Field>
    );
  }
}

export default TimeInput;
