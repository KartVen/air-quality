import axiosApi from "@/utils/api/axiosApi";
import {Session} from "next-auth";
import ApiService from "@/utils/api/apiService";

interface ProfileEndpoints {
    changeUsername(session: Session, username: string): Promise<void>;

    changePassword(session: Session, currentPassword: string, newPassword: string): Promise<void>;
}

class ProfileService extends ApiService implements ProfileEndpoints {
    async changeUsername(session: Session, username: string): Promise<void> {
        return await axiosApi.post("/me/editAccount/", {newUsername: username}, this.withAuthorization(session));
    }

    async changePassword(session: Session, currentPassword: string, newPassword: string): Promise<void> {
        const data = {
            currentPassword,
            newPassword,
            newPassword2: newPassword,
        };
        return await axiosApi.post("/changePassword/", data, this.withAuthorization(session));
    }
}

const profileService = new ProfileService();
export default profileService;