export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    GET = 'GET',
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: Pick<Source, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: Source[];
}

export type Callback<T> = (data: T) => void;

export type RequestOptions = Record<string, string>;

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<RequestOptions>;
}
