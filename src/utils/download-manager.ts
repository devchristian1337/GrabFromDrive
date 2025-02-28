
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
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': '*/*',
      },
    };
    
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      if (onError) onError(`Server error: ${response.status} ${response.statusText}`);
      return false;
    }
    
    // Get file size for progress calculation
    const contentLength = response.headers.get('content-length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
    
    // Create a reader from the response body
    const reader = response.body?.getReader();
    
    if (!reader) {
      if (onError) onError('Failed to initialize download stream');
      return false;
    }
    
    // Show 0% progress immediately
    if (onProgress) onProgress(0);
    
    // Read the data chunks
    let receivedBytes = 0;
    const chunks: Uint8Array[] = [];
    
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      receivedBytes += value.length;
      
      // Report progress
      if (onProgress && totalBytes > 0) {
        onProgress(Math.min(receivedBytes / totalBytes, 1));
      } else if (onProgress) {
        // If we don't know the total size, use a pulsing progress indicator by cycling between 0.1 and 0.9
        const pulsingProgress = 0.1 + (0.8 * (Math.sin(Date.now() / 1000) + 1) / 2);
        onProgress(pulsingProgress);
      }
    }
    
    // If we didn't receive any data, report an error
    if (receivedBytes === 0) {
      if (onError) onError('No data received from server');
      return false;
    }
    
    // Combine all chunks into a single Uint8Array
    const allChunks = new Uint8Array(receivedBytes);
    let position = 0;
    
    for (const chunk of chunks) {
      allChunks.set(chunk, position);
      position += chunk.length;
    }
    
    // Create a blob from the data with the correct MIME type
    let mimeType = 'application/octet-stream';
    if (filename.endsWith('.mp4')) {
      mimeType = 'video/mp4';
    } else if (filename.endsWith('.mp3')) {
      mimeType = 'audio/mp3';
    }
    
    const blob = new Blob([allChunks], { type: mimeType });
    const url_object = URL.createObjectURL(blob);
    
    // Create a download link and trigger download
    const a = document.createElement('a');
    a.href = url_object;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url_object);
    }, 100);
    
    if (onComplete) onComplete();
    return true;
  } catch (error) {
    console.error('Download error:', error);
    if (onError) {
      const errorMessage = error instanceof Error 
        ? `Download failed: ${error.message}`
        : `Download failed: ${String(error)}`;
      
      if (errorMessage.includes('NetworkError') || errorMessage.includes('CORS')) {
        onError(`CORS error: The server doesn't allow direct downloads from websites. Try copying the URL and using a download manager app instead.`);
      } else {
        onError(errorMessage);
      }
    }
    return false;
  }
};
