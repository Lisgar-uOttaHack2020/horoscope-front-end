
import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

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
      <>
        <Form.Group widths='equal' style={{width: 320}}>
          <Form.Field>
            <label>{ this.props.label }</label>
            <Dropdown fluid search selection placeholder='Hrs' options={hourOptions} />
          </Form.Field>
          <Form.Field>
            <label style={{opacity: 0}}>PADDING</label>
            <Dropdown fluid search selection placeholder='Mins' options={minuteOptions} />
          </Form.Field>
          <Form.Field>
            <label style={{opacity: 0}}>PADDING</label>
            <Dropdown fluid search selection placeholder='AM/PM' options={[{value: 'AM', text: 'AM'},{value: 'PM', text: 'PM'}]} />
          </Form.Field>
        </Form.Group>
      </>
    );
  }
}

export default TimeInput;
