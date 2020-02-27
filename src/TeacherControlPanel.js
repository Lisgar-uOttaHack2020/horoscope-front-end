
import React from 'react';
import { Header, Form, Button, Modal, Icon, Grid, List } from 'semantic-ui-react';
import TimeInput from './TimeInput';
import DateInput from './DateInput';
import ViewContainer from './ViewContainer';
import { displayTime, displayDate } from './utils/time';
import { get, post } from './utils/request';
import './css/TeacherControlPanel.css';

class TeacherBookingList extends React.Component {

  tempToken = 'c99c492b2bb6c81c977c505a7f3adfd98f92a5819b5a00c8ab18c453d4f9ae11f144c68a45f064077cfc49790fa13d583f3c03e9ae5732af2e19dc38d6ab23a3';
  tempTeacherId = '5e580b4982a5090024e3e118';

  state = {
    timeSlotList: [],
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

  timeSlot_add = async () => {

    try {

      await post('/bookings/teacher', {
        token: this.tempToken,
        bookings: [{
          room: this.tempForm.room,
          date: this.tempForm.date,
          time: {
            start: this.tempForm['start-time'],
            end: this.tempForm['end-time']
          }
        }]
      });

      this.refreshTimeSlots();
      this.closeModal();
    
    } catch (json) { this.props.displayModalMessageFunc(json.error) }
  }

  timeSlot_delete = (index) => {
    
    // TODO: Delete booking with endpoint.
  }

  refreshTimeSlots = async () => {

    try {
      
      // TODO: Clean up after bookingsQuery accepts a teacher token.

      let bookingsQuery = await get('/bookings', {});

      let filteredTimeSlots = await new Promise(resolve => {
        resolve(bookingsQuery.filter(booking => (booking['teacher-id'] === this.tempTeacherId)));
      });

      this.setState({
        timeSlotList: filteredTimeSlots.map(timeSlot => (
          <TimeSlot key={timeSlot._id} index={timeSlot._id}
            date={timeSlot.date}
            start-time={timeSlot.time.start}
            end-time={timeSlot.time.end}
            room={timeSlot.room}
            deleteFunc={this.timeSlot_delete}
          />
        ))
      });
      
    } catch (json) { this.props.displayModalMessageFunc(json.error) }
  }

  componentDidMount() {

    this.refreshTimeSlots();
  }

  renderTimeSlots = () => {

    if (this.state.timeSlotList.length === 0) {
      return <p className='empty'>No appointments added.</p>;
    }

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
      <ViewContainer maxWidth='100vw'>

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
                <DateInput label='Date' name='date'
                  onChange={this.onFormChange}
                />
                <TimeInput label='Start time' name='start-time'
                  onChange={this.onFormChange}
                />
                <TimeInput label='End time' name='end-time'
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
          <Header size='small'>{displayDate(this.props.date)}</Header>
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
      this.tempForm[name] = displayTime(value);
    else
      this.tempForm[name] = value;
  }

  applyEdits = () => {

    // TODO: Modify booking with endpoint.

    console.log(this.state);  // Temporary.
    this.closeModal();
  }

  onDelete = () => {

    this.props.deleteFunc(this.props.index);
  }

  componentDidMount() {

    // Fetch booking parameters from props.
    this.setState({
      'start-time': this.props['start-time'],
      'end-time': this.props['end-time'],
      'room': this.props['room'],
      'student': this.props['student']
    });
  }

  render() {

    const getAttrText = (val) => (val ? val : <span className='empty'>TBD</span>);

    let border = '2px solid #e2e2e2';
    if (!this.state['start-time'] || !this.state['end-time'] || !this.state.student || !this.state.room) {
      border = '2px dashed #ffa1a1';
    }

    return <>
      <div className='booking-time-slot' style={{border: border}}>
        <div className='definitions'>
          <div>Time</div>
          <div>{ displayTime(this.state['start-time']) } to { displayTime(this.state['end-time']) }</div>
          <div>Student</div>
          <div>{ getAttrText(this.state.student) }</div>
          <div>Room</div>
          <div>{ getAttrText(this.state.room) }</div>
        </div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Button icon='edit' basic primary fluid onClick={this.openModal} />
            </Grid.Column>
            <Grid.Column>
              <Button icon='delete' basic negative fluid onClick={this.onDelete} />
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