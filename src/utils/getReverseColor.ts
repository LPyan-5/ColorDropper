export const getReverseColor = (color: string): string => {
    const [r, g, b] = [
        parseInt(color.substring(1, 3), 16),
        parseInt(color.substring(3, 5), 16),
        parseInt(color.substring(5, 7), 16),
    ];
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 186 ? '#D0D0D0' : '#FFFFFF';
};
