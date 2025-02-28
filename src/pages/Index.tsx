import React from "react";
import UrlProcessorForm from "@/components/url-processor-form";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <UrlProcessorForm />
      </div>
    </div>
  );
};

export default Index;
