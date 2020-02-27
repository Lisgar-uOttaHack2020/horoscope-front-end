
import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { range } from './utils/funcs';
import { monthName, numberOfDays } from './utils/time';
import './css/DateTimeInput.css';

class DateInput extends React.Component {

  state = {
    year: null,
    month: null,
    date: null,
    yearOptions: null,
    monthOptions: null,
    dateOptions: null
  }

  formatInput = () => {

    if (this.state.year === null || this.state.month === null || this.state.date === null) {
      return {
        name: this.props.name,
        value: null
      };
    }

    let formatMonth = this.state.month < 10 ? '0' + this.state.month : this.state.month;
    let formatDate  = this.state.date  < 10 ? '0' + this.state.date  : this.state.date;

    return {
      name: this.props.name,
      value: this.state.year + '-' + formatMonth + '-' + formatDate
    };
  }

  onChange = () => {

    this.props.onChange("I don't know what 'e' is...", this.formatInput());
  }

  selectYear = (e, { value }) => {

    this.setState({
      year: value
    }, () => { this.onChange() });
  }

  selectMonth = (e, { value }) => {
    
    this.setState({
      month: value,
      date: null,
      dateOptions: range(1, numberOfDays(value, this.state.year)).map(i => ({ key: Date.now() + '_' + i, value: i, text: i }))
    }, () => { this.onChange() });
  }

  selectDate = (e, { value }) => {
    this.setState({
      date: value
    }, () => { this.onChange() });
  }

  componentDidMount() {

    this.setState({
      yearOptions:  range(2020, 2025).map(i => ({ key: Date.now() + '_' + i, value: i, text: i })),
      monthOptions: range(   1,   12).map(i => ({ key: Date.now() + '_' + i, value: i, text: monthName(i) }))
    });
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
            value={this.state.date}
            onChange={this.selectDate}
            disabled={!this.state.month}
          />
        </div>
      </Form.Field>
    );
  }
}

export default DateInput;
