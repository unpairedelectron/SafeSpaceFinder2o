'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  BarChart3,
  Users,
  MapPin,
  MessageSquare,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search
} from 'lucide-react'

// Mock dashboard stats
const mockStats = {
  totalUsers: 12845,
  userGrowth: 12.5,
  totalBusinesses: 3421,
  businessGrowth: 8.3,
  totalReviews: 8934,
  reviewGrowth: 15.2,
  pendingReports: 23,
  averageSafetyScore: 87.3
}

// Mock recent reports
const mockReports = [
  {
    id: '1',
    type: 'review',
    targetName: 'Review by Sarah M.',
    reason: 'Inappropriate content',
    status: 'pending',
    createdAt: '2 hours ago',
    priority: 'high'
  },
  {
    id: '2',
    type: 'business',
    targetName: 'Downtown Diner',
    reason: 'Inaccurate information',
    status: 'reviewing',
    createdAt: '5 hours ago',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'user',
    targetName: 'User: john_doe',
    reason: 'Spam reviews',
    status: 'pending',
    createdAt: '1 day ago',
    priority: 'high'
  }
]

// Mock recent activities
const mockActivities = [
  {
    id: '1',
    type: 'business',
    action: 'New business added',
    details: 'Inclusive Café by admin@example.com',
    timestamp: '10 minutes ago'
  },
  {
    id: '2',
    type: 'review',
    action: 'High-value review',
    details: '5-star review for Rainbow Café',
    timestamp: '1 hour ago'
  },
  {
    id: '3',
    type: 'report',
    action: 'Report resolved',
    details: 'Inappropriate content report dismissed',
    timestamp: '2 hours ago'
  },
  {
    id: '4',
    type: 'user',
    action: 'New user registered',
    details: 'alex.johnson@example.com',
    timestamp: '3 hours ago'
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'users' | 'businesses'>('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const handleReportAction = (reportId: string, action: 'approve' | 'dismiss') => {
    // In production: Call API to update report status
    console.log(`Report ${reportId} ${action}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Shield className="w-10 h-10 text-purple-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Monitor and manage the Safe Space Finder community</p>
        </div>

        {/* Stats Grid */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Users */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    mockStats.userGrowth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {mockStats.userGrowth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(mockStats.userGrowth)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>

              {/* Total Businesses */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    mockStats.businessGrowth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {mockStats.businessGrowth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(mockStats.businessGrowth)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.totalBusinesses.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Businesses</div>
              </div>

              {/* Total Reviews */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    mockStats.reviewGrowth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {mockStats.reviewGrowth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(mockStats.reviewGrowth)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.totalReviews.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>

              {/* Pending Reports */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  {mockStats.pendingReports > 0 && (
                    <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                      Action Needed
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.pendingReports}
                </div>
                <div className="text-sm text-gray-600">Pending Reports</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Safety Score Overview */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    Average Safety Score
                  </h3>
                  <span className="text-2xl font-bold text-green-600">{mockStats.averageSafetyScore}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Excellent (90-100)</span>
                      <span className="font-medium text-gray-900">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Good (80-89)</span>
                      <span className="font-medium text-gray-900">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Fair (70-79)</span>
                      <span className="font-medium text-gray-900">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Poor (&lt;70)</span>
                      <span className="font-medium text-gray-900">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'business' ? 'bg-blue-100' :
                        activity.type === 'review' ? 'bg-green-100' :
                        activity.type === 'report' ? 'bg-red-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'business' && <MapPin className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'review' && <MessageSquare className="w-4 h-4 text-green-600" />}
                        {activity.type === 'report' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        {activity.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600 truncate">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Reports Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-7 h-7 text-red-600" />
              Pending Reports
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        report.type === 'review' ? 'bg-green-100 text-green-700' :
                        report.type === 'business' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {report.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        report.priority === 'high' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.priority} priority
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        report.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{report.targetName}</h4>
                    <p className="text-gray-700 mb-2">Reason: {report.reason}</p>
                    <p className="text-sm text-gray-500">{report.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReportAction(report.id, 'approve')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Take Action
                    </button>
                    <button
                      onClick={() => handleReportAction(report.id, 'dismiss')}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Dismiss
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockReports.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
              <p className="text-gray-600">No pending reports at the moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
