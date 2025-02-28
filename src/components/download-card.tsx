
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, File, ExternalLink } from "lucide-react";
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

  const handleExternalDownload = () => {
    // Open the URL in a new tab for direct download
    window.open(url, '_blank');
    
    toast({
      title: "Opening URL in New Tab",
      description: "If direct download doesn't start, right-click and use 'Save As' option.",
    });
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
      ) : (
        <div className="space-y-2 mt-4">
          {/* Primary download button (may fail due to CORS) */}
          <Button
            className="w-full"
            onClick={handleDownload}
            disabled={!isEnabled}
          >
            <Download className="mr-2 h-4 w-4" />
            Download {type}
          </Button>
          
          {/* Alternative download method - more likely to work */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleExternalDownload}
            disabled={!isEnabled}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in New Tab
          </Button>
          
          <p className="text-xs text-muted-foreground mt-1">
            If direct download fails, use "Open in New Tab"
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadCard;
