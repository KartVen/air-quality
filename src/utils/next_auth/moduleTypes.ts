import {DefaultSession, DefaultUser} from "next-auth";
import {DefaultJWT} from "next-auth/jwt";
import {JwtAQPayload} from "@/utils/api/auth/types/jwtAQPayload";
import Role from "@/utils/api/auth/types/role";
import Address from "@/utils/api/notification/types/address";

declare module 'next-auth' {
    interface User extends DefaultUser, JwtAQPayload {
        email: string;
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
    }

    interface Session extends DefaultSession {
        user: {
            id: number;
            username: string;
            roles: Role[]
            email: string;
            isVerified: boolean;
            address?: Address;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends JwtAQPayload, DefaultJWT {
        sub: string;
        email: string;
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
        is_verified: boolean;
    }
}