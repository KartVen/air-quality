"use client";
import AuthPageContent from "@/components/auth/AuthPageContent";
import SignUpForm from "@/components/auth/SignUpForm";
import SignChanger from "@/components/auth/SignChanger";
import RightBlock from "@/components/auth/RightBlock";
import {SIGN_UP_INFO, SIGN_UP_LABEL} from "@/components/auth/utils/contants";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Path from "@/utils/path";
import {isSessionStatusLoading, redirectIfAuthenticated} from "@/utils/methods";
import LoadingPage from "@/components/layout/LoadingPage";
import React from "react";

export default function SignUpPage() {
    const {data: session, status} = useSession();

    if (isSessionStatusLoading(status))
        return <LoadingPage/>;
    redirectIfAuthenticated(session);

    return <AuthPageContent>
        <RightBlock label={SIGN_UP_LABEL} info={SIGN_UP_INFO}>
            <SignUpForm/>
            <SignChanger label="Masz konto?" newHref="/signin" linkLabel="Zaloguj się"/>
        </RightBlock>
    </AuthPageContent>;
}