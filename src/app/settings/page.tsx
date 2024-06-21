"use client";
import {useSession} from "next-auth/react";
import Layout from "@/components/layout/Layout";
import UsernameChangeForm from "@/components/content/settings/UsernameChangeForm";
import Card from "@/components/content/utils/Card";
import {isSessionStatusLoading, redirectIfUnauthenticated} from "@/utils/methods";
import LoadingPage from "@/components/layout/LoadingPage";
import React from "react";

export default function SettingsPage() {
    const {data: session, status} = useSession();

    if (isSessionStatusLoading(status))
        return <LoadingPage/>;
    redirectIfUnauthenticated(session);

    return (
        <Layout pageTitle="Ustawienia">
            <div className="grid grid-cols-4 gap-card-between">
                <Card><UsernameChangeForm/></Card>
            </div>
        </Layout>
    );
}