import BriefQualityResponse from "@/utils/air-quality/models/briefQualityResponse";

export default interface EnhancedQualityResponse extends BriefQualityResponse {
    pollutants: {
        code: string;
        displayName: string;
        concentration: {
            units: string;
            value: number;
        };
        additionalInfo: {
            sources: string;
            effects: string;
        };
    }[];
    healthRecommendations: {
        generalPopulation: string;
        elderly: string;
        lungDiseasePopulation: string;
        heartDiseasePopulation: string;
        athletes: string;
        pregnantWomen: string;
        children: string;
    };
}
