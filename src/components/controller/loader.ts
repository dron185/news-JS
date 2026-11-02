import { Callback, Endpoint, HttpMethod, RequestOptions, RequestParams } from '../../types';

class Loader {
    private baseLink: string;
    // Readonly + Partial — Utility Types
    private options: Readonly<Partial<RequestOptions>>;

    constructor(baseLink: string, options: Readonly<Partial<RequestOptions>>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    // Generic <T> + Function Type Callback<T>
    public getResp<T>({ endpoint, options = {} }: RequestParams, callback: Callback<T>): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Partial<RequestOptions>, endpoint: Endpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options } as RequestOptions;
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: Partial<RequestOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
