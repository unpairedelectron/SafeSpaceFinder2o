// MongoDB Schema Definitions for Safe Space Finder
// Use these schemas with Mongoose or Prisma

/**
 * User Schema
 * Represents a user in the system
 */
export const UserSchema = {
  _id: 'ObjectId',
  email: 'String (unique, required)',
  password: 'String (hashed, required)',
  name: 'String (required)',
  avatar: 'String (URL)',
  bio: 'String',
  
  // User preferences and identity
  identities: ['String'], // e.g., ['lgbtq+', 'disability-advocate']
  accessibilityNeeds: ['String'], // e.g., ['wheelchair', 'sign-language']
  preferences: {
    language: 'String (default: "en")',
    notifications: {
      email: 'Boolean (default: true)',
      push: 'Boolean (default: true)',
      newReviews: 'Boolean (default: true)',
      events: 'Boolean (default: true)'
    },
    privacySettings: {
      profilePublic: 'Boolean (default: true)',
      showIdentities: 'Boolean (default: false)',
      anonymousReviews: 'Boolean (default: false)'
    }
  },
  
  // User activity
  reviews: ['ObjectId (ref: Review)'],
  savedBusinesses: ['ObjectId (ref: Business)'],
  following: ['ObjectId (ref: User)'],
  followers: ['ObjectId (ref: User)'],
  
  // Gamification
  badges: [{
    badgeId: 'String',
    earnedAt: 'Date',
    name: 'String',
    icon: 'String'
  }],
  points: 'Number (default: 0)',
  level: 'Number (default: 1)',
  
  // Stats
  reviewCount: 'Number (default: 0)',
  helpfulCount: 'Number (default: 0)',
  photosCount: 'Number (default: 0)',
  
  // Account info
  verified: 'Boolean (default: false)',
  verificationMethod: 'String', // 'email', 'phone', 'id'
  role: 'String (default: "user")', // 'user', 'business-owner', 'moderator', 'admin'
  status: 'String (default: "active")', // 'active', 'suspended', 'deleted'
  
  createdAt: 'Date (auto)',
  updatedAt: 'Date (auto)',
  lastLoginAt: 'Date'
}

/**
 * Business Schema
 * Represents a business/place in the system
 */
export const BusinessSchema = {
  _id: 'ObjectId',
  
  // Basic Information
  name: 'String (required, indexed)',
  slug: 'String (unique, indexed)',
  category: 'String (required, indexed)', // 'restaurant', 'cafe', 'park', etc.
  description: 'String (required)',
  tags: ['String'], // additional categorization
  
  // Location
  address: {
    street: 'String (required)',
    city: 'String (required, indexed)',
    state: 'String (required, indexed)',
    zipCode: 'String (required)',
    country: 'String (default: "USA")',
    coordinates: {
      latitude: 'Number',
      longitude: 'Number'
    }
  },
  
  // Contact
  contact: {
    phone: 'String',
    email: 'String',
    website: 'String',
    socialMedia: {
      facebook: 'String',
      instagram: 'String',
      twitter: 'String'
    }
  },
  
  // Hours
  hours: {
    monday: { open: 'String', close: 'String', closed: 'Boolean' },
    tuesday: { open: 'String', close: 'String', closed: 'Boolean' },
    wednesday: { open: 'String', close: 'String', closed: 'Boolean' },
    thursday: { open: 'String', close: 'String', closed: 'Boolean' },
    friday: { open: 'String', close: 'String', closed: 'Boolean' },
    saturday: { open: 'String', close: 'String', closed: 'Boolean' },
    sunday: { open: 'String', close: 'String', closed: 'Boolean' }
  },
  specialHours: [{
    date: 'Date',
    open: 'String',
    close: 'String',
    closed: 'Boolean',
    reason: 'String' // 'holiday', 'event', etc.
  }],
  
  // Features (Inclusivity)
  features: {
    accessibility: ['String'], // 'wheelchair-accessible', 'elevator', etc.
    identity: ['String'], // 'lgbtq-friendly', 'gender-neutral-restrooms', etc.
    neurodiversity: ['String'], // 'autism-friendly', 'quiet-hours', etc.
    dietary: ['String'], // 'vegan', 'halal', 'kosher', 'gluten-free'
    language: ['String'] // supported languages
  },
  
  // Policies
  policies: {
    inclusive: 'String', // detailed inclusive policies
    accommodations: 'String', // special accommodations offered
    covid: 'String', // COVID-19 policies
    pets: 'String', // pet policies
    children: 'String' // child-friendly policies
  },
  
  // Media
  photos: [{
    url: 'String',
    caption: 'String',
    uploadedBy: 'ObjectId (ref: User)',
    verified: 'Boolean',
    uploadedAt: 'Date'
  }],
  videos: [{
    url: 'String',
    thumbnail: 'String',
    uploadedBy: 'ObjectId (ref: User)',
    uploadedAt: 'Date'
  }],
  
  // Ratings & Reviews
  ratings: {
    overall: 'Number (0-5)',
    safetyScore: 'Number (0-100)',
    accessibility: 'Number (0-5)',
    inclusivity: 'Number (0-5)',
    service: 'Number (0-5)',
    cleanliness: 'Number (0-5)'
  },
  reviewCount: 'Number (default: 0)',
  reviews: ['ObjectId (ref: Review)'],
  
  // Certifications
  certifications: [{
    type: 'String', // 'safe-space', 'accessibility', 'lgbtq-certified'
    issuedBy: 'String',
    issuedAt: 'Date',
    expiresAt: 'Date',
    verificationUrl: 'String'
  }],
  
  // Ownership
  owner: 'ObjectId (ref: User)',
  claimed: 'Boolean (default: false)',
  claimedAt: 'Date',
  verified: 'Boolean (default: false)',
  verifiedAt: 'Date',
  
  // Status
  status: 'String (default: "active")', // 'active', 'pending', 'suspended', 'closed'
  moderationStatus: 'String (default: "approved")', // 'pending', 'approved', 'rejected'
  
  // Analytics
  views: 'Number (default: 0)',
  saves: 'Number (default: 0)',
  shares: 'Number (default: 0)',
  
  createdAt: 'Date (auto)',
  updatedAt: 'Date (auto)'
}

/**
 * Review Schema
 * Represents a user review of a business
 */
export const ReviewSchema = {
  _id: 'ObjectId',
  
  // References
  business: 'ObjectId (ref: Business, required, indexed)',
  user: 'ObjectId (ref: User, required, indexed)',
  
  // Review Content
  rating: 'Number (1-5, required)',
  safetyScore: 'Number (0-100, required)',
  title: 'String',
  comment: 'String (required)',
  
  // Detailed Ratings
  ratings: {
    accessibility: 'Number (1-5)',
    inclusivity: 'Number (1-5)',
    service: 'Number (1-5)',
    cleanliness: 'Number (1-5)',
    value: 'Number (1-5)'
  },
  
  // Features Experienced
  featuresExperienced: ['String'],
  
  // Media
  photos: [{
    url: 'String',
    caption: 'String',
    verified: 'Boolean'
  }],
  videos: [{
    url: 'String',
    thumbnail: 'String'
  }],
  
  // Verification
  verified: 'Boolean (default: false)',
  verificationMethod: 'String', // 'photo', 'receipt', 'check-in'
  visitDate: 'Date',
  
  // Engagement
  helpful: 'Number (default: 0)',
  helpfulBy: ['ObjectId (ref: User)'],
  reported: 'Number (default: 0)',
  reportedBy: ['ObjectId (ref: User)'],
  
  // Responses
  businessResponse: {
    comment: 'String',
    respondedBy: 'ObjectId (ref: User)',
    respondedAt: 'Date'
  },
  replies: [{
    user: 'ObjectId (ref: User)',
    comment: 'String',
    createdAt: 'Date'
  }],
  
  // Moderation
  status: 'String (default: "published")', // 'draft', 'published', 'flagged', 'removed'
  moderationNotes: 'String',
  
  createdAt: 'Date (auto)',
  updatedAt: 'Date (auto)'
}

/**
 * Event Schema
 * Community events related to inclusivity and accessibility
 */
export const EventSchema = {
  _id: 'ObjectId',
  
  // Basic Info
  title: 'String (required)',
  slug: 'String (unique)',
  description: 'String (required)',
  category: 'String', // 'workshop', 'training', 'certification', 'meetup'
  
  // Schedule
  startDate: 'Date (required)',
  endDate: 'Date (required)',
  timezone: 'String',
  
  // Location
  locationType: 'String', // 'physical', 'virtual', 'hybrid'
  venue: {
    name: 'String',
    address: 'String',
    city: 'String',
    state: 'String',
    zipCode: 'String'
  },
  virtualLink: 'String',
  
  // Organization
  organizer: 'ObjectId (ref: User, required)',
  coOrganizers: ['ObjectId (ref: User)'],
  business: 'ObjectId (ref: Business)', // if hosted by a business
  
  // Capacity & Registration
  capacity: 'Number',
  attendees: ['ObjectId (ref: User)'],
  waitlist: ['ObjectId (ref: User)'],
  registrationRequired: 'Boolean (default: false)',
  registrationDeadline: 'Date',
  
  // Accessibility
  accessibilityFeatures: ['String'],
  languagesSupported: ['String'],
  
  // Media
  coverImage: 'String',
  photos: ['String'],
  
  // Engagement
  likes: 'Number (default: 0)',
  shares: 'Number (default: 0)',
  
  // Status
  status: 'String (default: "upcoming")', // 'draft', 'upcoming', 'ongoing', 'completed', 'cancelled'
  
  createdAt: 'Date (auto)',
  updatedAt: 'Date (auto)'
}

/**
 * Discussion Schema
 * Community forum discussions
 */
export const DiscussionSchema = {
  _id: 'ObjectId',
  
  // Content
  title: 'String (required)',
  slug: 'String (unique)',
  body: 'String (required)',
  
  // Categorization
  category: 'String', // 'question', 'discussion', 'experience', 'tip'
  tags: ['String'],
  
  // Author
  author: 'ObjectId (ref: User, required)',
  authorAnonymous: 'Boolean (default: false)',
  
  // Engagement
  views: 'Number (default: 0)',
  likes: 'Number (default: 0)',
  likedBy: ['ObjectId (ref: User)'],
  
  // Replies
  replies: [{
    author: 'ObjectId (ref: User)',
    body: 'String',
    likes: 'Number',
    likedBy: ['ObjectId (ref: User)'],
    createdAt: 'Date'
  }],
  replyCount: 'Number (default: 0)',
  
  // Moderation
  pinned: 'Boolean (default: false)',
  locked: 'Boolean (default: false)',
  status: 'String (default: "active")', // 'active', 'flagged', 'removed'
  
  // Meta
  lastActivityAt: 'Date',
  createdAt: 'Date (auto)',
  updatedAt: 'Date (auto)'
}

/**
 * Notification Schema
 * User notifications
 */
export const NotificationSchema = {
  _id: 'ObjectId',
  
  // Recipient
  user: 'ObjectId (ref: User, required)',
  
  // Content
  type: 'String (required)', // 'review', 'reply', 'follow', 'event', 'update', 'achievement'
  title: 'String (required)',
  message: 'String (required)',
  
  // References
  relatedBusiness: 'ObjectId (ref: Business)',
  relatedReview: 'ObjectId (ref: Review)',
  relatedUser: 'ObjectId (ref: User)',
  relatedEvent: 'ObjectId (ref: Event)',
  
  // Link
  actionUrl: 'String',
  actionText: 'String',
  
  // Status
  read: 'Boolean (default: false)',
  readAt: 'Date',
  
  createdAt: 'Date (auto)'
}

/**
 * Report Schema
 * Content moderation reports
 */
export const ReportSchema = {
  _id: 'ObjectId',
  
  // Reporter
  reporter: 'ObjectId (ref: User, required)',
  
  // Reported Content
  contentType: 'String (required)', // 'business', 'review', 'discussion', 'user'
  contentId: 'ObjectId (required)',
  
  // Report Details
  reason: 'String (required)', // 'inappropriate', 'false-info', 'spam', 'hate-speech'
  description: 'String',
  
  // Status
  status: 'String (default: "pending")', // 'pending', 'reviewed', 'resolved', 'dismissed'
  moderator: 'ObjectId (ref: User)',
  moderatorNotes: 'String',
  action: 'String', // 'removed', 'warned', 'no-action'
  actionedAt: 'Date',
  
  createdAt: 'Date (auto)',
  updatedAt: 'Date (auto)'
}

// Indexes for better query performance
export const Indexes = {
  User: [
    { email: 1 },
    { createdAt: -1 },
    { 'identities': 1 },
    { 'level': -1, 'points': -1 }
  ],
  
  Business: [
    { name: 'text', description: 'text' }, // Full-text search
    { 'address.city': 1, 'address.state': 1 },
    { 'address.coordinates': '2dsphere' }, // Geospatial queries
    { category: 1 },
    { 'ratings.safetyScore': -1 },
    { 'ratings.overall': -1 },
    { status: 1 },
    { createdAt: -1 }
  ],
  
  Review: [
    { business: 1, createdAt: -1 },
    { user: 1, createdAt: -1 },
    { rating: -1 },
    { safetyScore: -1 },
    { status: 1 }
  ],
  
  Event: [
    { startDate: 1 },
    { status: 1 },
    { 'venue.city': 1 },
    { createdAt: -1 }
  ],
  
  Discussion: [
    { category: 1, lastActivityAt: -1 },
    { tags: 1 },
    { author: 1 },
    { createdAt: -1 }
  ],
  
  Notification: [
    { user: 1, read: 1, createdAt: -1 }
  ]
}
