import NotificationResponse from "@/utils/api/notification/types/notificationResponse";
import EditNotificationRequest from "@/utils/api/notification/types/editNotificationRequest";
import CreateNotificationRequest from "@/utils/api/notification/types/createNotificationRequest";
import axiosApi from "@/utils/api/axiosApi";
import ApiService from "@/utils/api/apiService";
import {Session} from "next-auth";

interface NotificationEndpoints {
    get(session: Session): Promise<NotificationResponse[]>;

    create(session: Session, createRequest: CreateNotificationRequest): Promise<NotificationResponse>;

    edit(session: Session, notificationId: number, editRequest: EditNotificationRequest): Promise<NotificationResponse>;

    delete(session: Session, notificationId: number): Promise<NotificationResponse>;
}

class NotificationService extends ApiService implements NotificationEndpoints {
    private url = "/notifications/";

    async get(session: Session): Promise<NotificationResponse[]> {
        return await axiosApi.get<{ notifications: NotificationResponse[] }>(this.url, this.withAuthorization(session))
            .then(res => res.data.notifications);
    }

    async create(session: Session, createRequest: CreateNotificationRequest): Promise<NotificationResponse> {
        return await axiosApi.post<NotificationResponse>(this.url, createRequest, this.withAuthorization(session))
            .then(res => res.data);
    }

    async edit(session: Session, notificationId: number, editRequest: EditNotificationRequest): Promise<NotificationResponse> {
        return await axiosApi.post<NotificationResponse>(`${this.url}${notificationId}`, editRequest, this.withAuthorization(session))
            .then(res => res.data);
    }

    async delete(session: Session, notificationId: number): Promise<NotificationResponse> {
        return await axiosApi.delete(`${this.url}${notificationId}`, this.withAuthorization(session)).then(res => res.data);
    }
}

const notificationService = new NotificationService();
export default notificationService;
