
import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  className,
  color = 'border-accent'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent",
          sizeClasses[size],
          color,
          className
        )}
      />
    </div>
  );
};

export default LoadingSpinner;
