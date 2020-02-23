
const displayTime = (time) => {

  let options = { hour: 'numeric', minute: '2-digit', timeZone: 'UTC', hour12: true };
  let midnightTime = new Date('2002-01-17');  // By leaving out the time, Javascript automatically assumes midnight.
  let displayTime  = new Date(midnightTime.getTime() + time * 60000);
  return displayTime.toLocaleTimeString('en-US', options);
}

const displayDate = (date) => {

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return (new Date(date)).toLocaleDateString('en-US', options);
}

exports.displayTime = displayTime;
exports.displayDate = displayDate;
