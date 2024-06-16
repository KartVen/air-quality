import axiosApi from "@/utils/interceptor";
import {signIn, SignInOptions} from "next-auth/react";
import LoginResponse from "@/utils/auth/models/loginResponse";
import RegisterResponse from "@/utils/auth/models/registerResponse";

interface AuthService {
    login(email: string, password: string): Promise<void>;

    register(email: string, username: string, password: string): Promise<void>;

    logout(): Promise<void>;
}

const defaultSignInOptions: SignInOptions = {
    redirect: true,
    callbackUrl: "/"
}

const authService: AuthService = {
    async login(email: string, password: string) {
        const body = {email, password};
        return await axiosApi.post<LoginResponse>("/auth/login/", body)
            .then(res => {
                console.log(res);
                signIn('login', {...defaultSignInOptions, ...res.data})
            })
    },

    async register(email: string, username: string, password: string) {
        const body = {email, username, password};
        return await axiosApi.post<RegisterResponse>("/registration/", body)
            .then(res => {
                console.log(res);
                signIn('register', {...defaultSignInOptions, ...res.data})
            });
    },

    async logout(): Promise<void> {
        return await axiosApi.post("/auth/logout/");
    }
}

export default authService;