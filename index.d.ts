import { ClassificationOpts } from './index.d';
declare module 'openai-api' {
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
        logit_bias?: { [token: string]: number; };
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
        answers: string[],
        completion: string;
        modeL: string;
        object: string;
        search_model: string;
        selected_documents:  AnswerDocument[];
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
        input: string;
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

    class OpenAI {
        constructor(api: string);
        
        async complete(opts: CompletionOpts): Promise<Completion>;
        
        encode(str: string): number[];
        
        async search(opts: SearchOpts): Promise<Search>;
        
        async answers(opts: AnswerOpts): Promise<Answer>;
        
        async classification(opts: ClassificationOpts): Promise<Classification>;

        async engines(): Promise<EngineData>;

        async engine(): Promise<Engine>;

        async embeddings(): Promise<Embedding>;
    }

    export default OpenAI;
}
