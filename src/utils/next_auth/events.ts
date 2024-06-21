import {EventCallbacks} from "next-auth";
import authService from "@/utils/api/auth/authService";

export const events: Partial<EventCallbacks> = {
    async signOut(): Promise<void> {
        await authService.logout();
    }
}