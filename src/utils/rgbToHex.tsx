export const rgbToHex = (r: number, g: number, b: number): string => {
    if (r > 255 || g > 255 || b > 255) return '#ffffff';
    const code = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + ('000000' + code).slice(-6);
};
