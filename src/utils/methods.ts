import {Session} from "next-auth";
import Role from "@/utils/api/auth/types/role";
import {SessionStatus} from "@/utils/types";
import {redirect} from "next/navigation";
import Path from "@/utils/path";

const BEARER_HEADER_PREFIX = 'Bearer ';

export const concatBearer = (bearer: string) => BEARER_HEADER_PREFIX + bearer;

// route guard

export const isSessionStatusLoading = (status: string) => SessionStatus.LOADING === status;

export const isContainRole = (session: Session, role: Role) => session.user.roles.some(r => r === role);

export const redirectIfUnauthenticated = (session: Session | null) => !session && redirect(Path.SIGNIN);

export const redirectIfAuthenticated = (session: Session | null) => session && redirect(Path.HOME);

export const redirectIfNotRole = (session: Session | null, role: Role) => session && !isContainRole(session, role) && redirect(Path.HOME);

// utils

export const parseIntIfNumber = (intValue: string, defaultValue: number) =>
    Number.isInteger(intValue) ? Number.parseInt(intValue) : defaultValue;