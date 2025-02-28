
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import UrlInput from "@/components/url-input";
import { processUrl, getFilenameFromUrl } from "@/utils/url-processor";
import DownloadCard from "@/components/download-card";
import { useToast } from "@/hooks/use-toast";

interface ProcessedUrl {
  originalUrl: string;
  processedUrl: string | null;
  filename: string;
  isValid: boolean;
  errorMessage?: string;
}

const UrlProcessorForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoResult, setVideoResult] = useState<ProcessedUrl | null>(null);
  const [audioResult, setAudioResult] = useState<ProcessedUrl | null>(null);
  const { toast } = useToast();

  const resetForm = () => {
    setVideoUrl("");
    setAudioUrl("");
    setVideoResult(null);
    setAudioResult(null);
  };

  const validateAndProcess = () => {
    if (!videoUrl && !audioUrl) {
      toast({
        title: "Input Required",
        description: "Please enter at least one URL to process",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Process video URL if provided
    if (videoUrl) {
      const result = processUrl(videoUrl, 'video');
      setVideoResult({
        originalUrl: videoUrl,
        processedUrl: result.valid ? result.url || null : null,
        filename: result.valid && result.url ? getFilenameFromUrl(result.url, 'video') : 'video.mp4',
        isValid: result.valid,
        errorMessage: result.error
      });
      
      if (!result.valid) {
        toast({
          title: "Video URL Processing Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    
    // Process audio URL if provided
    if (audioUrl) {
      const result = processUrl(audioUrl, 'audio');
      setAudioResult({
        originalUrl: audioUrl,
        processedUrl: result.valid ? result.url || null : null,
        filename: result.valid && result.url ? getFilenameFromUrl(result.url, 'audio') : 'audio.mp4',
        isValid: result.valid,
        errorMessage: result.error
      });
      
      if (!result.valid) {
        toast({
          title: "Audio URL Processing Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    
    setIsProcessing(false);
    
    if ((videoUrl && processUrl(videoUrl, 'video').valid) || 
        (audioUrl && processUrl(audioUrl, 'audio').valid)) {
      toast({
        title: "URLs Processed Successfully",
        description: "Your media is ready to download",
      });
    }
  };

  // Add animation triggers for elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container py-12" id="content">
      <Card className="glass overflow-hidden border-0 shadow-lg animate-on-scroll">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Process URLs</h2>
              <p className="text-muted-foreground">
                Enter video and audio URLs to process and download
              </p>
            </div>
            
            <div className="space-y-4">
              <UrlInput
                id="video-url"
                label="Video URL"
                placeholder="Enter video URL containing 'mime=video/mp4'"
                value={videoUrl}
                onChange={setVideoUrl}
                onClear={() => setVideoUrl("")}
                isValid={videoResult?.isValid ?? null}
                errorMessage={videoResult?.errorMessage}
                isDisabled={isProcessing}
              />
              
              <UrlInput
                id="audio-url"
                label="Audio URL"
                placeholder="Enter audio URL containing 'mime=audio/mp4'"
                value={audioUrl}
                onChange={setAudioUrl}
                onClear={() => setAudioUrl("")}
                isValid={audioResult?.isValid ?? null}
                errorMessage={audioResult?.errorMessage}
                isDisabled={isProcessing}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                onClick={validateAndProcess}
                disabled={isProcessing || (!videoUrl && !audioUrl)}
                className={cn(
                  "transition-all duration-300 flex-1",
                  isProcessing && "animate-pulse"
                )}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Process URLs"}
              </Button>
              
              <Button
                variant="outline"
                onClick={resetForm}
                disabled={isProcessing}
                className="flex-none"
              >
                Reset
              </Button>
            </div>
          </div>
          
          {/* Download section appears after processing */}
          {(videoResult?.isValid || audioResult?.isValid) && (
            <div className="mt-8 pt-8 border-t border-border animate-slide-up">
              <h3 className="text-xl font-medium mb-4">Download Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videoResult?.isValid && videoResult.processedUrl && (
                  <DownloadCard
                    type="video"
                    url={videoResult.processedUrl}
                    filename={videoResult.filename}
                    isEnabled={true}
                  />
                )}
                
                {audioResult?.isValid && audioResult.processedUrl && (
                  <DownloadCard
                    type="audio"
                    url={audioResult.processedUrl}
                    filename={audioResult.filename}
                    isEnabled={true}
                  />
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlProcessorForm;
