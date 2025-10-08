'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 cursor-pointer',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
            checked
              ? 'bg-purple-600 border-purple-600'
              : 'bg-white border-gray-300 hover:border-gray-400',
            disabled && 'bg-gray-100'
          )}
        >
          {checked && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
      </div>
      {(label || description) && (
        <div className="flex-1 pt-0.5">
          {label && <div className="text-sm font-medium text-gray-900">{label}</div>}
          {description && (
            <div className="text-sm text-gray-500 mt-0.5">{description}</div>
          )}
        </div>
      )}
    </label>
  );
}
