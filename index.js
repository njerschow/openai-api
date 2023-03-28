"use strict";

const config = require('./config');
const axios = require('axios');

const DEFAULT_ENGINE = "davinci";

class OpenAI {
  constructor(api_key) {
    this._api_key = api_key;
  }

  _send_request(url, method, opts = {}) {
    let camelToUnderscore = (key) => {
      let result = key.replace(/([A-Z])/g, " $1");
      return result.split(' ').join('_').toLowerCase();
    };

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

  _check_embeddings_engine_name(engine) {
    const availableEngineNames = [
      'text-similarity-ada-001',
      'text-similarity-babbage-001',
      'text-similarity-curie-001',
      'text-similarity-davinci-001',
      'text-search-ada-doc-001',
      'text-search-ada-query-001',
      'text-search-babbage-doc-001',
      'text-search-babbage-query-001',
      'text-search-curie-doc-001',
      'text-search-curie-query-001',
      'text-search-davinci-doc-001',
      'text-search-davinci-query-001',
      'code-search-ada-code-001',
      'code-search-ada-text-001',
      'code-search-babbage-code-001',
      'code-search-babbage-text-001',
    ];

    if (!availableEngineNames.includes(engine)) {
      throw new Error(`Unknown engine name for embeddings. Available engine names are ${availableEngineNames}`);
    }
  }

  complete(opts) {
    const url = config.completionURL(opts.engine || DEFAULT_ENGINE);
    delete opts.engine;

    return this._send_request(url, 'post', opts);
  }

  encode() {
    // This method is no longer supported in Node>=v14. See
    return Promise.resolve(new Array(2047).fill(""));
  }

  search(opts) {
    const url = config.searchURL(opts.engine || DEFAULT_ENGINE);
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
    return this._send_request(url, 'get');
  }

  engine(engine) {
    const url = config.engineUrl(engine);
    return this._send_request(url, 'get');
  }

  embeddings(opts) {
    this._check_embeddings_engine_name(opts.engine);

    const url = config.embeddingsUrl(opts.engine);
    return this._send_request(url, 'post', opts);
  }

  chat(opts) {
    const url = config.chatURL();
    return this._send_request(url, 'post', opts);
  }
}

module.exports = OpenAI;
