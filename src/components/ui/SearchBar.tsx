'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp, Clock, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'business' | 'location' | 'category';
  icon?: React.ReactNode;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  results?: SearchResult[];
  recentSearches?: string[];
  trendingSearches?: string[];
  loading?: boolean;
  showSuggestions?: boolean;
  autoFocus?: boolean;
  onResultClick?: (result: SearchResult) => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search for safe spaces...',
  className,
  results = [],
  recentSearches = [],
  trendingSearches = [],
  loading = false,
  showSuggestions = true,
  autoFocus = false,
  onResultClick,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
      setShowDropdown(false);
    }
    if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    onChange(result.title);
    setShowDropdown(false);
    onResultClick?.(result);
  };

  const handleRecentClick = (search: string) => {
    onChange(search);
    if (onSearch) onSearch(search);
    setShowDropdown(false);
  };

  const hasContent = value.length > 0;
  const showResults = showSuggestions && showDropdown && (hasContent ? results.length > 0 : (recentSearches.length > 0 || trendingSearches.length > 0));

  return (
    <div className={cn('relative w-full', className)}>
      <div
        className={cn(
          'relative flex items-center bg-white rounded-full shadow-md transition-all',
          'border-2',
          isFocused ? 'border-purple-500 shadow-lg' : 'border-transparent',
          'hover:shadow-lg'
        )}
      >
        <div className="pl-4 pr-2">
          <Search className={cn(
            'w-5 h-5 transition-colors',
            isFocused ? 'text-purple-600' : 'text-gray-400'
          )} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowDropdown(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            'flex-1 bg-transparent py-3 px-2 outline-none',
            'text-gray-900 placeholder:text-gray-400',
            'text-sm md:text-base'
          )}
        />

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="pr-2"
            >
              <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
            </motion.div>
          )}

          {hasContent && !loading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => onSearch?.(value)}
          className={cn(
            'ml-2 px-6 py-3 rounded-full font-medium transition-all',
            'bg-gradient-to-r from-purple-600 to-pink-600',
            'text-white hover:shadow-lg',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          disabled={!hasContent}
        >
          Search
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'absolute top-full left-0 right-0 mt-2',
              'bg-white rounded-2xl shadow-xl border border-gray-200',
              'overflow-hidden z-50'
            )}
          >
            {/* Search Results */}
            {hasContent && results.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                  Results
                </div>
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                      'hover:bg-gray-50 transition-colors text-left'
                    )}
                  >
                    {result.icon || <MapPin className="w-4 h-4 text-gray-400" />}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {result.title}
                      </div>
                      {result.subtitle && (
                        <div className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!hasContent && recentSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(search)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg',
                      'hover:bg-gray-50 transition-colors text-left group'
                    )}
                  >
                    <span className="text-gray-700">{search}</span>
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                  </button>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {!hasContent && trendingSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending
                </div>
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(search)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg',
                      'hover:bg-gray-50 transition-colors text-left group'
                    )}
                  >
                    <span className="text-gray-700">{search}</span>
                    <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
