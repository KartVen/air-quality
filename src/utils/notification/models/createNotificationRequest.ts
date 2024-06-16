import Address from "@/utils/notification/models/address";
import CompareStrategy from "@/utils/notification/models/compareStrategy";

export default interface CreateNotificationRequest {
    indexCode: string;
    indexValue: number;
    compareStrategy: CompareStrategy;
    address: Address;
};