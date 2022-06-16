const ORIGIN = "https://api.openai.com";
const API_VERSION = "v1";
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`;

export function completionURL(engine: string): string {
  return `${OPEN_AI_URL}/engines/${engine}/completions`;
}

export function searchURL(engine: string): string {
  return `${OPEN_AI_URL}/engines/${engine}/search`;
}

export function enginesUrl(): string {
  return `${OPEN_AI_URL}/engines`;
}

export function engineUrl(engine: string): string {
  return `${OPEN_AI_URL}/engines/${engine}`;
}

export function classificationsUrl(): string {
  return `${OPEN_AI_URL}/classifications`;
}

export function filesUrl(): string {
  return `${OPEN_AI_URL}/files`;
}

export function answersUrl(): string {
  return `${OPEN_AI_URL}/answers`;
}

export function embeddingsUrl(): string {
  return `${OPEN_AI_URL}/embeddings`;
}
