import axiosApi from "@/utils/interceptor";
import {concatBearer} from "@/utils/helpers";
import PendingSubscription from "@/utils/subscription/models/pendingSubscription";
import SubscriptionStatus from "@/utils/subscription/models/subscriptionStatus";

interface UserSubscriptionService {
    request(bearer: string): Promise<void>;

    status(bearer: string): Promise<SubscriptionStatus>;
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
        }).then(res => {console.log(res)})
            .catch(err => console.log(err));
    },

    async status(bearer: string): Promise<SubscriptionStatus> {
        return await axiosApi.get<{status: SubscriptionStatus}>("/subscriptions/me/", {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data.status);
    },

    async approve(bearer: string, subscriptionId: number): Promise<void> {
        return await axiosApi.post(`/admin/subscriptions/${subscriptionId}/`, null, {
            headers: {Authorization: concatBearer(bearer)}
        });
    },

    async pending(bearer: string): Promise<PendingSubscription[]> {
        return await axiosApi.get<{ subscriptions: PendingSubscription[] }>("/admin/subscriptions/pending/", {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data.subscriptions)
    }
}

export default subscriptionService;