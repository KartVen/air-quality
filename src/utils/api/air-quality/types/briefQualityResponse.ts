import AQIndex from "@/utils/api/air-quality/types/aQIndex";

export default interface BriefQualityResponse {
    dateTime: string;
    indexes: AQIndex[];
}
