import Role from "@/utils/api/auth/types/role";

export default interface UserSession {
    id: number,
    username: string,
    email: string,
    isVerified: boolean,
    roles: Role[]
}