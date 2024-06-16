export enum Subscription {
    FREE = "DARMOWY",
    PAID = "PŁATNY"
}

interface PlanLabelProps {
    plan: Subscription;
}

export default function PlanLabel({plan}: PlanLabelProps) {
    const planColor = plan === Subscription.PAID ? "bg-yellow-600" : "bg-green-600";
    const textColor = plan === Subscription.PAID ? "text-yellow-600" : "text-green-600";

    return (
        <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full ${planColor}`}></div>
            <span className={`pt-2 font-semibold ${textColor}`}>{plan}</span>
        </div>
    );
}

