import Layout from "@/components/layout/Layout";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default function SubscriptionPage() {
    const session = getServerSession();

    if (!session) redirect('/');

    return (
        <Layout pageTitle="Subskrypcje">
            <></>
        </Layout>
    );
}