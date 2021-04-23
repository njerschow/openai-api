require('dotenv').config();
const api_key = process.env.OPENAI_TEST_API_KEY;
const expect = require('chai').expect;
const OpenAI = require('../index');

if (!api_key) {
  throw new Error('api key is needed to run testsuite: set environment variable: OPENAI_TEST_API_KEY');
}

describe('basic openai api methods', function () {
  const openai = new OpenAI(api_key);

  it('should handle simple completion', async function () {
    const result = await openai.complete({
      engine: 'ada',
      prompt: "this is a test",
      maxTokens: 5,
      temperature: 0.9,
      frequencyPenalty: 0,
      bestOf: 1,
      stop: ["\n", "lol"]
    });
    expect(result).to.be.ok;
  });

  it('should handle search', async function () {
    const result = await openai.search({
      engine: 'ada',
      documents: ["White House", "hospital", "school"],
      query: "the president"
    });
    expect(result).to.be.ok;
  });

  it('should return a default value from the encode function', async function () {
    const result = await openai.encode('this is a string')
    expect(result).to.be.ok;
    expect(result.length).to.be.eql(2047);
  });
});