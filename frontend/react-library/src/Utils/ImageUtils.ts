/**
 * Utility function to format image source for proper display
 * Handles base64 strings, URLs, and adds proper data URI prefix if needed
 */
export const formatImageSrc = (img: string | undefined): string | undefined => {
    if (!img) {
        return undefined;
    }

    // If it already has data: prefix or starts with http/https, return as is
    if (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://')) {
        return img;
    }

    // If it looks like base64 data (starts with common base64 characters), add proper prefix
    // Base64 for images typically starts with specific characters
    if (img.match(/^[A-Za-z0-9+/]/)) {
        return `data:image/png;base64,${img}`;
    }

    return img;
};
