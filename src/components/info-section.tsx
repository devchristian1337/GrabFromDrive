import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileType, Link, Lock } from "lucide-react";

const InfoSection = () => {
  return (
    <div className="container py-12">
      <div className="text-center mb-12 animate-on-scroll">
        <h2
          className="text-3xl font-semibold tracking-tight mb-4"
          id="how-it-works"
        >
          How It Works
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our application processes media URLs to optimize them for direct
          downloading
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-0 shadow-sm overflow-hidden animate-on-scroll">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Link className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-2">URL Processing</h3>
            <p className="text-muted-foreground">
              Enter URLs containing the appropriate mime types. We validate and
              optimize them by removing unnecessary parameters.
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass border-0 shadow-sm overflow-hidden animate-on-scroll"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileType className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Media Handling</h3>
            <p className="text-muted-foreground">
              We separate video and audio processing for efficient downloading.
              Files are streamed directly to your device.
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass border-0 shadow-sm overflow-hidden animate-on-scroll"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-2">Privacy Focused</h3>
            <p className="text-muted-foreground">
              All processing happens in your browser. We never store your URLs
              or downloaded content on our servers.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center animate-on-scroll" id="about">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          About This Tool
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          This application was built to simplify the process of downloading
          media files from URLs that require specific parameter modifications.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
        >
          Learn more about the project
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default InfoSection;
