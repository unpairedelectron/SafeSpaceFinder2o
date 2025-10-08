'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Command as CommandIcon, X, TrendingUp, Clock, Settings, Map, Users, Bell, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  category: 'navigation' | 'action' | 'recent' | 'search';
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Command items
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Home',
      description: 'Go to homepage',
      icon: <CommandIcon className="w-4 h-4" />,
      category: 'navigation',
      action: () => router.push('/'),
      keywords: ['home', 'dashboard']
    },
    {
      id: 'nav-discover',
      title: 'Discover',
      description: 'Find safe spaces',
      icon: <Search className="w-4 h-4" />,
      category: 'navigation',
      action: () => router.push('/discover'),
      keywords: ['discover', 'search', 'find']
    },
    {
      id: 'nav-map',
      title: 'Map',
      description: 'View map',
      icon: <Map className="w-4 h-4" />,
      category: 'navigation',
      action: () => router.push('/map'),
      keywords: ['map', 'location', 'nearby']
    },
    {
      id: 'nav-community',
      title: 'Community',
      description: 'Community feed',
      icon: <Users className="w-4 h-4" />,
      category: 'navigation',
      action: () => router.push('/community'),
      keywords: ['community', 'social', 'feed']
    },
    {
      id: 'nav-notifications',
      title: 'Notifications',
      description: 'View notifications',
      icon: <Bell className="w-4 h-4" />,
      category: 'navigation',
      action: () => router.push('/notifications'),
      keywords: ['notifications', 'alerts']
    },
    {
      id: 'nav-settings',
      title: 'Settings',
      description: 'Account settings',
      icon: <Settings className="w-4 h-4" />,
      category: 'navigation',
      action: () => router.push('/settings'),
      keywords: ['settings', 'preferences', 'account']
    },
    // Actions
    {
      id: 'action-add-business',
      title: 'Add a Business',
      description: 'Submit a new safe space',
      icon: <Plus className="w-4 h-4" />,
      category: 'action',
      action: () => router.push('/add-business'),
      keywords: ['add', 'create', 'submit', 'business']
    }
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(query) ||
      cmd.description?.toLowerCase().includes(query) ||
      cmd.keywords?.some((k) => k.includes(query))
    );
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleSelect = (command: CommandItem) => {
    command.action();
    setIsOpen(false);
    setSearchQuery('');
  };

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const categoryLabels = {
    navigation: 'Navigation',
    action: 'Actions',
    recent: 'Recent',
    search: 'Search Results'
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'hidden md:flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
          'text-sm text-gray-600 dark:text-gray-400 transition-colors'
        )}
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-auto px-2 py-0.5 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
          ⌘K
        </kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search commands..."
                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                  <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                    ESC
                  </kbd>
                </div>

                {/* Commands List */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </div>
                      <div className="space-y-1">
                        {items.map((command) => (
                          <button
                            key={command.id}
                            onClick={() => handleSelect(command)}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-3 rounded-lg',
                              'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                              'text-left group'
                            )}
                          >
                            {command.icon && (
                              <div className="flex-shrink-0 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                {command.icon}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {command.title}
                              </div>
                              {command.description && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {command.description}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No commands found</p>
                      <p className="text-sm">Try a different search term</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border">↑</kbd>
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border">↓</kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border">↵</kbd>
                        Select
                      </span>
                    </div>
                    <span>Press ⌘K to open anytime</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
