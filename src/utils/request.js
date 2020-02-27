
const fetch = require('node-fetch');
const queryString = require('querystring');

const send = (src, args) => {

  return new Promise((resolve, reject) => {
    
    let invalid = false;

    fetch(src, args)
      .then(res => {
        if (res.status !== 200) invalid = true;
        return res.json();
      })
      .then(json => {
        if (invalid) reject(json);
        else resolve(json);
      });
  });
}

const get = (src, query) => {

  let args = {
    method: 'get'
  };

  src += '?' + queryString.stringify(query);

  return send(src, args);
}

const post = (src, body) => {

  let args = {
    method: 'post',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return send(src, args);
}

exports.get = get;
exports.post = post;
