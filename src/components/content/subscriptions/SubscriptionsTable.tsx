"use client";
import usePersistentSession from "@/utils/auth/usePersistentSession";
import {useEffect, useState} from "react";
import PendingSubscription from "@/utils/subscription/models/pendingSubscription";
import subscriptionService from "@/utils/subscription/subscriptionService";
import Card from "@/components/content/utils/Card";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import { IoMdCheckmark } from "react-icons/io";

export default function SubscriptionsTable() {
    const {session} = usePersistentSession();
    const [subscriptions, setSubscriptions] = useState<PendingSubscription[] | undefined>()

    useEffect(() => {
        (async () => {
            if (!session)
                return null;
            await subscriptionService.pending(session.tokens.accessToken)
                .then(subs => setSubscriptions(subs))
                .catch(err => {
                    console.debug('err', err);
                    setSubscriptions(undefined);
                });
        })();
    }, [session]);

    const handleButtonClick = (username: string) => {
        alert(`Nazwa użytkownika: ${username}`);
    };

    return (
        <Card>
            <CardHeader value="Oczekujące subskrypcje"/>
            <CardBody>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa użytkownika</th>
                        <th>Email</th>
                        <th>Akcja</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subscriptions?.map(sub => (
                        <tr key={sub.subscriptionId}>
                            <td>{sub.subscriptionId}</td>
                            <td>{sub.user.username}</td>
                            <td>{sub.user.email}</td>
                            <td>
                                <button
                                    onClick={() => handleButtonClick(sub.user.username)}
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