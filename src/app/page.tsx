'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import BusinessCard from '@/components/BusinessCard'
import { MapPin, Star, Shield, Accessibility, Heart, Brain, Users } from 'lucide-react'

// Mock data for demonstration
const mockBusinesses = [
  {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    rating: 4.8,
    safetyScore: 95,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space'],
    image: '/api/placeholder/300/200',
    description: 'A welcoming space for everyone with excellent coffee and inclusive atmosphere.',
    verifiedReviews: 24,
    distance: '0.2 miles'
  },
  {
    id: '2',
    name: 'Accessible Eats',
    type: 'Restaurant',
    address: '456 Oak Ave, Midtown',
    rating: 4.6,
    safetyScore: 92,
    features: ['wheelchair-accessible', 'autism-friendly', 'sign-language'],
    image: '/api/placeholder/300/200',
    description: 'Family restaurant with full accessibility and sensory-friendly dining options.',
    verifiedReviews: 31,
    distance: '0.5 miles'
  },
  {
    id: '3',
    name: 'Peaceful Gardens',
    type: 'Park',
    address: '789 Green Blvd, Westside',
    rating: 4.9,
    safetyScore: 88,
    features: ['quiet-space', 'wheelchair-accessible', 'meditation-area'],
    image: '/api/placeholder/300/200',
    description: 'Tranquil park space perfect for meditation and quiet reflection.',
    verifiedReviews: 18,
    distance: '1.2 miles'
  }
]

const featureIcons = {
  'lgbtq-friendly': Heart,
  'wheelchair-accessible': Accessibility,
  'autism-friendly': Brain,
  'quiet-space': Shield,
  'sign-language': Users,
  'meditation-area': Shield
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => business.features.includes(filter))
    return matchesSearch && matchesFilters
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Safe Space
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover inclusive, accessible, and welcoming places for everyone
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for restaurants, cafes, parks..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">1,247</div>
              <div className="text-gray-600">Verified Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">4.8★</div>
              <div className="text-gray-600">Average Safety Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">12K+</div>
              <div className="text-gray-600">Community Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">89%</div>
              <div className="text-gray-600">Feel Safer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <FilterBar 
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
              />
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredBusinesses.length} Safe Spaces Found
                </h2>
                <select className="border border-gray-300 rounded-lg px-4 py-2">
                  <option>Sort by Distance</option>
                  <option>Sort by Rating</option>
                  <option>Sort by Safety Score</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard 
                    key={business.id} 
                    business={business}
                    featureIcons={featureIcons}
                  />
                ))}
              </div>

              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No spaces found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
