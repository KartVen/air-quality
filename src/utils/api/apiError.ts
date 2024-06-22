export default abstract class ApiError {
    abstract getCode(): number;
    abstract getMessage(): string;
    abstract getData(): any | undefined;
}

export class ServiceUnavailableApiError implements ApiError {
    getCode = (): number => 503;
    getMessage = (): string => "Service Unavailable";
    getData = (): any | undefined => undefined;
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