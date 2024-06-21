import {User} from "next-auth";
import {decodeAccessToken} from "@/utils/api/auth/methods/decodeAccessToken";

export const authorize = async (credentials?: Record<string, any>): Promise<User | null> => {
    if (!credentials) return null;
    const {accessToken, refreshToken} = credentials;
    const jwtPayload = decodeAccessToken(accessToken);
    return {
        id: jwtPayload.sub ?? '-1',
        tokens: {
            accessToken,
            refreshToken
        },
        ...jwtPayload,
    };
};