import axiosApi from "@/utils/interceptor";
import LoginResponse from "@/utils/auth/models/loginResponse";
import RegisterResponse from "@/utils/auth/models/registerResponse";
import {signIn} from "next-auth/react";

interface AuthService {
    login(email: string, password: string): Promise<LoginResponse>;

    register(email: string, username: string, password: string): Promise<RegisterResponse>;

    logout(): Promise<void>;
}

const authService: AuthService = {
    async login(email: string, password: string) {
        const body = {email, password};
        return await axiosApi.post<LoginResponse>("/auth/login/", body)
            .then(res => res.data)
    },

    async register(email: string, username: string, password: string) {
        const body = {email, username, password};
        return await axiosApi.post<RegisterResponse>("/registration/", body)
            .then(res => res.data);
    },

    async logout(): Promise<void> {
        return await axiosApi.post("/auth/logout/");
    }
}

export default authService;