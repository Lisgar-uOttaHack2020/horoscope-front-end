
const uniqueArray = (arr) => {

  return [... new Set(arr)];
}

const getFullName = (obj) => {

  return obj['first-name'] + ' ' + obj['last-name'];
}

const numberToDisplayTime = (num) => {
    
  let hours = Math.floor(num / 60);
  let mins = num % 60;
  let PM = true;
  
  if (hours < 12) {
    PM = false;
  }
  if (hours > 12) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  if (mins < 10) {
    mins = '0' + mins;
  }

  return hours + ':' + mins + (PM ? ' PM' : ' AM');
}

exports.numberToDisplayTime = numberToDisplayTime;
exports.uniqueArray = uniqueArray;
exports.getFullName = getFullName;
