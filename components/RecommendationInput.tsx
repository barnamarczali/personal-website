'use client';

import { useState, FormEvent } from 'react';

interface RecommendationInputProps {
  placeholder: string;
  type: 'song' | 'writing';
  width?: 'full' | 'fit' | 'auto';
}

export default function RecommendationInput({ placeholder, type, width = 'full' }: RecommendationInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!value.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setIsSliding(true);
    
    // Show success message immediately
    setShowSuccess(true);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          content: value.trim(),
        }),
      });

      if (response.ok) {
        // Wait for slide animation to complete, then reset
        setTimeout(() => {
          setIsSliding(false);
          setValue('');
        }, 500);
        
        // Hide success message after 2 seconds
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error submitting recommendation:', error);
      setIsSliding(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWidthClass = () => {
    if (width === 'fit') return 'w-fit min-w-[280px]';
    if (width === 'auto') return 'w-auto';
    return 'flex-1';
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3">
          <div className={`${getWidthClass()} relative overflow-hidden`}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={isSubmitting}
              className={`w-full bg-transparent text-lg font-light outline-none pb-1 placeholder:transition-opacity placeholder:duration-300 ${
                isFocused
                  ? 'text-brand-accent placeholder:text-brand-accent/50'
                  : 'text-brand-text placeholder:text-brand-text/50'
              }`}
              style={{
                caretColor: isFocused ? '#E58F65' : '#F5F5F5',
                transition: 'transform 500ms ease-out, opacity 500ms ease-out, color 300ms',
                transform: isSliding ? 'translateX(150%)' : 'translateX(0)',
                opacity: isSliding ? 0 : 1,
              }}
            />
            <div
              className={`absolute bottom-0 left-0 right-0 h-[1px] transition-colors duration-300 ${
                isFocused ? 'bg-brand-accent' : 'bg-brand-text'
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !value.trim()}
            className={`group flex-shrink-0 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed relative ${
              isFocused ? 'text-brand-accent' : 'text-brand-text'
            }`}
            aria-label="Submit"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            
            {/* Thank you popup near arrow */}
            {showSuccess && (
              <div 
                className="absolute -top-2 left-full ml-3 whitespace-nowrap pointer-events-none"
                style={{
                  animation: 'fadeOutUp 2s ease-out forwards',
                }}
              >
                <span className="text-sm font-light text-brand-accent">
                  thank you!
                </span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

