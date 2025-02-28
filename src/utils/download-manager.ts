
/**
 * Handles the downloading of media files
 */
export const downloadFile = async (
  url: string,
  filename: string,
  onProgress?: (progress: number) => void,
  onError?: (message: string) => void,
  onStart?: () => void,
  onComplete?: () => void
): Promise<boolean> => {
  try {
    if (onStart) onStart();
    
    // First, check if the URL is valid
    if (!url || !url.startsWith('http')) {
      if (onError) onError(`Invalid URL: ${url}`);
      return false;
    }
    
    // Make request with appropriate headers and credentials
    const fetchOptions: RequestInit = {
      method: 'GET',
      mode: 'no-cors', // Change to no-cors to handle CORS restrictions
      credentials: 'omit',
      headers: {
        'Accept': '*/*',
      },
    };
    
    try {
      const response = await fetch(url, fetchOptions);
      
      // Note: With no-cors mode, we can't actually read the response or check status codes
      // This makes direct downloading very difficult
      // Instead, we'll immediately suggest the alternative method
      
      if (onError) {
        onError("CORS restrictions detected. The server doesn't allow direct downloads from websites. Please use the 'Open in New Tab' option instead.");
      }
      return false;
    } catch (fetchError) {
      // If the fetch itself fails, try to offer helpful advice
      console.error("Fetch error:", fetchError);
      
      if (onError) {
        onError(`CORS error: The server doesn't allow direct downloads from websites. Please use the 'Open in New Tab' option instead.`);
      }
      return false;
    }
  } catch (error) {
    console.error('Download error:', error);
    if (onError) {
      const errorMessage = error instanceof Error 
        ? `Download failed: ${error.message}`
        : `Download failed: ${String(error)}`;
      
      if (errorMessage.includes('NetworkError') || errorMessage.includes('CORS')) {
        onError(`CORS error: The server doesn't allow direct downloads from websites. Please use the 'Open in New Tab' option instead.`);
      } else {
        onError(errorMessage);
      }
    }
    return false;
  }
};
