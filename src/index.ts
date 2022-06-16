"use strict";

const config = require("./config");
const axios = require("axios");

const DEFAULT_ENGINE = "davinci";

export interface CompletionOpts {
  model: string;
  prompt?: string;
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  user?: string;
  logit_bias?: { [token: string]: number };
}

export interface Completion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
}

export interface Choice {
  text: string;
  index: number;
  logprobs: any;
  finish_reason: string;
}

export interface SearchOpts {
  engine_id: string;
  query: string;
  documents?: string[];
  file?: string;
  max_rerank?: number;
  return_metadata?: boolean;
  user?: string;
}

export interface Search {
  data: Document[];
  object: string;
}

export interface Document {
  document: number;
  object: string;
  score: number;
  metadata?: any;
}

export interface AnswerOpts {
  model: string;
  question: string;
  examples: string[][];
  examples_context: string;
  documents?: string[];
  file?: string;
  search_model?: string;
  max_rerank?: number;
  temperature?: number;
  logprobs?: number;
  max_tokens?: number;
  stop?: string | string[];
  n?: number;
  logit_bias?: LogitBias;
  return_metadata?: boolean;
  return_prompt?: boolean;
  expand?: string[];
  user?: string;
}

export interface LogitBias {
  [key: string]: number;
}

export interface Answer {
  answers: string[];
  completion: string;
  modeL: string;
  object: string;
  search_model: string;
  selected_documents: AnswerDocument[];
}

export interface AnswerDocument {
  document: number;
  text: string;
}

export interface ClassificationOpts {
  model: string;
  query: string;
  examples?: string[][];
  file?: string;
  labels?: string[];
  search_model?: string;
  temperature?: string;
  logprobs?: number;
  max_examples?: number;
  logit_bias?: LogitBias;
  return_prompt?: boolean;
  return_metadata?: boolean;
  expand?: string[];
  user?: string;
}

export interface Classification {
  completion: string;
  label: string;
  model: string;
  object: string;
  search_model: string;
  selected_examples: ClassificationDocument;
}

export interface ClassificationDocument {
  document: number;
  label: string;
  text: string;
}

export interface EngineData {
  data: Engine[];
  object: string;
}

export interface EmbeddingOpts {
  model: string;
  input: string | string[];
  user?: string;
}

export interface Engine {
  id: string;
  object: string;
  owner: string;
  ready: boolean;
}

export interface Embedding {
  object: string;
  data: EmbeddingData[];
}

export interface EmbeddingData {
  object: string;
  index: number;
  embedding: number[];
}

export default class OpenAI {
  constructor(private readonly apiKey: string) {}

  _send_request(url: string, method: string, opts: any = {}) {
    return axios({
      url,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      data: Object.keys(opts).length ? opts : "",
      method,
    });
  }

  _check_embeddings_engine_name(model: string) {
    const availableEngineNames = [
      "text-similarity-ada-001",
      "text-similarity-babbage-001",
      "text-similarity-curie-001",
      "text-similarity-davinci-001",
      "text-search-ada-doc-001",
      "text-search-ada-query-001",
      "text-search-babbage-doc-001",
      "text-search-babbage-query-001",
      "text-search-curie-doc-001",
      "text-search-curie-query-001",
      "text-search-davinci-doc-001",
      "text-search-davinci-query-001",
      "code-search-ada-code-001",
      "code-search-ada-text-001",
      "code-search-babbage-code-001",
      "code-search-babbage-text-001",
    ];

    if (!availableEngineNames.includes(model)) {
      throw new Error(
        `Unknown engine name for embeddings. Available engine names are ${availableEngineNames}`
      );
    }
  }

  async complete(opts: CompletionOpts): Promise<Completion> {
    const url = config.completionURL(opts.model || DEFAULT_ENGINE);
    return this._send_request(url, "post", opts);
  }

  encode() {
    // This method is no longer supported in Node>=v14. See
    return Promise.resolve(new Array(2047).fill(""));
  }

  async search(opts: SearchOpts): Promise<Search> {
    const url = config.searchURL(opts.engine_id || DEFAULT_ENGINE);
    return this._send_request(url, "post", opts);
  }

  async answers(opts: AnswerOpts): Promise<Answer> {
    const url = config.answersUrl();
    return this._send_request(url, "post", opts);
  }

  async classification(opts: ClassificationOpts): Promise<Classification> {
    const url = config.classificationsUrl();
    return this._send_request(url, "post", opts);
  }

  async engines() {
    const url = config.enginesUrl();
    return this._send_request(url, "get");
  }

  async engine(engine: string) {
    const url = config.engineUrl(engine);
    return this._send_request(url, "get");
  }

  async embeddings(opts: EmbeddingOpts): Promise<Embedding> {
    this._check_embeddings_engine_name(opts.model);

    const url = config.embeddingsUrl(opts.model);
    return this._send_request(url, "post", opts);
  }
}
