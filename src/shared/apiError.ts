export default interface ApiError {
    getCode(): number;
    getMessage(): string;
    getData(): any | undefined;
}

export class InternalErrorApiError implements ApiError {
    constructor(private data?: any) {}

    getCode = (): number => 500;
    getMessage = (): string => "Internal Server Error";
    getData = (): any | undefined => this.data;
}

export class BadRequestApiError extends InternalErrorApiError {
    getCode = (): number => 400;
    getMessage = (): string => "Bad Request";
}

export class UnauthorizedApiError extends InternalErrorApiError {
    getCode = (): number => 401;
    getMessage = (): string => "Unauthorized";
}

export class ForbiddenApiError extends InternalErrorApiError {
    getCode = (): number => 403;
    getMessage = (): string => "Forbidden";
}