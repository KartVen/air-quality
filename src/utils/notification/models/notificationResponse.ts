import CompareStrategy from "@/utils/notification/models/compareStrategy";
import {Address} from "node:cluster";

export default interface NotificationResponse {
    id: number;
    userId: number;
    indexCode: string;
    indexValue: number;
    compareStrategy: CompareStrategy;
    address: Address;
};