import {jwtDecode, JwtPayload} from "jwt-decode";
import {Session} from "next-auth";

export interface JwtAQPayload extends JwtPayload {
    email: string;
    username: string;
    roles: Role[];
    is_verified: boolean;
}

export const decodeTokenFromCredentials = (credentials: Record<"accessToken" | "refreshToken", string>): JwtAQPayload => {
    return jwtDecode(credentials.accessToken);
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUBSCRIBED = "SUBSCRIBED",
}

export const isContainRole = (session: Session, role: Role) => session.user.roles.some(r => r === role);