import {EventCallbacks} from "next-auth";
import authService from "@/utils/api/auth/authService";

export const events: Partial<EventCallbacks> = {
    async signOut({session}): Promise<void> {
        session && await authService.logout(session);
    }
}