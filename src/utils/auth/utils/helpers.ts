import {jwtDecode, JwtPayload} from "jwt-decode";

export interface JwtAQPayload extends JwtPayload {
    email: string;
    username: string;
    roles: string[];
    is_verified: boolean;
}

export const decodeTokenFromCredentials = (credentials: Record<"accessToken" | "refreshToken", string>): JwtAQPayload => {
    return jwtDecode(credentials.accessToken);
}