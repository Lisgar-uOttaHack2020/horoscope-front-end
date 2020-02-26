
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

const monthName = (month) => {

  let names = [ undefined, 'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December' ];
  
  return names[month];
}

const numberOfDays = (month, year) => {

  let daysInMonth = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  let numberOfDays = daysInMonth[month];

  if (month === 2) {
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      numberOfDays++;
    }
  }

  return numberOfDays;
}

exports.displayTime = displayTime;
exports.displayDate = displayDate;
exports.monthName = monthName;
exports.numberOfDays = numberOfDays;
