export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('pl-PL', options);
};

export const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleTimeString('pl-PL', options);
};