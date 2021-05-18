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
```js
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


### Answers API call

```js
(async () => {
    const gptResponse = await openai.answers({
      "documents": ["Puppy A is happy.", "Puppy B is sad."],
      "question": "which puppy is happy?",
      "search_model": "ada",
      "model": "curie",
      "examples_context": "In 2017, U.S. life expectancy was 78.6 years.",
      "examples": [["What is human life expectancy in the United States?", "78 years."]],
      "max_tokens": 5,
      "stop": ["\n", "<|endoftext|>"],
    });

    console.log(gptResponse.data);
})();
```

### Engines API call

```js
(async () => {
    const gptResponse = await openai.engines();

    console.log(gptResponse.data);
})();
```

### Get number of tokens for string
#### Not supported as of 4/21. See issue #20
The token limit is 2048 for completions using the OpenAI API. This method allows you to get the number of tokens in your prompt. This is done offline (no API call is made).

```js
openai.encode('This is an encoding test. Number of tokens is not necessarily the same as word count.').then((result) => {
     console.log("Number of tokens for string:" + result.length);
 });
```

