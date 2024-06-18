"use client";
import AuthPageContent from "@/components/auth/AuthPageContent";
import SignInForm from "@/components/auth/SignInForm";
import SignChanger from "@/components/auth/SignChanger";
import RightBlock from "@/components/auth/RightBlock";
import {SIGN_IN_INFO, SIGN_IN_LABEL} from "@/components/auth/utils/contants";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function SignInPage() {
    const {data: session} = useSession();

    if (session) redirect("/");

    return <AuthPageContent>
        <RightBlock label={SIGN_IN_LABEL} info={SIGN_IN_INFO}>
            <SignInForm/>
            <SignChanger label="Nie masz konta?" newHref="/signup" linkLabel="Założ konto"/>
        </RightBlock>
    </AuthPageContent>;
}