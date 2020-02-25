
import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

class DateInput extends React.Component {
  constructor (props){
    super(props);
  }

  state = {
      year: null,
      month: null,
      day: null
  }

  selectYear = (e, { value }) => {
      this.setState({
        year: value,
        month: null,
        day: null
      });
  }

  selectMonth = (e, { value }) => {
      this.setState({
        month: value,
        day: null
      });
  }

  selectDay = (e, { value }) => {
      this.setState({
        day: value
      });
  }

  render() {

    // options for dropdowns
    var yearOptions = [];
    var monthOptions = [
        {value: 1, text: 'January', key: Date.now() + '_' + 1},
        {value: 2, text: 'February', key: Date.now() + '_' + 2},
        {value: 3, text: 'March', key: Date.now() + '_' + 3},
        {value: 4, text: 'April', key: Date.now() + '_' + 4},
        {value: 5, text: 'May', key: Date.now() + '_' + 5},
        {value: 6, text: 'June', key: Date.now() + '_' + 6},
        {value: 7, text: 'July', key: Date.now() + '_' + 7},
        {value: 8, text: 'August', key: Date.now() + '_' + 8},
        {value: 9, text: 'September', key: Date.now() + '_' + 9},
        {value: 10, text: 'October', key: Date.now() + '_' + 10},
        {value: 11, text: 'November', key: Date.now() + '_' + 11},
        {value: 12, text: 'December', key: Date.now() + '_' + 12},
    ];
    var dayOptions = [];

    // populate lists
    for (var i = 2020; i <= 2025; i++){
      var option = {value: i, text: i, key: Date.now() + '_' + i};
      yearOptions.push(option);
    }

    var lastDay;
    if (this.state.month === 2)
        if (this.state.year % 5 === 0)
            lastDay = 29;
        else lastDay = 28;
    else if (this.state.month % 2 === 1) lastDay = 31;
    else lastDay = 30;
    for (var i = 1; i <= lastDay; i++){
      var option = {value: i, text: i, key: Date.now() + '_' + i};
      dayOptions.push(option);
    }

    return (
      <>
        <Form.Group widths='equal' style={{width: 400}}>
          <Form.Field>
            <label>{ this.props.label }</label>
            <Dropdown fluid search selection placeholder='Year'
              options={yearOptions}
              value={this.state.year}
              onChange={this.selectYear}
            />
          </Form.Field>
          <Form.Field>
            <label style={{opacity: 0}}>PADDING</label>
            <Dropdown fluid search selection placeholder='Month'
              options={monthOptions}
              value={this.state.month}
              onChange={this.selectMonth}
              disabled={!this.state.year}
            />
          </Form.Field>
          <Form.Field>
            <label style={{opacity: 0}}>PADDING</label>
            <Dropdown fluid search selection placeholder='Day'
              options={dayOptions}
              value={this.state.day}
              onChange={this.selectDay}
              disabled={!this.state.month}
            />
          </Form.Field>
        </Form.Group>
      </>
    );
  }
}

export default DateInput;
