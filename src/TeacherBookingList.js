
import React from 'react';
import { Header, Form, Button, Modal, Icon, Grid, List } from 'semantic-ui-react';
import ViewContainer from './ViewContainer';
import { numberToDisplayTime } from './utils/funcs';
import './css/TeacherBookingList.css';

class TeacherBookingList extends React.Component {

  state = {
    timeSlotList: [
      <TimeSlot key={'1'} index={'1'} date='2020-03-26' start-time={840} end-time={900} student='Emily Yu' room='109' />,
      <TimeSlot key={'2'} index={'2'} date='2020-03-27' start-time={810} end-time={870} student='Max Huang' room='150' />,
      <TimeSlot key={'3'} index={'3'} date='2020-03-26' start-time={780} end-time={840} student='Logan Mack' room='109' />
    ],
    modalOpen: false
  }

  tempForm = {};

  closeModal = () => { this.setState({ modalOpen: false }) }
  openModal = () => {
    this.tempForm = {};  // The form values must be reset.
    this.setState({ modalOpen: true });
  }

  onFormChange = (e, { name, value }) => {

    this.tempForm[name] = value;
  }

  timeSlot_add = () => {
    
    let tempList = this.state.timeSlotList.slice();

    tempList.push(
      <TimeSlot key={Date.now()} index={Date.now()}
        date={this.tempForm['date']}
        start-time={parseInt(this.tempForm['start-time'])}
        end-time={parseInt(this.tempForm['end-time'])}
        room={this.tempForm['room']}
        student='Empty'
      />
    );

    this.setState({ timeSlotList: tempList });
    this.closeModal();
  }

  renderTimeSlots = () => {

    // Sort by date, then by time.
    const sortChronologicalFunc = (a, b) => {

      if (a.props.date > b.props.date) return 1;
      if (a.props.date < b.props.date) return -1;
      
      return a.props['start-time'] - b.props['start-time'];
    }

    let datesSorted = [...new Set(this.state.timeSlotList.slice().map(timeSlot => timeSlot.props.date).sort())];
    let timeSlotsSorted = this.state.timeSlotList.slice().sort(sortChronologicalFunc);
    let timeSlotsOrganized = {};

    // Because time slots are already sorted, they will remain sorted when organized.
    timeSlotsSorted.forEach(timeSlot => {

      if (!timeSlotsOrganized[timeSlot.props.date])
        timeSlotsOrganized[timeSlot.props.date] = [ timeSlot ];
      else
        timeSlotsOrganized[timeSlot.props.date].push(timeSlot);
    });

    return datesSorted.map((date, i) => {
      return (
        <BookedDay key={Date.now() + '_' + i} date={date}>
          { timeSlotsOrganized[date].map(timeSlot => timeSlot) }
        </BookedDay>
      );
    });

  }

  render() {

    return (
      <ViewContainer width='100%' maxWidth='1140px'>

        <div>Bookings</div>

        <List relaxed divided>{ this.renderTimeSlots() }</List>

        <>
          <Form>
            <Form.Button icon labelPosition='left' fluid positive onClick={this.openModal}>
              <Icon name='add' />Add appointment
            </Form.Button>
          </Form>
          
          <Modal open={this.state.modalOpen}>
            <Header content='Create new appointment' />
            <Modal.Content>
              <Form>
                <Form.Input label='Date' placeholder='Date' name='date'
                  onChange={this.onFormChange}
                />
                <Form.Input label='Start time' placeholder='Start time' name='start-time'
                  onChange={this.onFormChange}
                />
                <Form.Input label='End time' placeholder='End time' name='end-time'
                  onChange={this.onFormChange}
                />
                <Form.Input label='Room' placeholder='Room number' name='room'
                  onChange={this.onFormChange}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button primary onClick={this.timeSlot_add}>
                <Icon name='checkmark' />Apply
              </Button>
              <Button secondary onClick={this.closeModal}>
                <Icon name='remove' />Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </>

      </ViewContainer>
    );
  }
}

class BookedDay extends React.Component {

  render() {

    return (
      <List.Item style={{padding: '16px 8px'}}>
        <List.Content>
          <Header size='small'>{this.props.date}</Header>
          <div className='booking-time-container'>
            {this.props.children}
          </div>
        </List.Content>
      </List.Item>
    );
  }
}

class TimeSlot extends React.Component {

  state = {
    modalOpen: false
  };

  tempForm = {};

  closeModal = () => { this.setState({ modalOpen: false }) }
  openModal = () => { this.setState({ modalOpen: true }) }

  onFormChange = (e, { name, value }) => {

    if (name === 'start-time' || name === 'end-time')
      this.tempForm[name] = numberToDisplayTime(value);
    else
      this.tempForm[name] = value;
  }

  applyEdits = () => {

    Object.assign(this.state, this.tempForm);

    // TODO: Modify booking with endpoint.

    console.log(this.state);  // Temporary.
    this.closeModal();
  }

  componentDidMount() {

    // Fetch booking parameters from props.
    this.setState({
      'start-time': numberToDisplayTime(this.props['start-time']),
      'end-time': numberToDisplayTime(this.props['end-time']),
      'room': this.props['room'],
      'student': this.props['student']
    });
  }

  render() {

    // <></> allow for returning a list of components without a wrapper.
    return <>

      <div className='booking-time-slot'>
        <div className='definitions'>
          <div>Time</div>
          <div>{this.state['start-time']} to {this.state['end-time']}</div>
          <div>Student</div>
          <div>{this.state.student}</div>
          <div>Room</div>
          <div>{this.state.room}</div>
        </div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Button icon='edit' basic primary fluid onClick={this.openModal} />
            </Grid.Column>
            <Grid.Column>
              <Button icon='delete' basic negative fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <Modal open={this.state.modalOpen}>
        <Header content='Edit time slot' />
        <Modal.Content>
          <Form>
            <Form.Input label='New room' placeholder='Room number' name='room'
              defaultValue={this.state.room}
              onChange={this.onFormChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.applyEdits}>
            <Icon name='checkmark' />Apply
          </Button>
          <Button secondary onClick={this.closeModal}>
            <Icon name='remove' />Cancel
          </Button>
        </Modal.Actions>
      </Modal>

    </>;
  }
}

export default TeacherBookingList;
