import axiosApi from "@/utils/api/axiosApi";
import {Session} from "next-auth";
import ApiService from "@/utils/api/apiService";
import PendingSubscription from "@/utils/api/subscription/models/pendingSubscription";
import SubscriptionStatus from "@/utils/api/subscription/models/subscriptionStatus";

interface UserSubscriptionEndpoints {
    request(session: Session, desc: String): Promise<void>;

    status(session: Session): Promise<SubscriptionStatus>;
}

interface AdminSubscriptionEndpoints {
    pending(session: Session): Promise<PendingSubscription[]>;

    approve(session: Session, subscriptionId: number): Promise<void>;
}

interface SubscriptionEndpoints extends UserSubscriptionEndpoints, AdminSubscriptionEndpoints {
}

class SubscriptionService extends ApiService implements SubscriptionEndpoints {
    async request(session: Session, desc: String): Promise<void> {
        console.log(desc, {description: desc});
        return await axiosApi.post("/subscriptions/", {description: desc}, this.withAuthorization(session));
    }

    async status(session: Session): Promise<SubscriptionStatus> {
        return await axiosApi.get<{ status: SubscriptionStatus }>("/subscriptions/me/", this.withAuthorization(session))
            .then(res => res.data.status);
    }

    async approve(session: Session, subscriptionId: number): Promise<void> {
        return await axiosApi.post(`/admin/subscriptions/${subscriptionId}/`, null, this.withAuthorization(session));
    }

    async pending(session: Session): Promise<PendingSubscription[]> {
        return await axiosApi.get<{
            subscriptions: PendingSubscription[]
        }>("/admin/subscriptions/pending/", this.withAuthorization(session))
            .then(res => res.data.subscriptions);
    }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
