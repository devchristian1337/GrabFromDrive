import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  RefreshCw,
  ExternalLink,
  FileVideo,
  FileAudio,
  RefreshCcw,
  ArrowDownToLine,
  AlertTriangle,
} from "lucide-react";
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
      const result = processUrl(videoUrl, "video");
      setVideoResult({
        originalUrl: videoUrl,
        processedUrl: result.valid ? result.url || null : null,
        filename:
          result.valid && result.url
            ? getFilenameFromUrl(result.url, "video")
            : "video.mp4",
        isValid: result.valid,
        errorMessage: result.error,
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
      const result = processUrl(audioUrl, "audio");
      setAudioResult({
        originalUrl: audioUrl,
        processedUrl: result.valid ? result.url || null : null,
        filename:
          result.valid && result.url
            ? getFilenameFromUrl(result.url, "audio")
            : "audio.mp4",
        isValid: result.valid,
        errorMessage: result.error,
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

    if (
      (videoUrl && processUrl(videoUrl, "video").valid) ||
      (audioUrl && processUrl(audioUrl, "audio").valid)
    ) {
      toast({
        title: "URLs Processed Successfully",
        description: "Your media is ready to download",
      });
    }
  };

  // Add animation triggers for elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container py-12" id="content">
      <div className="max-w-5xl mx-auto">
        <Card className="glass overflow-hidden border border-primary/10 shadow-xl animate-on-scroll transition-all duration-300 hover:shadow-primary/5 dark:bg-background/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 to-background p-6 md:p-8 border-b border-primary/10">
            <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <ArrowDownToLine className="h-5 w-5" />
              </div>
              Media URL Processor
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Enter video and audio URLs to process and download content from
              Google Drive
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-6">
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
                      <FileVideo className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium">Video URL</h3>
                  </div>
                  <UrlInput
                    id="video-url"
                    label="Video URL"
                    placeholder="Enter video URL from Google Drive"
                    value={videoUrl}
                    onChange={setVideoUrl}
                    onClear={() => setVideoUrl("")}
                    isValid={videoResult?.isValid ?? null}
                    errorMessage={videoResult?.errorMessage}
                    isDisabled={isProcessing}
                  />
                </div>

                <div className="space-y-4 transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-500">
                      <FileAudio className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium">Audio URL</h3>
                  </div>
                  <UrlInput
                    id="audio-url"
                    label="Audio URL"
                    placeholder="Enter audio URL from Google Drive"
                    value={audioUrl}
                    onChange={setAudioUrl}
                    onClear={() => setAudioUrl("")}
                    isValid={audioResult?.isValid ?? null}
                    errorMessage={audioResult?.errorMessage}
                    isDisabled={isProcessing}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={validateAndProcess}
                  disabled={isProcessing || (!videoUrl && !audioUrl)}
                  className={cn(
                    "transition-all duration-300 flex-1 py-6 text-base font-medium shadow-sm hover:shadow-md",
                    isProcessing
                      ? "animate-pulse bg-primary/90"
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Processing URLs...
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine className="mr-2 h-5 w-5" />
                      Process & Download
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={resetForm}
                  disabled={isProcessing}
                  className="flex-none py-6 text-base font-medium border-primary/20 hover:bg-primary/5"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Download section appears after processing */}
            {(videoResult?.isValid || audioResult?.isValid) && (
              <div
                className="mt-10 pt-8 border-t border-primary/10 animate-fadeIn"
                style={{ animationDuration: "0.5s", animationFillMode: "both" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-xl font-bold">Your Downloads</h3>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>

                {/* Important note about media downloads */}
                <div className="bg-amber-500/10 border border-amber-200/20 p-4 rounded-lg mb-8 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">
                      Download Instructions
                    </p>
                    <p className="text-sm text-muted-foreground">
                      When you click the download button, the media will open in
                      a new tab. If the download doesn't start automatically,
                      right-click on the media and select "Save As" to save the
                      file to your device.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videoResult?.isValid && videoResult.processedUrl && (
                    <div className="transition-all duration-300 hover:translate-y-[-3px]">
                      <DownloadCard
                        type="video"
                        url={videoResult.processedUrl}
                        filename={videoResult.filename}
                        isEnabled={true}
                      />
                    </div>
                  )}

                  {audioResult?.isValid && audioResult.processedUrl && (
                    <div className="transition-all duration-300 hover:translate-y-[-3px]">
                      <DownloadCard
                        type="audio"
                        url={audioResult.processedUrl}
                        filename={audioResult.filename}
                        isEnabled={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrlProcessorForm;
