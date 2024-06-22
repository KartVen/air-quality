"use client";
import {useSession} from "next-auth/react";
import Layout from "@/components/layout/Layout";
import UsernameChangeForm from "@/components/content/settings/UsernameChangeForm";
import PasswordChangeForm from "@/components/content/settings/PasswordChangeForm";
import Card from "@/components/content/utils/Card";
import {isSessionStatusLoading, redirectIfUnauthenticated} from "@/utils/methods";
import LoadingPage from "@/components/layout/LoadingPage";
import React, {useEffect} from "react";
import VerifyAccountEmail from "@/components/content/settings/VerifyAccountEmail";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";

export default function SettingsPage() {
    const {data: session, status} = useSession();

    useEffect(() => {
    }, [status]);

    if (isSessionStatusLoading(status))
        return <LoadingPage/>;
    redirectIfUnauthenticated(session);

    return (
        <Layout pageTitle="Ustawienia">
            <div className="grid grid-cols-4 gap-card-between">
                {session && !session.user.isVerified && <Card>
                    <CardHeader value="Weryfikacja konta"/>
                    <CardBody><VerifyAccountEmail/></CardBody>
                </Card>}
            </div>
            <div className="grid grid-cols-4 gap-card-between">
                <Card>
                    <CardHeader value="Zmiana nazwy użytkownika"/>
                    <CardBody><UsernameChangeForm/></CardBody>
                </Card>
                <Card className="col-span-2">
                    <CardHeader value="Zmiana hasła"/>
                    <CardBody><PasswordChangeForm/></CardBody>
                </Card>
            </div>
        </Layout>
    );
}