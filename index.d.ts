declare module 'openai-api' {
    export interface CompletionOpts {
        engine: string;
        prompt?: string;
        maxTokens?: number;
        temperature?: number;
        topP?: number;
        n?: number;
        stream?: boolean;
        logprobs?: number;
        echo?: boolean;
        stop?: string | string[];
        presencePenalty?: number;
        frequencyPenalty?: number;
        bestOf?: number;
        user?: string;
        logitBias?: { [token: string]: number; };
    }

    export interface Completion {
        data: {
            id: string;
            object: string;
            created: number;
            model: string;
            choices: Choice[];
        };
    }

    export interface Choice {
        text: string;
        index: number;
        logprobs: any;
        finish_reason: string;
    }

    export interface SearchOpts {
        engine: string;
        documents?: string[];
        file?: string;
        query: string;
        maxRerank?: number;
        returnMetadata?: boolean;
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

    export interface Embedding {
        object: string;
        data: EmbeddingData[];
        model: string;
    }

    export interface EmbeddingData {
        object: string;
        index: number;
        embedding: number[];
    }

    class OpenAI {
        constructor(api: string);
        complete(opts: CompletionOpts): Promise<Completion>;
        encode(str: string): number[];
        search(opts: SearchOpts): Promise<Search>;
    }

    export default OpenAI;
}
