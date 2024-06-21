import NextAuth, {AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {events} from "@/utils/next_auth/events";
import {authorize} from "@/utils/next_auth/authorize";
import {callbacks} from "@/utils/next_auth/callbacks";

const authOptions: AuthOptions = {
    pages: {
        signIn: '/signin',
        newUser: '/',
        error: '/'
    },
    providers: [
        Credentials({
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
    callbacks,
    events
};

const auth = NextAuth(authOptions);

export default auth;