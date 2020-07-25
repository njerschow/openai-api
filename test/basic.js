const api_key = process.env.OPENAI_TEST_API_KEY;
const assert = require('assert');

const OpenAI = require('../index');

if (!api_key) {
    throw 'api key is needed to run testsuite: set environment variable: OPENAI_TEST_API_KEY'
}

describe('basic openai api methods', function () {

    const openai = new OpenAI(api_key);

    it ('handle simple completion', function (done) {
        openai.complete({
            prompt: "this is a test",
            maxTokens: 5
        }).then((result) => {
            assert.ok(result);
            done();
        })
        .catch(err => {
            console.error(err);
            assert.fail();
        });
    });

    it ('handle search', function (done) {
        openai.search({
            documents: ["White House", "hospital", "school"],
            query: "the president"
        }).then((result) => {
            assert.ok(result);
            done();
        })
        .catch(err => {
            console.error(err);
            assert.fail();
        })
    })
});