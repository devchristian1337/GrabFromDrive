
import React from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import UrlProcessorForm from "@/components/url-processor-form";
import InfoSection from "@/components/info-section";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <UrlProcessorForm />
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
