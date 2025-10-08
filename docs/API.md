# API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

## Endpoints

### Authentication

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/login`
Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/logout`
Logout current user (requires authentication).

**Response:** `200 OK`

---

### Businesses

#### GET `/api/businesses`
Get list of businesses with filters.

**Query Parameters:**
- `search` (string): Search term
- `category` (string): Business category
- `lat` (number): Latitude for location-based search
- `lng` (number): Longitude for location-based search
- `radius` (number): Search radius in kilometers (default: 10)
- `features` (string[]): Filter by accessibility features
- `minRating` (number): Minimum safety score (0-100)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Response:** `200 OK`
```json
{
  "businesses": [
    {
      "id": "biz_123",
      "name": "Inclusive Cafe",
      "category": "Cafe",
      "address": "123 Main St, City",
      "coordinates": {
        "lat": 40.7128,
        "lng": -74.0060
      },
      "safetyScore": 92,
      "features": ["wheelchair-accessible", "lgbtq-friendly"],
      "reviewCount": 48,
      "averageRating": 4.5
    }
  ],
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

#### GET `/api/businesses/[id]`
Get detailed business information.

**Response:** `200 OK`
```json
{
  "id": "biz_123",
  "name": "Inclusive Cafe",
  "category": "Cafe",
  "address": "123 Main St, City",
  "coordinates": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "phone": "+1234567890",
  "website": "https://inclusivecafe.com",
  "hours": {
    "monday": "8:00 AM - 10:00 PM",
    "tuesday": "8:00 AM - 10:00 PM"
  },
  "safetyScore": 92,
  "features": {
    "accessibility": ["wheelchair-accessible", "braille-menu"],
    "identity": ["lgbtq-friendly", "poc-owned"],
    "neurodiversity": ["quiet-space", "sensory-friendly"]
  },
  "photos": ["url1", "url2"],
  "reviews": [],
  "verifiedAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/api/businesses`
Create a new business listing (requires authentication).

**Request Body:**
```json
{
  "name": "New Cafe",
  "category": "Cafe",
  "address": "456 Side St, City",
  "coordinates": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "phone": "+1234567890",
  "website": "https://newcafe.com",
  "features": ["wheelchair-accessible", "lgbtq-friendly"],
  "photos": ["photo_url"]
}
```

**Response:** `201 Created`

#### PATCH `/api/businesses/[id]`
Update business information (requires authentication and ownership/admin).

**Request Body:** Partial business object

**Response:** `200 OK`

#### DELETE `/api/businesses/[id]`
Delete business (requires admin role).

**Response:** `204 No Content`

---

### Reviews

#### GET `/api/reviews`
Get reviews with filters.

**Query Parameters:**
- `businessId` (string): Filter by business
- `userId` (string): Filter by user
- `minRating` (number): Minimum rating
- `page` (number): Page number
- `limit` (number): Items per page

**Response:** `200 OK`
```json
{
  "reviews": [
    {
      "id": "rev_123",
      "businessId": "biz_123",
      "userId": "user_456",
      "userName": "Jane Doe",
      "rating": 5,
      "safetyRating": 95,
      "comment": "Very welcoming and accessible!",
      "features": ["wheelchair-accessible"],
      "photos": ["photo_url"],
      "verified": true,
      "helpfulCount": 24,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 48,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### POST `/api/reviews`
Create a new review (requires authentication).

**Request Body:**
```json
{
  "businessId": "biz_123",
  "rating": 5,
  "safetyRating": 95,
  "comment": "Great place!",
  "features": ["wheelchair-accessible"],
  "photos": ["photo_url"]
}
```

**Response:** `201 Created`

---

### Notifications

#### GET `/api/notifications`
Get user notifications (requires authentication).

**Query Parameters:**
- `unreadOnly` (boolean): Show only unread notifications
- `page` (number): Page number
- `limit` (number): Items per page

**Response:** `200 OK`
```json
{
  "notifications": [
    {
      "id": "notif_123",
      "type": "review_reply",
      "title": "New reply to your review",
      "message": "Someone replied to your review of Inclusive Cafe",
      "read": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "actionUrl": "/business/biz_123"
    }
  ],
  "unreadCount": 3
}
```

#### PATCH `/api/notifications/[id]`
Mark notification as read (requires authentication).

**Response:** `200 OK`

#### POST `/api/notifications/mark-all-read`
Mark all notifications as read (requires authentication).

**Response:** `200 OK`

---

### Users

#### GET `/api/users/[id]`
Get user profile.

**Response:** `200 OK`
```json
{
  "id": "user_123",
  "name": "John Doe",
  "avatar": "avatar_url",
  "bio": "Accessibility advocate",
  "identities": ["lgbtq+"],
  "accessibilityNeeds": ["wheelchair"],
  "verifiedReviewer": true,
  "reviewCount": 15,
  "helpfulVotes": 42,
  "joinedAt": "2023-06-01T00:00:00Z"
}
```

#### PATCH `/api/users/[id]`
Update user profile (requires authentication and ownership).

**Request Body:** Partial user object

**Response:** `200 OK`

---

### Reports

#### POST `/api/reports`
Report a business or review (requires authentication).

**Request Body:**
```json
{
  "entityType": "business",
  "entityId": "biz_123",
  "reason": "inaccurate_information",
  "description": "Business is permanently closed"
}
```

**Response:** `201 Created`

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400,
    "details": {}
  }
}
```

### Error Codes

- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource already exists
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_SERVER_ERROR` (500): Server error

---

## Rate Limiting

API requests are rate-limited:
- **100 requests per 15 minutes** per IP address
- **1000 requests per hour** for authenticated users

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response includes:**
```json
{
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

## Webhooks

Configure webhooks in your account settings to receive real-time updates:

### Events
- `business.created`
- `business.updated`
- `review.created`
- `report.created`

### Payload Format
```json
{
  "event": "review.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "rev_123",
    "businessId": "biz_123"
  }
}
```
