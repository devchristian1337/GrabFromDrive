
import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0 to 1
  showPercentage?: boolean;
  className?: string;
  barClassName?: string;
  height?: string;
}

const ProgressBar = ({ 
  progress, 
  showPercentage = true, 
  className,
  barClassName,
  height = 'h-2'
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(normalizedProgress * 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", height)}>
        <div 
          className={cn(
            "h-full transition-all duration-300 ease-out bg-accent rounded-full",
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
