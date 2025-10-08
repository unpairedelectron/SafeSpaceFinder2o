// Core types for Safe Space Finder application

export interface Business {
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
  phone?: string
  website?: string
  hours?: BusinessHours
  photos?: string[]
  certifications?: string[]
}

export interface BusinessHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export interface Review {
  id: string
  businessId: string
  userId: string
  userName: string
  rating: number
  safetyScore: number
  comment: string
  features: string[]
  photos: string[]
  verified: boolean
  helpful: number
  createdAt: Date
  userIdentities?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  identities: string[]
  accessibilityNeeds: string[]
  verified: boolean
  reviews: string[]
  savedBusinesses: string[]
  createdAt: Date
}

export interface Filter {
  id: string
  label: string
  category: 'accessibility' | 'identity' | 'neurodiversity'
  icon: string
}

export interface SearchParams {
  query: string
  location?: {
    lat: number
    lng: number
  }
  radius?: number
  filters: string[]
  sortBy?: 'distance' | 'rating' | 'safetyScore'
}

export interface Notification {
  id: string
  userId: string
  type: 'update' | 'event' | 'review' | 'certification'
  title: string
  message: string
  businessId?: string
  read: boolean
  createdAt: Date
}

export type SafetyScoreLevel = 'excellent' | 'good' | 'fair' | 'poor'

export interface Certification {
  id: string
  businessId: string
  type: 'safe-space' | 'accessibility' | 'lgbtq-friendly' | 'autism-certified'
  verifiedBy: string
  verifiedAt: Date
  expiresAt?: Date
}

// Additional types for scaling

export interface Report {
  id: string
  reportType: 'business' | 'review' | 'user'
  targetId: string
  targetName?: string
  reporterId: string
  reason: string
  description?: string
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed'
  priority: 'low' | 'medium' | 'high'
  assignedTo?: string
  resolution?: string
  createdAt: Date
  updatedAt?: Date
  resolvedAt?: Date
}

export interface Event {
  id: string
  title: string
  description: string
  businessId?: string
  organizerId: string
  startDate: Date
  endDate: Date
  location: {
    address: string
    lat: number
    lng: number
  }
  attendees: string[]
  maxAttendees?: number
  features: string[]
  image?: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: Date
}

export interface Analytics {
  date: Date
  totalUsers: number
  activeUsers: number
  newUsers: number
  totalBusinesses: number
  newBusinesses: number
  totalReviews: number
  newReviews: number
  averageSafetyScore: number
  pendingReports: number
}
