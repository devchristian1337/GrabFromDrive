import React from "react";
import UrlProcessorForm from "@/components/url-processor-form";
import { HyperText } from "@/components/ui/hyper-text";
import { Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-center mb-8">
            <HyperText
              text="GRABFROMDRIVE"
              className="text-4xl font-bold text-primary font-bebasNeue select-none"
              duration={1200}
            />
          </div>
          <UrlProcessorForm />
        </div>
      </div>

      <footer className="mt-8 pb-4 flex justify-center items-center text-sm text-muted-foreground">
        <span className="mr-2">Made by devchristian1337</span>
        <a
          href="https://github.com/devchristian1337"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary transition-colors"
          aria-label="Visit devchristian1337's GitHub profile"
          tabIndex={0}
        >
          <Github size={18} />
        </a>
      </footer>
    </div>
  );
};

export default Index;
