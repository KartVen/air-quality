export default interface RegisterResponse {
    tokens: {
        accessToken: string,
        refreshToken: string,
    }
}