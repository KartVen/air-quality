import Layout from "@/components/layout/Layout";
import SubscriptionsTable from "@/components/content/subscriptions/SubscriptionsTable";

export default function SubscriptionPage() {
    return (
        <Layout pageTitle="Subskrypcje">
            <div>
                <SubscriptionsTable/>
            </div>
        </Layout>
    );
}