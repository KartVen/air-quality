"use client";
import AuthPageContent from "@/components/auth/AuthPageContent";
import SignInForm from "@/components/auth/SignInForm";
import SignChanger from "@/components/auth/SignChanger";
import RightBlock from "@/components/auth/RightBlock";
import {SIGN_IN_INFO, SIGN_IN_LABEL} from "@/components/auth/utils/contants";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Path from "@/utils/path";
import {isSessionStatusLoading, redirectIfAuthenticated} from "@/utils/methods";
import LoadingPage from "@/components/layout/LoadingPage";
import React from "react";

export default function SignInPage() {
    const {data: session, status} = useSession();

    if (isSessionStatusLoading(status))
        return <LoadingPage/>;
    redirectIfAuthenticated(session);

    return <AuthPageContent>
        <RightBlock label={SIGN_IN_LABEL} info={SIGN_IN_INFO}>
            <SignInForm/>
            <div className="flex justify-between">
                <SignChanger newHref="/signup" linkLabel="Zapomniałeś hasła?" noStrong/>
                <SignChanger newHref="/signup" linkLabel="Założ konto"/>
            </div>
        </RightBlock>
    </AuthPageContent>;
}