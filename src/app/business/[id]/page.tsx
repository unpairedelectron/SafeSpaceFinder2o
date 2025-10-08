'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { 
  MapPin, 
  Star, 
  Shield, 
  Phone, 
  Globe, 
  Clock, 
  Heart,
  Share2,
  Bookmark,
  Camera,
  ThumbsUp,
  Accessibility,
  Brain,
  Users
} from 'lucide-react'

export default function BusinessDetailPage() {
  const [isSaved, setIsSaved] = useState(false)

  // Mock data - would come from API/database
  const business = {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    phone: '+1 (555) 123-4567',
    website: 'www.rainbowcafe.com',
    rating: 4.8,
    safetyScore: 95,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space'],
    description: 'A welcoming space for everyone with excellent coffee and inclusive atmosphere. We pride ourselves on creating a safe, comfortable environment where all people can relax and enjoy quality beverages and food.',
    verifiedReviews: 24,
    distance: '0.2 miles',
    hours: {
      monday: '7:00 AM - 8:00 PM',
      tuesday: '7:00 AM - 8:00 PM',
      wednesday: '7:00 AM - 8:00 PM',
      thursday: '7:00 AM - 8:00 PM',
      friday: '7:00 AM - 10:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 6:00 PM'
    },
    certifications: ['Safe Space Certified', 'LGBTQ+ Verified', 'Accessibility Approved']
  }

  const reviews = [
    {
      id: '1',
      userName: 'Alex Johnson',
      rating: 5,
      safetyScore: 95,
      comment: 'Absolutely love this place! Staff are incredibly welcoming and the space is very accessible. Gender-neutral bathrooms are a huge plus.',
      date: '2 days ago',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userName: 'Sam Rivera',
      rating: 5,
      safetyScore: 100,
      comment: 'Perfect quiet space for someone with sensory sensitivities. The staff understand and are very accommodating. Highly recommend!',
      date: '1 week ago',
      helpful: 8,
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Image Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary-400 to-primary-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-500 text-white">
                <Shield className="h-4 w-4 mr-1" />
                {business.safetyScore}% Safe
              </span>
              {business.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-800"
                >
                  {cert}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{business.name}</h1>
            <p className="text-xl text-white/90">{business.type}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold text-gray-900">{business.rating}</span>
                  </div>
                  <div className="text-gray-600">
                    {business.verifiedReviews} verified reviews
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2 rounded-lg transition-colors ${
                      isSaved ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-900">{business.address}</p>
                    <p className="text-sm text-primary-600">{business.distance} away</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${business.phone}`} className="text-gray-900 hover:text-primary-600">
                    {business.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">
                    {business.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Inclusive Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Inclusive Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Accessibility className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Wheelchair Accessible</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                  <Heart className="h-6 w-6 text-pink-600" />
                  <span className="text-sm font-medium text-gray-900">LGBTQ+ Friendly</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Quiet Space Available</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Gender-Neutral Facilities</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Camera className="h-6 w-6 text-orange-600" />
                  <span className="text-sm font-medium text-gray-900">Photo Verified</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Space</h2>
              <p className="text-gray-700 leading-relaxed">{business.description}</p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Community Reviews</h2>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Write a Review
                </button>
              </div>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          {review.verified && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{review.rating}.0</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4 text-success-600" />
                            <span className="text-sm text-gray-600">{review.safetyScore}% safe</span>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hours */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{day}</span>
                    <span className="text-gray-900 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Score Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-success-600" />
                <h3 className="text-lg font-semibold text-gray-900">Safety Score</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-success-600 mb-2">{business.safetyScore}%</div>
                <div className="text-sm text-gray-600">Based on {business.verifiedReviews} verified reviews</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Accessibility</span>
                    <span className="font-medium text-gray-900">98%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-success-600" style={{ width: '98%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Inclusivity</span>
                    <span className="font-medium text-gray-900">96%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-success-600" style={{ width: '96%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Staff Training</span>
                    <span className="font-medium text-gray-900">92%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-success-600" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Get Directions</span>
              </button>
              <Link
                href="/"
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>Back to Search</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
