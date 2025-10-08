'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft, MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="text-[150px] md:text-[200px] font-bold leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              404
            </span>
          </div>
          
          {/* Floating Icons */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 -left-10 text-purple-600/20 dark:text-purple-400/20"
          >
            <MapPin className="w-20 h-20" />
          </motion.div>
          
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-20 -right-10 text-pink-600/20 dark:text-pink-400/20"
          >
            <Compass className="w-16 h-16" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Discover Spaces
              </Button>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Popular pages:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/discover', label: 'Discover' },
                { href: '/map', label: 'Map' },
                { href: '/community', label: 'Community' },
                { href: '/add-business', label: 'Add Business' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm text-gray-600 dark:text-gray-400',
                    'hover:text-purple-600 dark:hover:text-purple-400',
                    'transition-colors'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/30 dark:bg-pink-900/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
