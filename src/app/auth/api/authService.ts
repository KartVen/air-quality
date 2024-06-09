import axiosApi from "@/shared/interceptor";
import {RegisterBody, RegisterRes} from "@/app/auth/api/model/register";

export const authService = {
    register: async (body: RegisterBody) => {
        return await axiosApi.post<RegisterRes>("/registration/", body);
    }
};