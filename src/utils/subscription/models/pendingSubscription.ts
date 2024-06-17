import BasicUserInfo from "@/utils/subscription/models/basicUserInfo";

export default interface PendingSubscription {
    subscriptionId: number;
    user: BasicUserInfo;
    createdAt: string;
}