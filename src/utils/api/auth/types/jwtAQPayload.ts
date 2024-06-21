import {JwtPayload} from "jwt-decode";
import Role from "@/utils/api/auth/types/role";

export interface JwtAQPayload extends JwtPayload {
    sub: string;
    exp: number;
    iat: number;
    email: string;
    username: string;
    roles: Role[];
    is_verified: boolean;
}