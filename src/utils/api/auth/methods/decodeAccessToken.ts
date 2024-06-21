import {JwtAQPayload} from "@/utils/api/auth/types/jwtAQPayload";
import {jwtDecode} from "jwt-decode";

export const decodeAccessToken = (accessToken: string): JwtAQPayload => {
    return jwtDecode(accessToken);
}