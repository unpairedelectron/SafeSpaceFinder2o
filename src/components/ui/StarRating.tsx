'use client';

import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  className = '',
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const sizeClass = sizeClasses[size];
  const displayRating = hoverRating ?? rating;

  const handleClick = (newRating: number) => {
    if (interactive && onChange) {
      onChange(newRating);
    }
  };

  const handleMouseEnter = (newRating: number) => {
    if (interactive) {
      setHoverRating(newRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillPercentage = Math.max(0, Math.min(1, displayRating - index));

    if (fillPercentage === 0) {
      return (
        <Star
          key={index}
          className={`${sizeClass} text-gray-300 ${
            interactive ? 'cursor-pointer hover:text-yellow-400' : ''
          }`}
          aria-hidden="true"
        />
      );
    } else if (fillPercentage < 1) {
      return (
        <div key={index} className="relative inline-block">
          <Star className={`${sizeClass} text-gray-300`} aria-hidden="true" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercentage * 100}%` }}
          >
            <Star
              className={`${sizeClass} text-yellow-400 fill-current`}
              aria-hidden="true"
            />
          </div>
        </div>
      );
    } else {
      return (
        <Star
          key={index}
          className={`${sizeClass} text-yellow-400 fill-current ${
            interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''
          }`}
          aria-hidden="true"
        />
      );
    }
  };

  return (
    <div
      className={`flex items-center space-x-0.5 ${className}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          disabled={!interactive}
          className={interactive ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded' : ''}
          aria-label={interactive ? `Rate ${index + 1} stars` : undefined}
          role={interactive ? 'radio' : undefined}
          aria-checked={interactive ? rating === index + 1 : undefined}
        >
          {renderStar(index)}
        </button>
      ))}
    </div>
  );
}
