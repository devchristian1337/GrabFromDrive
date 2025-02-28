import React from "react";
import UrlProcessorForm from "@/components/url-processor-form";
import { HyperText } from "@/components/ui/hyper-text";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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
  );
};

export default Index;
