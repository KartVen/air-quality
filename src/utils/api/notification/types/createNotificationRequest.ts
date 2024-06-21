import Address from "@/utils/api/notification/types/address";
import CompareStrategy from "@/utils/api/notification/types/compareStrategy";

export default interface CreateNotificationRequest {
    indexCode: string;
    indexValue: number;
    compareStrategy: CompareStrategy;
    address: Address;
};