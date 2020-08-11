"use strict";

const config = require('./config'),
    axios = require('axios');

class OpenAI {
    constructor(api_key) {
        this.__api_key = api_key;
    }

    __safe_cast = (number) => {
        return number ? Number(number) : null;
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
            max_tokens: this.__safe_cast(opts.maxTokens),
            temperature: this.__safe_cast(opts.temperature),
            top_p: this.__safe_cast(opts.topP),
            n:  this.__safe_cast(opts.n),
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
