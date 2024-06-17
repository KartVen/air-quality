export const mapUnit = (unit: string) => {
    switch (unit) {
        case "PARTS_PER_BILLION":
            return "ppb";
        case "MICROGRAMS_PER_CUBIC_METER":
            return "µg/m³";
        default:
            return "";
    }
};