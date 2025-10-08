'use client'

import { useState } from 'react'
import { Menu, X, User, Heart, Settings, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Safe Space Finder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Discover
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-primary-600 transition-colors">
              Map View
            </Link>
            <Link href="/add-business" className="text-gray-700 hover:text-primary-600 transition-colors">
              Add Business
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-primary-600 transition-colors">
              Community
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <MapPin className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Discover
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-primary-600 transition-colors">
                Map View
              </Link>
              <Link href="/add-business" className="text-gray-700 hover:text-primary-600 transition-colors">
                Add Business
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-primary-600 transition-colors">
                Community
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
