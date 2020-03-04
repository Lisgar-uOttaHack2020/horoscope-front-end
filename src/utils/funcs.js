
const asyncWaitTest = (duration = 1500) => {

  return new Promise(resolve => {

    setTimeout(() => { resolve() }, duration);
  })
}

const range = (start, end, step = 1) => {

  const len = Math.floor((end - start) / step) + 1;
  return Array(len).fill().map((_, i) => start + i * step);
}

exports.asyncWaitTest = asyncWaitTest;
exports.range = range;
