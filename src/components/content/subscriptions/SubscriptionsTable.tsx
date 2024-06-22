"use client";
import {useEffect, useState} from "react";
import PendingSubscription from "@/utils/api/subscription/models/pendingSubscription";
import subscriptionService from "@/utils/api/subscription/subscriptionService";
import Card from "@/components/content/utils/Card";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import {IoMdCheckmark} from "react-icons/io";
import {useSession} from "next-auth/react";

export default function SubscriptionsTable() {
    const {data: session} = useSession();
    const [subscriptions, setSubscriptions] = useState<PendingSubscription[]>()

    useEffect(() => {
        (async () => {
            if (!session)
                return null;
            await subscriptionService.pending(session)
                .then(subs => setSubscriptions(subs))
                .catch(() => setSubscriptions([]));
        })();
    }, [session]);

    const handleApprove = (subscriptionId: number) => {
        session && subscriptions && subscriptionService.approve(session, subscriptionId)
            .then(() => {
                const filtered = subscriptions.filter(sub => sub.subscriptionId !== subscriptionId)
                setSubscriptions(filtered);
            })
    };

    return session && (
        <Card>
            <CardHeader value="Oczekujące subskrypcje"/>
            <CardBody>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="border-b">
                    <tr className="text-gray-400 italic">
                        <th className="w-[30%]">ID</th>
                        <th className="w-[30%]">Nazwa użytkownika</th>
                        <th className="w-[30%]">Email</th>
                        <th className="w-[10%] pb-1"></th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {subscriptions && subscriptions.map(({subscriptionId, user: {username, email}}) => (
                        <tr key={subscriptionId}>
                            <td>{subscriptionId}</td>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td className="py-1.5">
                                <button
                                    onClick={() => handleApprove(subscriptionId)}
                                    className="bg-green-700 hover:bg-green-900 text-white px-3 py-1"
                                >
                                    <IoMdCheckmark />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}