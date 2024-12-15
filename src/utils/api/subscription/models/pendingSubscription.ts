import BasicUserInfo from "@/utils/api/subscription/models/basicUserInfo";

export default interface PendingSubscription {
    subscriptionId: number;
    user: BasicUserInfo;
    createdAt: string;
    description: string;
}