import AQIndex from "@/utils/air-quality/models/aQIndex";

export default interface BriefQualityResponse {
    dateTime: string;
    indexes: AQIndex[];
}
