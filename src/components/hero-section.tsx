import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const scrollPosition = window.scrollY;
      const opacity = Math.max(1 - scrollPosition / 500, 0);
      const transform = `translateY(${scrollPosition * 0.2}px)`;

      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = transform;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[70vh] max-h-[600px] overflow-hidden bg-gradient-to-b from-background to-secondary/50">
      <div
        ref={heroRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-transform duration-300 ease-out"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Download Video & Audio
          <br />
          <span className="text-accent">With Precision</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A beautiful, simple tool for downloading video and audio files with
          automatic URL optimization.
        </p>

        <button
          onClick={scrollToContent}
          className="animate-bounce mt-8 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Scroll to content"
        >
          <ArrowDown className="h-6 w-6 text-foreground opacity-70" />
        </button>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default HeroSection;
