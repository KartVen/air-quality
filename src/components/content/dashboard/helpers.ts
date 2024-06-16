export const capitalizeFirstLetter = (sentence: string): string => {
    if (!sentence) return sentence;
    return sentence.replace(/^\w/, (match) => match.toUpperCase());
}