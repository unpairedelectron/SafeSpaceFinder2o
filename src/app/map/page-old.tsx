'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { 
  MapPin, 
  Navigation, 
  ZoomIn, 
  ZoomOut,
  Layers,
  Filter,
  Search,
  Star,
  Shield,
  X
} from 'lucide-react'

// Mock businesses with coordinates
const mockBusinesses = [
  {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    lat: 40.7128,
    lng: -74.0060,
    rating: 4.8,
    safetyScore: 95,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space']
  },
  {
    id: '2',
    name: 'Accessible Eats',
    type: 'Restaurant',
    address: '456 Oak Ave, Midtown',
    lat: 40.7580,
    lng: -73.9855,
    rating: 4.6,
    safetyScore: 92,
    features: ['wheelchair-accessible', 'autism-friendly', 'sign-language']
  },
  {
    id: '3',
    name: 'Peaceful Gardens',
    type: 'Park',
    address: '789 Green Blvd, Westside',
    lat: 40.7489,
    lng: -73.9680,
    rating: 4.9,
    safetyScore: 88,
    features: ['quiet-space', 'wheelchair-accessible', 'meditation-area']
  },
  {
    id: '4',
    name: 'Inclusive Yoga Studio',
    type: 'Fitness',
    address: '321 Wellness Way',
    lat: 40.7282,
    lng: -74.0776,
    rating: 4.7,
    safetyScore: 94,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space']
  }
]

export default function MapPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [mapStyle, setMapStyle] = useState('standard')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  const getSafetyColor = (score: number) => {
    if (score >= 90) return 'bg-success-500'
    if (score >= 80) return 'bg-warning-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="relative h-[calc(100vh-4rem)]">
        {/* Map Controls - Top */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 bg-white rounded-lg shadow-lg">
            <div className="flex items-center p-3">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search on map..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-900"
              />
              <button className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Navigation className="h-5 w-5 text-primary-600" />
              </button>
            </div>
          </div>

          {/* Map Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-700" />
            </button>
            <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <Layers className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="absolute top-24 left-4 z-10 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Map Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary-600" />
                <span className="text-sm text-gray-700">LGBTQ+ Friendly</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary-600" />
                <span className="text-sm text-gray-700">Wheelchair Accessible</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary-600" />
                <span className="text-sm text-gray-700">Autism Friendly</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary-600" />
                <span className="text-sm text-gray-700">Quiet Spaces</span>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Safety Score</h4>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
            <ZoomIn className="h-5 w-5 text-gray-700" />
          </button>
          <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
            <ZoomOut className="h-5 w-5 text-gray-700" />
          </button>
          <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
            <Navigation className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Map Display Area */}
        <div className="w-full h-full bg-gray-200 relative">
          {/* Placeholder map - In production, use Google Maps or Mapbox */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">Interactive Map View</p>
              <p className="text-gray-500 text-sm mt-2">
                Integrate Google Maps or Mapbox API here
              </p>
            </div>
          </div>

          {/* Mock Business Markers */}
          {mockBusinesses.map((business, index) => (
            <button
              key={business.id}
              onClick={() => setSelectedBusiness(business)}
              className={`absolute ${getSafetyColor(business.safetyScore)} w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110`}
              style={{
                top: `${20 + index * 15}%`,
                left: `${30 + index * 10}%`
              }}
            >
              <MapPin className="h-6 w-6 text-white" />
            </button>
          ))}
        </div>

        {/* Business Info Card */}
        {selectedBusiness && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:w-96 z-10 bg-white rounded-lg shadow-xl p-4">
            <button
              onClick={() => setSelectedBusiness(null)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>

            <div className="pr-8">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{selectedBusiness.name}</h3>
                  <p className="text-sm text-gray-600">{selectedBusiness.type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{selectedBusiness.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className={`h-4 w-4 ${getSafetyColor(selectedBusiness.safetyScore).replace('bg-', 'text-')}`} />
                  <span className="text-sm text-gray-600">{selectedBusiness.safetyScore}% safe</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 inline mr-1" />
                {selectedBusiness.address}
              </p>

              <div className="flex gap-2">
                <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                  Get Directions
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 hidden md:block">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Safety Score</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-success-500"></div>
              <span className="text-xs text-gray-600">90-100% Excellent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-warning-500"></div>
              <span className="text-xs text-gray-600">80-89% Good</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Below 80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
