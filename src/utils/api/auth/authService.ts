import axiosApi from "@/utils/api/axiosApi";
import LoginResponse from "@/utils/api/auth/types/loginResponse";
import {Session} from "next-auth";
import AccessToken from "@/utils/api/auth/types/accessToken";
import RegisterResponse from "@/utils/api/auth/types/registerResponse";
import ApiService from "@/utils/api/apiService";

interface AuthEndpoints {
    login(email: string, password: string): Promise<LoginResponse>;

    register(email: string, username: string, password: string): Promise<RegisterResponse>;

    logout(session: Session): Promise<void>;

    refreshToken(refreshToken: string): Promise<AccessToken>;
}

class AuthService extends ApiService implements AuthEndpoints {
    async login(email: string, password: string): Promise<LoginResponse> {
        return await axiosApi.post("/auth/login/", {email, password})
            .then(res => res.data);
    }

    async register(email: string, username: string, password: string): Promise<RegisterResponse> {
        return await axiosApi.post<RegisterResponse>("/registration/", {email, username, password})
            .then(res => res.data);
    }

    async logout(session: Session): Promise<void> {
        return await axiosApi.post("/auth/logout/", null, this.withAuthorization(session));
    }

    async refreshToken(refreshToken: string): Promise<AccessToken> {
        return await axiosApi.post<AccessToken>("/auth/refreshToken/", {refreshToken})
            .then(res => res.data);
    }
}

const authService = new AuthService();
export default authService;