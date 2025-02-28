
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, File } from "lucide-react";
import ProgressBar from "@/components/ui-custom/progress-bar";
import LoadingSpinner from "@/components/ui-custom/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { downloadFile } from "@/utils/download-manager";

interface DownloadCardProps {
  type: 'video' | 'audio';
  url: string;
  filename: string;
  isEnabled: boolean;
  className?: string;
}

const DownloadCard = ({
  type,
  url,
  filename,
  isEnabled,
  className
}: DownloadCardProps) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!isEnabled || isDownloading) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    setIsComplete(false);
    
    const success = await downloadFile(
      url,
      filename,
      (progress) => setDownloadProgress(progress),
      (errorMessage) => {
        toast({
          title: "Download Failed",
          description: errorMessage,
          variant: "destructive",
        });
        setIsDownloading(false);
      },
      () => {
        toast({
          title: `Starting ${type} download`,
          description: "Download initiated...",
        });
      },
      () => {
        setIsComplete(true);
        setIsDownloading(false);
        toast({
          title: "Download Complete",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} saved as ${filename}`,
        });
      }
    );
    
    if (!success && !isComplete) {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className={cn(
        "glass p-6 rounded-lg transition-all duration-300",
        isEnabled ? "opacity-100" : "opacity-50",
        className
      )}
    >
      <div className="flex items-center mb-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
          type === 'video' ? "bg-accent/10" : "bg-primary/10"
        )}>
          <File className={cn(
            "w-5 h-5",
            type === 'video' ? "text-accent" : "text-primary"
          )} />
        </div>
        <div>
          <h3 className="font-medium">{type === 'video' ? 'Video' : 'Audio'} File</h3>
          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
            {filename}
          </p>
        </div>
      </div>
      
      {isDownloading ? (
        <div className="mt-4 space-y-2">
          <ProgressBar progress={downloadProgress} />
          <p className="text-xs text-muted-foreground">
            Downloading {type} file...
          </p>
        </div>
      ) : isComplete ? (
        <div className="mt-4">
          <Button 
            className="w-full"
            variant="outline"
            onClick={handleDownload}
          >
            Download Again
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={handleDownload}
          disabled={!isEnabled}
        >
          {isDownloading ? (
            <LoadingSpinner size="sm" color="border-white" className="mr-2" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download {type}
        </Button>
      )}
    </div>
  );
};

export default DownloadCard;
