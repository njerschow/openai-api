const DEFAULT_ENGINE = 'davinci';
const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`;

module.exports = {
  completionURL(engine) {
    return `${OPEN_AI_URL}/engines/${engine}/completions`;
  },
  searchURL(engine) {
    return `${OPEN_AI_URL}/engines/${engine}/search`;
  },
  enginesUrl() {
    return `${OPEN_AI_URL}/engines`;
  },
  engineUrl(engine) {
    return `${OPEN_AI_URL}/engines/${engine}`;
  },
  classificationsUrl() {
    return `${OPEN_AI_URL}/classifications`;
  },
  filesUrl() {
    return `${OPEN_AI_URL}/files`;
  },
  answersUrl() {
    return `${OPEN_AI_URL}/answers`;
  },
  embeddingsUrl(engine) {
    return `${OPEN_AI_URL}/engines/${engine}/embeddings`;
  }
};
