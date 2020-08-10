"use strict";

const config = require('./config'),
    axios = require('axios');

class OpenAI {
    constructor(api_key) {
        this.__api_key = api_key;
    }

    __send_request = (opts) => {
        const url = config.completionURL(opts.engine);
        const reqOpts = {
            headers: {
                'Authorization': `Bearer ${this.__api_key}`,
                'Content-Type': 'application/json'
            }
        };
        const data = {
            prompt: opts.prompt,
            max_tokens: opts.maxTokens * 1,
            temperature: opts.temperature,
            top_p: opts.topP,
            n: opts.n,
            stream: opts.stream,
            stop: opts.stop
        };
        return axios.post(url, data, reqOpts);
    }

    complete = function (opts) {
        return this.__send_request(opts);
    }

    search = (opts) => {
        const url = config.searchURL(opts.engine);
        const reqOpts = {
            headers: {
                'Authorization': `Bearer ${this.__api_key}`,
                'Content-Type': 'application/json'
            }
        };
        const data = {
            documents: opts.documents,
            query: opts.query
        };
        return axios.post(url, data, reqOpts);
    }
}

module.exports = OpenAI;
