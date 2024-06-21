import CompareStrategy from "@/utils/api/notification/types/compareStrategy";
import Address from "@/utils/api/notification/types/address";

export default interface NotificationResponse {
    id: number;
    userId: number;
    indexCode: string;
    indexValue: number;
    compareStrategy: CompareStrategy;
    address: Address;
};