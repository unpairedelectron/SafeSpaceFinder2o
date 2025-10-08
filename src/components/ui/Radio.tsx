'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  name,
  label,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <div className="text-sm font-medium text-gray-900">{label}</div>
      )}
      <div
        className={cn(
          'space-y-3',
          orientation === 'horizontal' && 'flex items-center space-y-0 space-x-6'
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start gap-3 cursor-pointer',
              option.disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={option.disabled}
                className="sr-only"
              />
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                  value === option.value
                    ? 'border-purple-600'
                    : 'border-gray-300 hover:border-gray-400',
                  option.disabled && 'bg-gray-100'
                )}
              >
                {value === option.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                )}
              </div>
            </div>
            <div className="flex-1 pt-0.5">
              <div className="text-sm font-medium text-gray-900">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-gray-500 mt-0.5">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
