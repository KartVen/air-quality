import {JWT} from "next-auth/jwt";
import authService from "@/utils/api/auth/authService";

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
    return await authService.refreshToken(token.tokens.refreshToken)
        .then(({accessToken}): JWT => {
            console.debug("Refreshed session");
            return {
                ...token,
                tokens: {...token.tokens, accessToken},
            };
        })
        .catch((err): JWT => {
            console.debug("Error refreshing access token", err);
            return token;
        });
};