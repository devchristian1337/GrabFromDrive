import React from "react";
import UrlProcessorForm from "@/components/url-processor-form";
import { HyperText } from "@/components/ui/hyper-text";
import { Github } from "lucide-react";

const floatAnimation = {
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
    "100%": { transform: "translateY(0px)" },
  },
};

const Index = () => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background p-4 pt-8 md:pt-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center mb-8 mt-6 md:mt-0">
            <div className="mb-4">
              <img
                src="https://iili.io/3dD7eK7.png"
                alt="GrabFromDrive Logo"
                width={50}
                height={50}
                className="object-contain select-none pointer-events-none"
                loading="eager"
                draggable="false"
                onContextMenu={handleContextMenu}
                style={{
                  animation: "float 3s ease-in-out infinite",
                  transform: "translateY(0px)",
                  WebkitUserDrag: "none",
                  userSelect: "none",
                }}
              />
            </div>
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
        <span className="mr-2 select-none">Made by devchristian1337</span>
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

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
