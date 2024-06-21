import BriefQualityResponse from "@/utils/air-quality/types/briefQualityResponse";
import Pollutant from "@/utils/air-quality/types/pollutant";
import HealthRecommendation from "@/utils/air-quality/types/healthRecommendation";

export default interface EnhancedQualityResponse extends BriefQualityResponse {
    pollutants?: Pollutant[];
    healthRecommendations?: HealthRecommendation;
}
