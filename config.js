const DEFAULT_ENGINE = 'davinci';
const ENGINE_LIST = ['ada', 'babbage', 'curie', 'davinci', 'davinci-instruct-beta', 'curie-instruct-beta'];
const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`

module.exports = {
  completionURL(engine) {
    if (!ENGINE_LIST.includes(engine)) {
      engine = DEFAULT_ENGINE;
    }
    return `${OPEN_AI_URL}/engines/${engine}/completions`;
  },
  searchURL(engine) {
    if (!ENGINE_LIST.includes(engine)) {
      engine = DEFAULT_ENGINE;
    }
    return `${OPEN_AI_URL}/engines/${engine}/search`;
  },
  enginesUrl() {
    return `${OPEN_AI_URL}/engines`;
  },
  classificationsUrl() {
    return `${OPEN_AI_URL}/classifications`
  },
  filesUrl() {
    return `${OPEN_AI_URL}/files`
  },
  answersUrl() {
    return `${OPEN_AI_URL}/answers`
  }
};
