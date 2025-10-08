'use client'

import { Star, MapPin, Shield, Camera, ThumbsUp } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface Business {
  id: string
  name: string
  type: string
  address: string
  rating: number
  safetyScore: number
  features: string[]
  image: string
  description: string
  verifiedReviews: number
  distance: string
}

interface BusinessCardProps {
  business: Business
  featureIcons: Record<string, LucideIcon>
}

export default function BusinessCard({ business, featureIcons }: BusinessCardProps) {
  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600 bg-success-50'
    if (score >= 80) return 'text-warning-600 bg-warning-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSafetyScoreColor(business.safetyScore)}`}>
            <Shield className="h-3 w-3 mr-1" />
            {business.safetyScore}% Safe
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
            <Camera className="h-3 w-3 mr-1" />
            Verified Photos
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
            <p className="text-sm text-gray-600">{business.type}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{business.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{business.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {business.features.slice(0, 3).map(feature => {
            const IconComponent = featureIcons[feature]
            return (
              <span
                key={feature}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                {feature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )
          })}
          {business.features.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{business.features.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{business.distance}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{business.verifiedReviews} reviews</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  )
}
