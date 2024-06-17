import {AuthOptions, DefaultSession, DefaultUser, Session, User} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {decodeTokenFromCredentials, JwtAQPayload, Role} from "@/utils/auth/utils/helpers";
import {JwtPayload} from "jwt-decode";
import {DefaultJWT, JWT} from "next-auth/jwt";
import authService from "@/utils/auth/authService";

declare module 'next-auth' {
    interface User extends DefaultUser, JwtPayload, JwtAQPayload {
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
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends JwtAQPayload, DefaultJWT {
        email: string;
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
        is_verified: boolean;
    }
}

const authorize = async (credentials: Record<string, string> | undefined): Promise<User | null> => {
    if (!credentials) return null;
    const jwtPayload = decodeTokenFromCredentials(credentials);
    const {accessToken, refreshToken} = credentials;
    return {
        id: jwtPayload.sub ?? '-1',
        tokens: {
            accessToken,
            refreshToken
        },
        ...jwtPayload,
    };
};

const authConfig: AuthOptions = {
    pages: {
        signIn: '/signin',
        newUser: '/',

    },
    providers: [
        Credentials({
            id: 'login',
            credentials: {
                accessToken: {},
                refreshToken: {},
            },
            authorize
        }),
        Credentials({
            id: 'register',
            credentials: {
                accessToken: {},
                refreshToken: {},
            },
            authorize
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token, user}): Promise<JWT> {
            return user ? {...user} : token;
        },
        async session({session, token}): Promise<Session> {
            const id = token.sub && Number.isInteger(token.sub)
                ? Number.parseInt(token.sub) : session.user.id;
            return {
                ...session,
                user: {
                    id,
                    username: token.username,
                    roles: token.roles,
                    email: token.email,
                    isVerified: token.is_verified,
                },
                tokens: token.tokens
            };
        }
    },
    events: {
        async signOut(): Promise<void> {
            await authService.logout();
        }
    }
};

export default authConfig;