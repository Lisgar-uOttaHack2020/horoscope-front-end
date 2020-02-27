
import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { range } from './utils/funcs';
import './css/DateTimeInput.css';

class TimeInput extends React.Component {

  state = {
    hour: null,
    minute: null,
    amPm: null,
    hourOptions: null,
    minuteOptions: null,
    amPmOptions: null
  }

  formatInput = () => {

    if (this.state.hour === null || this.state.minute === null || this.state.amPm === null) {
      return {
        name: this.props.name,
        value: null
      };
    }

    let amPmOffset = (this.state.amPm === 'PM' ? 12 * 60 : 0);

    return {
      name: this.props.name,
      value: this.state.hour * 60 + this.state.minute + amPmOffset
    };
  }

  onChange = () => {

    this.props.onChange("I don't know what 'e' is...", this.formatInput());
  }

  formChange = (e, { name, value }) => {

    this.setState({
      [name]: value
    }, () => { this.onChange() });
  }

  componentDidMount() {

    this.setState({
      hourOptions:   range(1, 12).map(i => ({ key: Date.now() + '_' + i, value: i, text: i })),
      minuteOptions: range(0, 59).map(i => ({ key: Date.now() + '_' + i, value: i, text: (i < 10 ? '0' + i : i) })),
      amPmOptions:   [ { key: 'AM', value: 'AM', text: 'AM' }, { key: 'PM', value: 'PM', text: 'PM' } ]
    });
  }

  render() {

    return (
      <Form.Field className='time-input'>
        <label>{this.props.label}</label>
        <div>
          <Dropdown fluid search selection name='hour' placeholder='Hour'
            options={this.state.hourOptions}
            onChange={this.formChange}
          />
          <span className='spacer'>:</span>
          <Dropdown fluid search selection name='minute' placeholder='Minute'
            options={this.state.minuteOptions}
            onChange={this.formChange}
          />
          <span className='spacer'></span>
          <Dropdown fluid search selection name='amPm' placeholder='AM/PM'
            options={this.state.amPmOptions}
            onChange={this.formChange}
          />
        </div>
      </Form.Field>
    );
  }
}

export default TimeInput;
