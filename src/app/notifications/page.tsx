"use client";
import {useSession} from "next-auth/react";
import Layout from "@/components/layout/Layout";
import NotificationList from "@/components/content/notifications/NotificationList";
import {isSessionStatusLoading, redirectIfUnauthenticated} from "@/utils/methods";
import NotificationTable from "@/components/content/notifications/NotificationTable";
import LoadingPage from "@/components/layout/LoadingPage";
import React, {useEffect} from "react";

export default function NotificationPage() {
    const {data: session, status} = useSession();

    useEffect(() => {}, [status]);

    if (isSessionStatusLoading(status))
        return <LoadingPage/>;
    redirectIfUnauthenticated(session);

    return (
        <Layout pageTitle="Powiadomienia">
            <div>
                <NotificationTable/>
            </div>
            <div className="flex flex-col gap-card-between">
                <NotificationList/>
            </div>
        </Layout>
    );
}