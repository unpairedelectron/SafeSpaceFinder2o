'use client';

import React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantConfig = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: <Info className="w-5 h-5 text-blue-600" />,
    title: 'text-blue-900',
    text: 'text-blue-800',
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    title: 'text-green-900',
    text: 'text-green-800',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    title: 'text-yellow-900',
    text: 'text-yellow-800',
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    title: 'text-red-900',
    text: 'text-red-800',
  },
};

export default function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 border rounded-lg',
        config.container,
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={cn('font-semibold text-sm mb-1', config.title)}>
            {title}
          </h3>
        )}
        <div className={cn('text-sm', config.text)}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            'flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors',
            config.text
          )}
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
