import {YOUR_PLAN} from "@/components/content/dashboard/utils/constants";
import PlanLabel, {Subscription} from "@/components/content/dashboard/PlanLabel";
import Card from "@/components/content/utils/Card";
import {useSession} from "next-auth/react";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import {Session} from "next-auth";
import {isContainRole} from "@/utils/methods";
import Role from "@/utils/api/auth/types/role";

export default function PlanCard() {
    const {data: session} = useSession();

    const getPlan = (session: Session): Subscription => isContainRole(session, Role.SUBSCRIBED)
        ? Subscription.PAID : Subscription.FREE;

    return (
        <Card>
            <CardHeader value={YOUR_PLAN}/>
            <CardBody>
                {session && (
                    <PlanLabel plan={getPlan(session)}/>
                )}
            </CardBody>
        </Card>
    );
}