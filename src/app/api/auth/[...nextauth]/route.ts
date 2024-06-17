import authConfig from "@/utils/auth/authConfig";
import NextAuth from "next-auth";

const auth = NextAuth(authConfig);

export {auth as GET, auth as POST};