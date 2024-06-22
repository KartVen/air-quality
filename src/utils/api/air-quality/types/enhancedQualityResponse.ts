import BriefQualityResponse from "@/utils/api/air-quality/types/briefQualityResponse";
import Pollutant from "@/utils/api/air-quality/types/pollutant";
import HealthRecommendation from "@/utils/api/air-quality/types/healthRecommendation";

export default interface EnhancedQualityResponse extends BriefQualityResponse {
    pollutants?: Pollutant[];
    healthRecommendations?: HealthRecommendation;
}
