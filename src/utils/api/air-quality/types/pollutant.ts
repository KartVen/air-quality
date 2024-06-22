export default interface Pollutant {
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
}