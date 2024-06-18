"use client";
import Layout from "@/components/layout/Layout";
import SubscriptionsTable from "@/components/content/subscriptions/SubscriptionsTable";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {isContainRole, Role} from "@/utils/auth/utils/helpers";

export default function SubscriptionPage() {
    const {data: session} = useSession();

    if (!session) redirect("/signin");

    if (session && !isContainRole(session, Role.ADMIN)) redirect("/");

    if (session)
        return (
            <Layout pageTitle="Subskrypcje">
                <SubscriptionsTable/>
            </Layout>
        );

    return null;
}