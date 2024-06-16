import NotificationResponse from "@/utils/notification/models/notificationResponse";
import EditNotificationRequest from "@/utils/notification/models/editNotificationRequest";
import CreateNotificationRequest from "@/utils/notification/models/createNotificationRequest";
import axiosApi from "@/utils/interceptor";
import {concatBearer} from "@/utils/helpers";

interface NotificationService {
    get(bearer: string): Promise<{ notifications: NotificationResponse[] }>

    create(bearer: string, createRequest: CreateNotificationRequest): Promise<NotificationResponse>

    edit(bearer: string, notificationId: number, editRequest: EditNotificationRequest): Promise<NotificationResponse>

    delete(bearer: string, notificationId: number): Promise<NotificationResponse>
}

const notificationService: NotificationService = {
    async create(bearer: string, createRequest: CreateNotificationRequest): Promise<NotificationResponse> {
        return await axiosApi.post<NotificationResponse>("/notifications/", createRequest, {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data);
    },
    async delete(bearer: string, notificationId: number): Promise<NotificationResponse> {
        return await axiosApi.delete(`/notifications/${notificationId}`, {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data);
    },
    async edit(bearer: string, notificationId: number, editRequest: EditNotificationRequest): Promise<NotificationResponse> {
        return await axiosApi.post<NotificationResponse>(`/notifications/${notificationId}`, editRequest, {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data);
    },
    async get(bearer: string): Promise<{ notifications: NotificationResponse[] }> {
        return await axiosApi.get<{ notifications: NotificationResponse[] }>("/nofications/", {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data);
    }
}

export default notificationService;