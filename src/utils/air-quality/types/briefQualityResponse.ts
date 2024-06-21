import AQIndex from "@/utils/air-quality/types/aQIndex";

export default interface BriefQualityResponse {
    dateTime: string;
    indexes: AQIndex[];
}
