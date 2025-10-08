'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const { theme, effectiveTheme, setTheme } = useTheme();

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  ];

  return (
    <div className="relative inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={cn(
            'relative px-3 py-2 rounded-md text-sm font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
            theme === t.value
              ? 'text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          )}
          aria-label={`Switch to ${t.label} theme`}
        >
          {theme === t.value && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

// Compact version for mobile/header
export function ThemeToggleCompact() {
  const { effectiveTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg transition-colors',
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: effectiveTheme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {effectiveTheme === 'dark' ? (
          <Moon className="w-5 h-5 text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-gray-700" />
        )}
      </motion.div>
    </button>
  );
}
