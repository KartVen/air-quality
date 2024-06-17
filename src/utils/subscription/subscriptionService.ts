import axiosApi from "@/utils/interceptor";
import {concatBearer} from "@/utils/helpers";
import PendingSubscription from "@/utils/subscription/models/pendingSubscription";

interface UserSubscriptionService {
    request(bearer: string): Promise<void>;

    status(bearer: string): Promise<void>;
}

interface AdminSubscriptionService {
    pending(bearer: string): Promise<PendingSubscription[]>;

    approve(bearer: string, subscriptionId: number): Promise<void>;
}

interface SubscriptionService
    extends UserSubscriptionService,
        AdminSubscriptionService {
}

const subscriptionService: SubscriptionService = {
    async request(bearer: string): Promise<void> {
        return await axiosApi.post("/subscriptions/", null, {
            headers: {Authorization: concatBearer(bearer)}
        });
    },

    async status(bearer: string): Promise<void> {
        return await axiosApi.get("/subscriptions/me", {
            headers: {Authorization: concatBearer(bearer)}
        });
    },

    async approve(bearer: string, subscriptionId: number): Promise<void> {
        return await axiosApi.post(`/subscriptions/${subscriptionId}/`, null, {
            headers: {Authorization: concatBearer(bearer)}
        });
    },

    async pending(bearer: string): Promise<PendingSubscription[]> {
        return await axiosApi.get<{ subscriptions: PendingSubscription[] }>("/subscriptions/pending/", {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data.subscriptions)
    }
}

export default subscriptionService;