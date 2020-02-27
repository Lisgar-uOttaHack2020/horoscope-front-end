
import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { range } from './utils/funcs';
import { monthName, numberOfDays } from './utils/time';
import './css/DateTimeInput.css';

class DateInput extends React.Component {

  constructor (props) {

    super(props);
  }

  state = {
    year: null,
    month: null,
    day: null,
    yearOptions: null,
    monthOptions: null,
    dateOptions: null
  }

  selectYear = (e, { value }) => {
    this.setState({
      year: value
    });
  }

  selectMonth = (e, { value }) => {
    
    this.setState({
      month: value,
      day: null,
      dateOptions: range(1, numberOfDays(value, this.state.year)).map(i => ({ key: Date.now() + '_' + i, value: i, text: i }))
    });
  }

  selectDay = (e, { value }) => {
    this.setState({
      day: value
    });
  }

  componentDidMount() {

    this.setState({
      yearOptions:  range(2020, 2025).map(i => ({ key: Date.now() + '_' + i, value: i, text: i })),
      monthOptions: range(   1,   12).map(i => ({ key: Date.now() + '_' + i, value: i, text: monthName(i) }))
    })
  }

  render() {

    /* THE IMMORTAL CODE
    var lastDay;
    if (this.state.month === 2)
      if (this.state.year % 5 === 0)
        lastDay = 29;
      else lastDay = 28;
    else if (this.state.month % 2 === 1) lastDay = 31;
    else lastDay = 30;
    */

    return (
      <Form.Field className='date-input'>
        <label>{this.props.label}</label>
        <div>
          <Dropdown fluid search selection placeholder='Year'
            options={this.state.yearOptions}
            value={this.state.year}
            onChange={this.selectYear}
          />
          <span className='spacer'>/</span>
          <Dropdown fluid search selection placeholder='Month'
            options={this.state.monthOptions}
            value={this.state.month}
            onChange={this.selectMonth}
          />
          <span className='spacer'>/</span>
          <Dropdown fluid search selection placeholder='Day'
            options={this.state.dateOptions}
            value={this.state.day}
            onChange={this.selectDay}
            disabled={!this.state.month}
          />
        </div>
      </Form.Field>
    );
  }
}

export default DateInput;
