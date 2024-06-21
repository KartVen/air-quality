"use client";
import Layout from "@/components/layout/Layout";
import SubscriptionsTable from "@/components/content/subscriptions/SubscriptionsTable";
import {useSession} from "next-auth/react";
import {isSessionStatusLoading, redirectIfNotRole, redirectIfUnauthenticated} from "@/utils/methods";
import Role from "@/utils/api/auth/types/role";
import LoadingPage from "@/components/layout/LoadingPage";
import React from "react";

export default function SubscriptionPage() {
    const {data: session, status} = useSession();

    if (isSessionStatusLoading(status))
        return <LoadingPage/>;
    redirectIfUnauthenticated(session);
    redirectIfNotRole(session, Role.ADMIN);

    return (
        <Layout pageTitle="Subskrypcje">
            <SubscriptionsTable/>
        </Layout>
    );
}