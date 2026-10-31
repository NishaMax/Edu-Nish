// ============================================
// EduNish — Google Drive Direct Link Converter
// Converts standard Drive share links into instant
// mobile direct download URLs (bypassing heavy web preview)
// ============================================

export interface DriveConversionResult {
  isValid: boolean;
  fileId: string | null;
  directUrl: string | null;
  previewUrl: string | null;
  error?: string;
}

/**
 * Extracts the Google Drive File ID from various URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://drive.google.com/uc?export=download&id=FILE_ID
 * - Plain FILE_ID (alphanumeric, dashes, underscores, length 25-45)
 */
export function extractDriveFileId(inputUrl: string): string | null {
  if (!inputUrl) return null;
  const trimmed = inputUrl.trim();

  // Format 1: /file/d/FILE_ID/
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return matchFileD[1];
  }

  // Format 2: ?id=FILE_ID or &id=FILE_ID
  const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) {
    return matchIdParam[1];
  }

  // Format 3: Raw File ID (usually 28 to 44 characters long)
  const matchRawId = trimmed.match(/^[a-zA-Z0-9_-]{20,50}$/);
  if (matchRawId) {
    return matchRawId[0];
  }

  return null;
}

/**
 * Converts any Google Drive share URL into an instant direct download URL
 */
export function toDirectDownloadLink(shareUrl: string): DriveConversionResult {
  const fileId = extractDriveFileId(shareUrl);

  if (!fileId) {
    return {
      isValid: false,
      fileId: null,
      directUrl: null,
      previewUrl: null,
      error:
        "Invalid Google Drive link. Please use a link like: https://drive.google.com/file/d/.../view",
    };
  }

  // Direct download link pattern that forces phone browser to save the file
  const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const previewUrl = `https://drive.google.com/file/d/${fileId}/view`;

  return {
    isValid: true,
    fileId,
    directUrl,
    previewUrl,
  };
}

/**
 * Helper to validate if a string is a valid Google Drive URL
 */
export function isValidDriveUrl(url: string): boolean {
  return extractDriveFileId(url) !== null;
}
