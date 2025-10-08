'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  User, 
  Users,
  Settings, 
  Heart, 
  MessageSquare, 
  MapPin, 
  Shield, 
  Award,
  Calendar,
  Camera,
  Edit2,
  Save
} from 'lucide-react'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: '/api/placeholder/150/150',
  bio: 'Community advocate passionate about creating inclusive spaces for everyone.',
  identities: ['LGBTQ+', 'Accessibility Advocate'],
  accessibilityNeeds: ['Wheelchair Accessible', 'Sign Language'],
  verified: true,
  joinedDate: 'January 2024',
  stats: {
    reviews: 24,
    savedPlaces: 12,
    contributions: 45,
    helpfulVotes: 189
  }
}

const mockReviews = [
  {
    id: '1',
    businessName: 'Rainbow Café',
    rating: 5,
    safetyScore: 95,
    comment: 'Incredibly welcoming staff and accessible facilities. Perfect quiet corners for focused work.',
    date: '2024-01-15',
    helpful: 23
  },
  {
    id: '2',
    businessName: 'Accessible Eats',
    rating: 4,
    safetyScore: 88,
    comment: 'Great food and genuinely accessible. Staff trained in disability awareness.',
    date: '2024-01-10',
    helpful: 15
  }
]

const mockSavedPlaces = [
  {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    safetyScore: 95,
    distance: '0.2 miles'
  },
  {
    id: '2',
    name: 'Peaceful Gardens',
    type: 'Park',
    safetyScore: 88,
    distance: '1.2 miles'
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'saved' | 'about'>('reviews')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockUser)

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false)
    // In production: call API to update user profile
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
              />
              {profileData.verified && (
                <div className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full border-4 border-white">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              )}
              {isEditing && (
                <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
                  <Camera className="w-8 h-8 text-white" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="text-3xl font-bold border-b-2 border-purple-300 focus:border-purple-500 outline-none w-full"
                  />
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none resize-none"
                    rows={3}
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                  <p className="text-gray-600 mb-4">{profileData.bio}</p>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.identities.map((identity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {identity}
                  </span>
                ))}
                {profileData.verified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Verified Member
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profileData.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{profileData.stats.reviews}</div>
              <div className="text-sm text-gray-600 mt-1">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{profileData.stats.savedPlaces}</div>
              <div className="text-sm text-gray-600 mt-1">Saved Places</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{profileData.stats.contributions}</div>
              <div className="text-sm text-gray-600 mt-1">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{profileData.stats.helpfulVotes}</div>
              <div className="text-sm text-gray-600 mt-1">Helpful Votes</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Reviews
                </div>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'saved'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Saved Places
                </div>
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'about'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.businessName}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        {review.safetyScore}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                        <Award className="w-4 h-4" />
                        {review.helpful} found this helpful
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSavedPlaces.map((place) => (
                  <div key={place.id} className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                        <p className="text-sm text-gray-600">{place.type}</p>
                      </div>
                      <button className="text-pink-500 hover:text-pink-600 transition-colors">
                        <Heart className="w-6 h-6 fill-current" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{place.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        {place.safetyScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility Needs</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.accessibilityNeeds.map((need, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {need}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Impact</h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-2xl font-bold text-purple-600 mb-1">189</div>
                        <div className="text-sm text-gray-600">People Helped</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">45</div>
                        <div className="text-sm text-gray-600">Spaces Improved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600 mb-1">24</div>
                        <div className="text-sm text-gray-600">Detailed Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Top Contributor', icon: Award, color: 'yellow' },
                      { name: 'Community Leader', icon: Users, color: 'purple' },
                      { name: 'Accessibility Advocate', icon: Shield, color: 'blue' },
                      { name: 'Trusted Reviewer', icon: MessageSquare, color: 'green' }
                    ].map((achievement, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <achievement.icon className={`w-8 h-8 mx-auto mb-2 text-${achievement.color}-500`} />
                        <div className="text-sm font-medium text-gray-900">{achievement.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
