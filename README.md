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

```js
const OpenAI = require('openai-api');
const OPEN_AI_API_KEY = ####################
const openai = new OpenAI(OPEN_AI_API_KEY);

(async () => {
  await const gptResponse = openai.complete({
    engine: 'davinci',
    prompt: 'this is a test',
    maxTokens: 5,
    temperature: 0.9,
    topP: 1,
    n: 1,
    stream: false,
    stop: ['\n', "testing"]in
  });
  
  console.log(gptResponse.data);
})();

(async () => {
  await const gptResponse = openai.search({
    engine: 'davinci',
    documents: ["White House", "hospital", "school"],
    query: "the president"
  });
  
  console.log(gptResponse.data);
})();
```
