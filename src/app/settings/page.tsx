'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Bell,
  BellOff,
  Shield,
  User,
  Lock,
  Globe,
  Eye,
  MapPin,
  Heart,
  MessageSquare,
  Smartphone,
  Mail,
  Moon,
  Sun,
  ChevronRight,
  Check,
  X
} from 'lucide-react'

interface NotificationSetting {
  id: string
  label: string
  description: string
  enabled: boolean
  category: 'updates' | 'community' | 'safety' | 'marketing'
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'account' | 'privacy' | 'notifications' | 'accessibility'>('account')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'new-reviews',
      label: 'New Reviews',
      description: 'Get notified when businesses you saved receive new reviews',
      enabled: true,
      category: 'updates'
    },
    {
      id: 'safety-updates',
      label: 'Safety Score Changes',
      description: 'Alert me when safety scores change for saved places',
      enabled: true,
      category: 'safety'
    },
    {
      id: 'community-mentions',
      label: 'Community Mentions',
      description: 'Notify me when someone mentions or replies to my reviews',
      enabled: true,
      category: 'community'
    },
    {
      id: 'nearby-places',
      label: 'Nearby Safe Spaces',
      description: 'Discover new safe spaces near your location',
      enabled: false,
      category: 'updates'
    },
    {
      id: 'weekly-digest',
      label: 'Weekly Digest',
      description: 'Receive a weekly summary of community activity',
      enabled: true,
      category: 'community'
    },
    {
      id: 'promotional',
      label: 'Promotional Emails',
      description: 'Receive updates about new features and partnerships',
      enabled: false,
      category: 'marketing'
    }
  ])

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
    ))
  }

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public' as 'public' | 'community' | 'private',
    showLocation: true,
    showReviews: true,
    showSavedPlaces: false,
    allowMessages: true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account, privacy, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-lg p-2 space-y-1">
              <button
                onClick={() => setActiveSection('account')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'account'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Account</span>
              </button>
              <button
                onClick={() => setActiveSection('privacy')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'privacy'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Privacy</span>
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'notifications'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
              </button>
              <button
                onClick={() => setActiveSection('accessibility')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'accessibility'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Accessibility</span>
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Account Settings */}
              {activeSection === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h2>
                    <p className="text-gray-600">Manage your account information and preferences</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="alex.johnson@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                      <input
                        type="text"
                        defaultValue="Alex Johnson"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-purple-600 transition-colors py-3">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5" />
                          <span className="font-medium">Change Password</span>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <button className="flex items-center justify-between w-full text-left text-red-600 hover:text-red-700 transition-colors py-3">
                        <div className="flex items-center gap-3">
                          <X className="w-5 h-5" />
                          <span className="font-medium">Delete Account</span>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Privacy Settings</h2>
                    <p className="text-gray-600">Control who can see your information and activity</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Profile Visibility</label>
                      <div className="space-y-2">
                        {(['public', 'community', 'private'] as const).map((option) => (
                          <label key={option} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                            <input
                              type="radio"
                              name="visibility"
                              checked={privacySettings.profileVisibility === option}
                              onChange={() => setPrivacySettings({ ...privacySettings, profileVisibility: option })}
                              className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 capitalize">{option}</div>
                              <div className="text-sm text-gray-600">
                                {option === 'public' && 'Anyone can see your profile'}
                                {option === 'community' && 'Only verified community members can see your profile'}
                                {option === 'private' && 'Only you can see your profile'}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Show My Location</div>
                            <div className="text-sm text-gray-600">Let others see your approximate location</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showLocation}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, showLocation: e.target.checked })}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Show My Reviews</div>
                            <div className="text-sm text-gray-600">Display your reviews on your public profile</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showReviews}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, showReviews: e.target.checked })}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Show Saved Places</div>
                            <div className="text-sm text-gray-600">Let others see places you've saved</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showSavedPlaces}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, showSavedPlaces: e.target.checked })}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Allow Direct Messages</div>
                            <div className="text-sm text-gray-600">Let community members send you messages</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.allowMessages}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, allowMessages: e.target.checked })}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Notification Preferences</h2>
                    <p className="text-gray-600">Choose what notifications you want to receive</p>
                  </div>

                  <div className="space-y-6">
                    {/* Updates */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-purple-600" />
                        Updates & Activity
                      </h3>
                      <div className="space-y-2">
                        {notifications.filter(n => n.category === 'updates').map((notif) => (
                          <label key={notif.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{notif.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{notif.description}</div>
                            </div>
                            <input
                              type="checkbox"
                              checked={notif.enabled}
                              onChange={() => toggleNotification(notif.id)}
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mt-1 ml-4"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Community */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        Community
                      </h3>
                      <div className="space-y-2">
                        {notifications.filter(n => n.category === 'community').map((notif) => (
                          <label key={notif.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{notif.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{notif.description}</div>
                            </div>
                            <input
                              type="checkbox"
                              checked={notif.enabled}
                              onChange={() => toggleNotification(notif.id)}
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mt-1 ml-4"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Safety */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        Safety Alerts
                      </h3>
                      <div className="space-y-2">
                        {notifications.filter(n => n.category === 'safety').map((notif) => (
                          <label key={notif.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{notif.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{notif.description}</div>
                            </div>
                            <input
                              type="checkbox"
                              checked={notif.enabled}
                              onChange={() => toggleNotification(notif.id)}
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mt-1 ml-4"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Marketing */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-pink-600" />
                        Marketing & Updates
                      </h3>
                      <div className="space-y-2">
                        {notifications.filter(n => n.category === 'marketing').map((notif) => (
                          <label key={notif.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{notif.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{notif.description}</div>
                            </div>
                            <input
                              type="checkbox"
                              checked={notif.enabled}
                              onChange={() => toggleNotification(notif.id)}
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mt-1 ml-4"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Accessibility Settings */}
              {activeSection === 'accessibility' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Accessibility Preferences</h2>
                    <p className="text-gray-600">Customize the app to fit your needs</p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                        <div>
                          <div className="font-medium text-gray-900">Dark Mode</div>
                          <div className="text-sm text-gray-600">Reduce eye strain with dark theme</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                      />
                    </label>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Text Size</label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        defaultValue="1"
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Screen Reader Support</h4>
                          <p className="text-sm text-gray-700">
                            This app is optimized for screen readers with proper ARIA labels and semantic HTML.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Keyboard Navigation</h4>
                          <p className="text-sm text-gray-700">
                            All features can be accessed using keyboard shortcuts. Press '?' to see available shortcuts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
