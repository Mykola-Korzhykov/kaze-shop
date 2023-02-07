export declare class ApiError extends Error {
    statusCode: number;
    rawErrors: string[];
    constructor(statusCode: number, message: string, rawErrors?: string[]);
}
export declare class NotFoundError extends ApiError {
    constructor(path: string);
}
export declare class BadRequestError extends ApiError {
    constructor(message: string, errors: string[]);
}
