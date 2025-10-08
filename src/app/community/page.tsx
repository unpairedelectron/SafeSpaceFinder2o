'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Users, 
  MessageSquare, 
  Award,
  TrendingUp,
  Calendar,
  Heart,
  Shield,
  Star,
  ThumbsUp,
  Share2,
  Flag,
  Camera,
  Clock
} from 'lucide-react'

const communityStats = [
  { label: 'Active Members', value: '12,847', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Reviews This Month', value: '1,293', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Certified Spaces', value: '487', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Communities Helped', value: '23', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' }
]

const topContributors = [
  { id: 1, name: 'Alex Rivera', reviews: 127, helpful: 892, avatar: '👤', badge: '🌟' },
  { id: 2, name: 'Jordan Chen', reviews: 98, helpful: 743, avatar: '👤', badge: '💎' },
  { id: 3, name: 'Sam Taylor', reviews: 89, helpful: 654, avatar: '👤', badge: '⭐' },
  { id: 4, name: 'Riley Morgan', reviews: 76, helpful: 589, avatar: '👤', badge: '✨' },
  { id: 5, name: 'Casey Kim', reviews: 68, helpful: 512, avatar: '👤', badge: '🎯' }
]

const recentActivity = [
  {
    id: 1,
    user: 'Alex Johnson',
    action: 'reviewed',
    business: 'Rainbow Café',
    rating: 5,
    safetyScore: 95,
    time: '2 hours ago',
    comment: 'Absolutely love this place! Staff are incredibly welcoming.',
    helpful: 12,
    type: 'review'
  },
  {
    id: 2,
    user: 'Sam Rivera',
    action: 'verified photos at',
    business: 'Accessible Eats',
    time: '4 hours ago',
    photos: 3,
    type: 'photos'
  },
  {
    id: 3,
    user: 'Jordan Lee',
    action: 'earned',
    achievement: 'Community Champion Badge',
    time: '6 hours ago',
    type: 'achievement'
  },
  {
    id: 4,
    user: 'Taylor Brown',
    action: 'helped certify',
    business: 'Peaceful Gardens',
    time: '8 hours ago',
    type: 'certification'
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Inclusive Business Workshop',
    date: 'Nov 15, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Community Center',
    attendees: 47,
    category: 'Workshop'
  },
  {
    id: 2,
    title: 'Accessibility Audit Training',
    date: 'Nov 22, 2025',
    time: '10:00 AM - 12:00 PM',
    location: 'Virtual',
    attendees: 89,
    category: 'Training'
  },
  {
    id: 3,
    title: 'Safe Space Certification Event',
    date: 'Dec 1, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Downtown Hall',
    attendees: 124,
    category: 'Certification'
  }
]

const discussions = [
  {
    id: 1,
    title: 'Best Autism-Friendly Restaurants in Downtown',
    author: 'Parent Care',
    replies: 23,
    views: 456,
    lastActive: '10 min ago',
    tags: ['autism-friendly', 'restaurants']
  },
  {
    id: 2,
    title: 'Wheelchair Accessibility: What to Look For',
    author: 'Mobility Advocate',
    replies: 41,
    views: 892,
    lastActive: '1 hour ago',
    tags: ['accessibility', 'guide']
  },
  {
    id: 3,
    title: 'LGBTQ+ Safe Spaces: Share Your Experiences',
    author: 'Pride Community',
    replies: 67,
    views: 1243,
    lastActive: '2 hours ago',
    tags: ['lgbtq+', 'experiences']
  }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'activity' | 'contributors' | 'discussions' | 'events'>('activity')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Community
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Together, we're making public spaces safer and more inclusive for everyone
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {communityStats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'activity'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab('contributors')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'contributors'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Top Contributors
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'discussions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Discussions
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'events'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Events
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </button>
                </div>

                {recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-gray-900">
                              <span className="font-semibold">{activity.user}</span>{' '}
                              <span className="text-gray-600">{activity.action}</span>{' '}
                              {activity.business && (
                                <span className="font-semibold text-primary-600">{activity.business}</span>
                              )}
                              {activity.achievement && (
                                <span className="font-semibold text-primary-600">{activity.achievement}</span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{activity.time}</span>
                            </p>
                          </div>
                          {activity.type === 'review' && (
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{activity.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Shield className="h-4 w-4 text-success-600" />
                                <span className="text-sm">{activity.safetyScore}%</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {activity.type === 'review' && activity.comment && (
                          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">{activity.comment}</p>
                            <div className="mt-3 flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                                <ThumbsUp className="h-4 w-4" />
                                <span>Helpful ({activity.helpful})</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                                <MessageSquare className="h-4 w-4" />
                                <span>Reply</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                                <Share2 className="h-4 w-4" />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {activity.type === 'photos' && (
                          <div className="mt-3 flex items-center space-x-2">
                            <Camera className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Added {activity.photos} verified photos
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Top Contributors Tab */}
            {activeTab === 'contributors' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Top Contributors</h2>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-3xl">
                              {contributor.avatar}
                            </div>
                            {index < 3 && (
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xl">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{contributor.name}</h3>
                            <span className="text-xl">{contributor.badge}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{contributor.reviews} reviews</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{contributor.helpful} helpful</span>
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          Follow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    New Discussion
                  </button>
                </div>

                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      {discussion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>by <span className="font-medium">{discussion.author}</span></span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{discussion.views} views</span>
                        </span>
                      </div>
                      <span className="text-gray-500">{discussion.lastActive}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    Create Event
                  </button>
                </div>

                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-primary-600">
                          {event.date.split(' ')[1].replace(',', '')}
                        </span>
                        <span className="text-xs text-primary-600 font-medium">
                          {event.date.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded mb-2">
                              {event.category}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {event.title}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </p>
                              <p className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{event.location}</span>
                              </p>
                              <p className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>{event.attendees} attending</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Write a Review</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Camera className="h-5 w-5" />
                  <span className="font-medium">Upload Photos</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Flag className="h-5 w-5" />
                  <span className="font-medium">Report Issue</span>
                </button>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-success-600 mt-0.5" />
                  <span>Be respectful and inclusive</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-success-600 mt-0.5" />
                  <span>Provide honest, helpful reviews</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-success-600 mt-0.5" />
                  <span>Verify information when possible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-success-600 mt-0.5" />
                  <span>Report inappropriate content</span>
                </li>
              </ul>
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Read Full Guidelines →
              </button>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-sm p-6 text-white">
              <h3 className="font-semibold mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary-100">Reviews Written</span>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="w-full bg-primary-700 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '46%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary-100">People Helped</span>
                    <span className="font-bold">487</span>
                  </div>
                  <div className="w-full bg-primary-700 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '73%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary-100">Badges Earned</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {['⭐', '💎', '🌟', '✨', '🎯', '🏆', '🎖️'].map((badge, i) => (
                      <span key={i} className="text-xl">{badge}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
