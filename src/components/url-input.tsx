
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clipboard, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrlInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isValid?: boolean | null;
  errorMessage?: string;
  isDisabled?: boolean;
  className?: string;
}

const UrlInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onClear,
  isValid = null,
  errorMessage,
  isDisabled = false,
  className,
}: UrlInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  // Animation for input status
  useEffect(() => {
    if (isValid !== null && inputRef.current) {
      inputRef.current.classList.add('transition-all', 'duration-300');
      
      if (isValid) {
        inputRef.current.classList.add('focus-within:ring-green-400');
        inputRef.current.classList.remove('focus-within:ring-destructive');
      } else {
        inputRef.current.classList.add('focus-within:ring-destructive');
        inputRef.current.classList.remove('focus-within:ring-green-400');
      }
      
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.classList.remove('focus-within:ring-green-400', 'focus-within:ring-destructive');
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isValid]);

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={id}
        className="text-sm font-medium transition-colors"
      >
        {label}
      </Label>
      
      <div 
        className={cn(
          "relative flex items-center rounded-md overflow-hidden transition-all duration-200",
          isFocused ? "ring-2 ring-accent/50" : "ring-0",
          isValid === false ? "ring-2 ring-destructive/50" : "",
          isValid === true ? "ring-2 ring-green-400/50" : ""
        )}
        ref={inputRef}
      >
        <Input
          id={id}
          type="url"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          className={cn(
            "rounded-md pr-20 transition-all duration-200 ease-in-out",
            "border-input focus-visible:ring-0 focus-visible:ring-offset-0",
            isValid === false ? "border-destructive/50 focus-visible:border-destructive" : "",
            isValid === true ? "border-green-400/50 focus-visible:border-green-400" : ""
          )}
        />
        
        <div className="absolute right-0 flex space-x-1 pr-1">
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="h-8 w-8 opacity-70 hover:opacity-100 hover:bg-muted"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handlePaste}
            disabled={isDisabled}
            className="h-8 w-8 opacity-70 hover:opacity-100 hover:bg-muted"
          >
            <Clipboard className="h-4 w-4" />
            <span className="sr-only">Paste</span>
          </Button>
        </div>
      </div>
      
      {errorMessage && isValid === false && (
        <p className="text-sm text-destructive mt-1 animate-slide-up">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default UrlInput;
