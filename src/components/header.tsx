
import React from 'react';
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn(
      "w-full py-4 border-b border-border/40",
      "bg-background/80 backdrop-blur-sm sticky top-0 z-10",
      className
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">
            Media Downloader
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a 
            href="#about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
