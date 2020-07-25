const DEFAULT_ENGINE = 'davinci';
const ENGINE_LIST = ['ada', 'babbage', 'curie', 'davinci'];

module.exports = {
    completionURL: (engine) => {
        if (!engine) {
            engine = DEFAULT_ENGINE;
        }
        if (!ENGINE_LIST.includes(engine)) {
            throw new Error("< " + engine + " > is not a valid OpenAI engine.");
        }
        return `https://api.openai.com/v1/engines/${engine}/completions`;
    },
    searchURL: (engine) => {
        if (!engine) {
            engine = DEFAULT_ENGINE;
        }
        if (!ENGINE_LIST.includes(engine)) {
            throw new Error("< " + engine + " > is not a valid OpenAI engine.");
        }
        return `https://api.openai.com/v1/engines/${engine}/search`;
    }
}