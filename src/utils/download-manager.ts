
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
    
    // Fetch the file
    const response = await fetch(url);
    
    if (!response.ok) {
      if (onError) onError(`Failed to download: ${response.statusText}`);
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
      }
    }
    
    // Combine all chunks into a single Uint8Array
    const allChunks = new Uint8Array(receivedBytes);
    let position = 0;
    
    for (const chunk of chunks) {
      allChunks.set(chunk, position);
      position += chunk.length;
    }
    
    // Create a blob from the data
    const blob = new Blob([allChunks], { type: 'video/mp4' });
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
    if (onError) onError(`Download failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
};
