
/**
 * Validates and processes the URL for video or audio content
 */
export const processUrl = (url: string, type: 'video' | 'audio'): { valid: boolean; url?: string; error?: string } => {
  try {
    // Create a URL object to work with
    const urlObj = new URL(url);
    
    // Check for mime type in the URL
    const expectedMime = type === 'video' ? 'mime=video/mp4' : 'mime=audio/mp4';
    if (!url.includes(expectedMime)) {
      return { 
        valid: false, 
        error: `Invalid ${type} URL. URL must contain '${expectedMime}'.`
      };
    }
    
    // Get the search parameters
    const searchParams = urlObj.searchParams;
    
    // Clone to avoid mutating original
    const newParams = new URLSearchParams(searchParams.toString());
    
    // Remove 'range' parameter if it exists
    if (newParams.has('range')) {
      newParams.delete('range');
    } else {
      // Handle case where range might be part of a different format
      const searchStr = newParams.toString();
      const rangeRegex = /(&|^)range=[^&]+(&|$)/;
      const match = searchStr.match(rangeRegex);
      
      if (match) {
        const newSearch = searchStr.replace(rangeRegex, (match[0].endsWith('&') ? '&' : ''));
        // Reset and rebuild params
        newParams.forEach((_, key) => {
          newParams.delete(key);
        });
        
        newSearch.split('&').forEach(param => {
          if (param) {
            const [key, value] = param.split('=');
            if (key && value) newParams.set(key, value);
          }
        });
      }
    }
    
    // Find and remove the last parameter
    const paramsArray = Array.from(newParams.entries());
    if (paramsArray.length > 0) {
      const lastParam = paramsArray[paramsArray.length - 1][0];
      newParams.delete(lastParam);
    }
    
    // Rebuild the URL
    urlObj.search = newParams.toString();
    
    return {
      valid: true,
      url: urlObj.toString()
    };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid URL format: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

/**
 * Extracts filename from the processed URL path
 */
export const getFilenameFromUrl = (url: string, type: 'video' | 'audio'): string => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const filename = pathParts[pathParts.length - 1] || `${type}.mp4`;
    return filename.endsWith('.mp4') ? filename : `${filename}.mp4`;
  } catch {
    return `${type}.mp4`;
  }
};
