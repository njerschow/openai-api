const api_key = process.env.OPENAI_TEST_API_KEY;

const expect = require('chai').expect;
const OpenAI = require('../index');

if (!api_key) {
    throw 'api key is needed to run testsuite: set environment variable: OPENAI_TEST_API_KEY'
}

describe('basic openai api methods', function () {
    this.timeout(4000);

    const openai = new OpenAI(api_key);

    it ('should handle simple completion', function (done) {
        openai.complete({
            engine: 'ada',
            prompt: "this is a test",
            maxTokens: 5,
            temperature: 0.9,
            frequencyPenalty: 0,
            bestOf: 1,
            stop: ["\n", "lol"]
        }).then((result) => {
            expect(result).to.be.ok;
            done();
        })
        .catch(err => {
            console.error(err);
            expect.fail();
        });
    });

    it ('should handle search', function (done) {
        openai.search({
            engine: 'ada',
            documents: ["White House", "hospital", "school"],
            query: "the president"
        }).then((result) => {
            expect(result).to.be.ok;
            done();
        })
        .catch(err => {
            console.error(err);
            expect.fail();
        })
    });

    it ('should return a default value from the encode function', function (done) {
        openai.encode('this is a string').then((result) => {
            expect(result).to.be.ok;
            expect(result.length).to.be.eql(2047);
            done();
        })
        .catch(err => {
            console.error(err);
            expect.fail();
        })
    });
});