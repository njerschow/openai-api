"use strict";

const config = require('./config');
const axios = require('axios');

class OpenAI {
  constructor(api_key) {
    this._api_key = api_key;
  }

  _send_request(url, method, opts = {}) {
    let camelToUnderscore = (key) => {
      let result = key.replace(/([A-Z])/g, " $1");
      return result.split(' ').join('_').toLowerCase();
    }

    const data = {};
    for (const key in opts) {
      data[camelToUnderscore(key)] = opts[key];
    }

    return axios({
      url,
      headers: {
        'Authorization': `Bearer ${this._api_key}`,
        'Content-Type': 'application/json'
      },
      data: Object.keys(data).length ? data : '',
      method,
    });
  }

  complete(opts) {
    const url = config.completionURL(opts.engine);
    delete opts.engine;

    return this._send_request(url, 'post', opts);
  }

  encode() {
    // This method is no longer supported in Node>=v14. See
    return Promise.resolve(new Array(2047).fill(""));
  }

  search(opts) {
    const url = config.searchURL(opts.engine)
    delete opts.engine;
    return this._send_request(url, 'post', opts);
  }

  answers(opts) {
    const url = config.answersUrl();
    return this._send_request(url, 'post', opts);
  }

  classification(opts) {
    const url = config.classificationsUrl();
    return this._send_request(url, "post", opts);
  }

  engines() {
    const url = config.enginesUrl();
    return this._send_request(url, 'get')
  }

  engine(engine) {
    const url = config.engineUrl(engine);
    return this._send_request(url, 'get');
  }
}

module.exports = OpenAI;
