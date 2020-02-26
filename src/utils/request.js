
const fetch = require('node-fetch');
const queryString = require('querystring');

const send = (src, args, successFunc, failFunc) => {

  let invalid = false;

  fetch(src, args)
  .then(res => {

    if (res.status !== 200) {
      invalid = true;
    }
    return res.json();
  })
  .then(json => {

    if (invalid) {
      failFunc(json);
    }
    else {
      successFunc(json);
    }
  });
}

const get = (src, query, successFunc, failFunc) => {

  let args = {
    method: 'get'
  };

  src += '?' + queryString.stringify(query);

  return send(src, args, successFunc, failFunc);
}

const post = (src, body, successFunc, failFunc) => {

  let args = {
    method: 'post',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return send(src, args, successFunc, failFunc);
}

exports.get = get;
exports.post = post;
