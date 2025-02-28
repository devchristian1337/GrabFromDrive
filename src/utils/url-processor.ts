/**
 * Validates and processes the URL for video or audio content
 */
export const processUrl = (
  url: string,
  type: "video" | "audio"
): { valid: boolean; url?: string; error?: string } => {
  try {
    // Pre-process the URL string
    // 1. Remove the range parameter pattern from the URL if it exists
    let processedUrlString = url.replace(/range=\d+-\d+&/g, "");

    // 2. Remove the last 10 characters (until the 2nd '=' included)
    if (processedUrlString.length > 10) {
      const lastEqualIndex = processedUrlString.lastIndexOf("=");
      if (lastEqualIndex !== -1) {
        const secondLastEqualIndex = processedUrlString.lastIndexOf(
          "=",
          lastEqualIndex - 1
        );
        if (
          secondLastEqualIndex !== -1 &&
          processedUrlString.length - secondLastEqualIndex >= 10
        ) {
          processedUrlString = processedUrlString.substring(
            0,
            processedUrlString.length - 10
          );
        }
      }
    }

    // Create a URL object to work with
    const urlObj = new URL(processedUrlString);

    // Check for mime type in the URL
    const expectedMime = type === "video" ? "mime=video/mp4" : "mime=audio/mp4";
    if (!processedUrlString.includes(expectedMime)) {
      return {
        valid: false,
        error: `Invalid ${type} URL. URL must contain '${expectedMime}'.`,
      };
    }

    // Get the search parameters
    const searchParams = urlObj.searchParams;

    // Clone to avoid mutating original
    const newParams = new URLSearchParams(searchParams.toString());

    // Remove 'range' parameter if it exists (as a backup to the string replacement)
    if (newParams.has("range")) {
      newParams.delete("range");
    }

    // Rebuild the URL
    const finalProcessedUrl = urlObj.origin + urlObj.pathname;

    // Add the parameters if any exist
    const paramString = newParams.toString();
    const finalUrl = paramString
      ? finalProcessedUrl + "?" + paramString
      : finalProcessedUrl;

    return {
      valid: true,
      url: finalUrl,
    };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid URL format: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};

/**
 * Extracts filename from the processed URL path
 */
export const getFilenameFromUrl = (
  url: string,
  type: "video" | "audio"
): string => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const filename = pathParts[pathParts.length - 1] || `${type}.mp4`;
    return filename.endsWith(".mp4") ? filename : `${filename}.mp4`;
  } catch {
    return `${type}.mp4`;
  }
};
