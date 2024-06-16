import {YOUR_PLAN} from "@/components/content/dashboard/utils/constants";
import PlanLabel, {Subscription} from "@/components/content/dashboard/PlanLabel";
import Card from "@/components/content/dashboard/Card";

export default function PlanCard() {
    return (
        <Card>
            <div className="font-semibold text-center">
                <span>{YOUR_PLAN}</span>
            </div>
            <div className="pt-5 text-center">
                <PlanLabel plan={Subscription.FREE}/>
            </div>
        </Card>
    );
}