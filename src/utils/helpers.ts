const BEARER_HEADER_PREFIX = 'Bearer ';

export const concatBearer = (bearer: string) => BEARER_HEADER_PREFIX + bearer;

export enum Status {
    LOADING,
    READY,
    ERROR
}
