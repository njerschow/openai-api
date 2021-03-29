# openai-api

## Overview
This package is a tiny node wrapper for the openAI API, if you find any issue please feel free to message me or open a PR :).

### A few words from GPT-3 ###
If you have any ideas on how to improve the library feel free to let me know as well!

You can also visit the Issue tracker for more information or open a new issue.

This project is not affiliated with OpenAI and was written purely out of interest.

## Installation

`npm i openai-api`

## Usage

### Initializing
```js
const OpenAI = require('openai-api');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);
```

### Completion API call
```js
(async () => {
    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: 'this is a test',
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    });
            
    console.log(gptResponse.data);
})();
```

#### Example of a successful completion response:
```json
{
    id: 'some-long-id',
    object: 'text_completion',
    created: 1616791508,
    model: 'davinci:2020-05-03',
    choices: [
        {
          text: " predicted text...",
          index: 0,
          logprobs: null,
          finish_reason: 'length'
        }
    ]
}
```

### Search API call
```js
(async () => {
    const gptResponse = await openai.search({
        engine: 'davinci',
        documents: ["White House", "hospital", "school"],
        query: "the president"
    });
            
    console.log(gptResponse.data);
})();
```
