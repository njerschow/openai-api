"use strict";

const config = require('./config');
const axios = require('axios');

class OpenAI {
  constructor(api_key) {
    this._headers = {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    }
  }

  _send_request(url, opts) {
    delete opts.engine;

    let camelToUnderscore = (key) => {
      let result = key.replace(/([A-Z])/g, " $1");
      return result.split(' ').join('_').toLowerCase();
    }

    const data = {};
    for (const key in opts) {
      data[camelToUnderscore(key)] = opts[key];
    }

    return axios.post(url, data, { headers: this._headers });
  }
  complete(opts) {
    const url = config.completionURL(opts.engine);
    delete opts.engine;

    return this._send_request(url, opts);
  }
  encode() {
    // This method is no longer supported in Node>=v14. See
    return Promise.resolve(new Array(2047).fill(""));
  }
  search(opts) {
    const url = config.searchURL(opts.engine)
    delete opts.engine;
    return this._send_request(url, opts);
  }
  files(opts) {

  }
  answers(opts) {

  }
  classifications(opts) {

  }
  engines(opts) {

  }
}

module.exports = OpenAI;
