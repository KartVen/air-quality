import {CallbacksOptions, Session} from "next-auth";
import {JWT} from "next-auth/jwt";
import {parseIntIfNumber} from "@/utils/methods";

import {refreshAccessToken} from "@/utils/api/auth/methods/refreshAccessToken";

export const callbacks: Partial<CallbacksOptions> = {
    async jwt({token, user}): Promise<JWT> {
        if (user)
            return {...user};
        const nowInUnix = Math.floor(new Date().getTime() / 1000);
        if (nowInUnix > token.exp)
            return await refreshAccessToken(token);
        console.debug("return token", token);
        return token;
    },
    async session({session, token}): Promise<Session> {
        return {
            ...session,
            user: {
                ...token,
                email: token.sub,
                id: parseIntIfNumber(token.sub, session.user.id),
                isVerified: token.is_verified,
            },
            tokens: token.tokens
        };
    }
};