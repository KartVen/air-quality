import Address from "@/utils/api/notification/types/address";
import CompareStrategy from "@/utils/api/notification/types/compareStrategy";

export default interface EditNotificationRequest {
    indexCode: string;
    indexValue: number;
    compareStrategy: CompareStrategy;
    address: Address;
}