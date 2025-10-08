'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Bell,
  Check,
  Heart,
  MessageSquare,
  Shield,
  Star,
  AlertCircle,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Users,
  X
} from 'lucide-react'

interface Notification {
  id: string
  type: 'review' | 'safety' | 'community' | 'achievement' | 'update'
  title: string
  message: string
  businessName?: string
  businessId?: string
  timestamp: string
  read: boolean
  icon: 'heart' | 'message' | 'shield' | 'star' | 'alert' | 'award'
  priority: 'low' | 'medium' | 'high'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'safety',
    title: 'Safety Score Update',
    message: 'Rainbow Café safety score increased to 95 - Community members reported improved accessibility',
    businessName: 'Rainbow Café',
    businessId: '1',
    timestamp: '2 hours ago',
    read: false,
    icon: 'shield',
    priority: 'high'
  },
  {
    id: '2',
    type: 'community',
    title: 'New Review Response',
    message: 'The owner of Accessible Eats responded to your review',
    businessName: 'Accessible Eats',
    businessId: '2',
    timestamp: '5 hours ago',
    read: false,
    icon: 'message',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'You\'ve earned the "Community Champion" badge for 50 helpful reviews',
    timestamp: '1 day ago',
    read: false,
    icon: 'award',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'review',
    title: 'Saved Place Review',
    message: 'Peaceful Gardens has 3 new reviews from community members',
    businessName: 'Peaceful Gardens',
    businessId: '3',
    timestamp: '1 day ago',
    read: true,
    icon: 'star',
    priority: 'low'
  },
  {
    id: '5',
    type: 'community',
    title: 'Someone Found Your Review Helpful',
    message: '5 people found your review of Rainbow Café helpful',
    businessName: 'Rainbow Café',
    businessId: '1',
    timestamp: '2 days ago',
    read: true,
    icon: 'heart',
    priority: 'low'
  },
  {
    id: '6',
    type: 'update',
    title: 'New Safe Space Nearby',
    message: 'Inclusive Yoga Studio opened 0.3 miles from you - Check it out!',
    businessName: 'Inclusive Yoga Studio',
    businessId: '4',
    timestamp: '3 days ago',
    read: true,
    icon: 'alert',
    priority: 'medium'
  },
  {
    id: '7',
    type: 'community',
    title: 'Community Event',
    message: 'Join us for the Safe Spaces Community Meetup this Saturday at Rainbow Café',
    businessName: 'Rainbow Café',
    businessId: '1',
    timestamp: '4 days ago',
    read: true,
    icon: 'message',
    priority: 'medium'
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'safety' | 'community'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'heart': return Heart
      case 'message': return MessageSquare
      case 'shield': return Shield
      case 'star': return Star
      case 'alert': return AlertCircle
      case 'award': return Award
      default: return Bell
    }
  }

  const getIconColor = (priority: string, read: boolean) => {
    if (read) return 'text-gray-400'
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-purple-500'
      case 'low': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    return notif.type === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Bell className="w-10 h-10 text-purple-600" />
                Notifications
              </h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('safety')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filter === 'safety'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              Safety
            </button>
            <button
              onClick={() => setFilter('community')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filter === 'community'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Community
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'You\'re all caught up! Check back later for updates.'
                  : `No ${filter} notifications at the moment.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = getIconComponent(notification.icon)
              const iconColor = getIconColor(notification.priority, notification.read)
              
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group ${
                    !notification.read ? 'border-l-4 border-purple-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        notification.read ? 'bg-gray-100' : 'bg-purple-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className={`font-semibold mb-1 ${
                              notification.read ? 'text-gray-700' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                            {notification.businessName && (
                              <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                {notification.businessName}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {notification.timestamp}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        <p className={`text-sm mb-3 ${
                          notification.read ? 'text-gray-600' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                            >
                              <Check className="w-4 h-4" />
                              Mark as read
                            </button>
                          )}
                          {notification.businessId && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                // Navigate to business
                              }}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                              View Business
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Empty State for Filtered View */}
        {filteredNotifications.length === 0 && notifications.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setFilter('all')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View all notifications
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
