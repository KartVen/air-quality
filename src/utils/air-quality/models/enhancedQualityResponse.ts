import BriefQualityResponse from "@/utils/air-quality/models/briefQualityResponse";
import Pollutant from "@/utils/air-quality/models/pollutant";
import HealthRecommendation from "@/utils/air-quality/models/healthRecommendation";

export default interface EnhancedQualityResponse extends BriefQualityResponse {
    pollutants?: Pollutant[];
    healthRecommendations?: HealthRecommendation;
}
