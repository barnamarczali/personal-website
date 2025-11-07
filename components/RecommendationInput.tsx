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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!value.trim() || isSubmitting) return;

    setIsSubmitting(true);

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
        setValue('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error submitting recommendation:', error);
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
          <div className={`${getWidthClass()} relative`}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={isSubmitting}
              className={`w-full bg-transparent text-lg font-light outline-none transition-colors duration-300 pb-1 placeholder:transition-colors placeholder:duration-300 ${
                isFocused
                  ? 'text-brand-accent placeholder:text-brand-accent/50'
                  : 'text-brand-text placeholder:text-brand-text/50'
              }`}
              style={{
                caretColor: isFocused ? '#E58F65' : '#F5F5F5',
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
            className={`group flex-shrink-0 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
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
          </button>
        </div>
      </form>
      {showSuccess && (
        <p className="text-sm font-light text-brand-accent mt-2 animate-fade-in">
          thanks for the recommendation!
        </p>
      )}
    </div>
  );
}

