# 🔌 Backend Integration Guide - Safe Space Finder

## 📋 Current Status

### ✅ What's Already Complete
- ✅ **UI/UX:** 25 components, 9 enhanced pages, animations, dark mode
- ✅ **Database Models:** User, Business, Review models with Mongoose
- ✅ **Database Connection:** MongoDB connection utility with caching
- ✅ **API Routes:** 9 API endpoints created (auth, businesses, users, reviews, notifications, reports)
- ✅ **Seed Script:** Test data generator with 8 businesses, 4 users, 6 reviews
- ✅ **Documentation:** Comprehensive setup guides
- ✅ **Dependencies:** All required packages installed (mongoose, next-auth, bcrypt, axios, etc.)

### 🔄 What Needs Integration
- 🔄 **Environment Setup:** Configure MongoDB Atlas & Google Maps API keys
- 🔄 **API Route Enhancement:** Complete CRUD operations
- 🔄 **Frontend-Backend Connection:** Connect enhanced pages to API
- 🔄 **Authentication:** Setup NextAuth.js with credentials provider
- 🔄 **Image Upload:** Implement Cloudinary/S3 integration
- 🔄 **Real-time Features:** Add WebSocket support for notifications
- 🔄 **Testing:** Unit tests & E2E tests

---

## 🚀 Phase 1: Environment Setup (30 minutes)

### Step 1: Setup MongoDB Atlas (15 min)

1. **Create MongoDB Atlas Account**
   ```
   Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google
   - Create organization: "SafeSpaceFinder"
   ```

2. **Create Free Cluster**
   ```
   - Choose M0 (Free tier)
   - Provider: AWS (or preferred)
   - Region: Closest to you
   - Cluster Name: "safespace-cluster"
   ```

3. **Create Database User**
   ```
   - Username: safespace_admin
   - Password: Generate secure password (save it!)
   - Built-in Role: Read and write to any database
   ```

4. **Configure Network Access**
   ```
   - Add IP Address: 0.0.0.0/0 (allows all - for development)
   - Description: "Development Access"
   ```

5. **Get Connection String**
   ```
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string:
     mongodb+srv://safespace_admin:<password>@safespace-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   - Replace <password> with your actual password
   ```

### Step 2: Setup Google Maps API (15 min)

1. **Create Google Cloud Project**
   ```
   Visit: https://console.cloud.google.com/
   - Create new project: "Safe Space Finder"
   - Enable billing (required, but free tier available)
   ```

2. **Enable Required APIs**
   ```
   Navigate to "APIs & Services" > "Library"
   Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Maps Static API
   ```

3. **Create API Key**
   ```
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
   - (Optional) Restrict key to your APIs
   ```

### Step 3: Configure Environment Variables

1. **Generate Secrets**
   ```powershell
   node scripts/generate-secrets.js
   ```

2. **Create .env.local File**
   ```bash
   # Copy template
   cp .env.local.template .env.local
   
   # Or manually create with this content:
   ```

3. **Fill in .env.local**
   ```bash
   # App Configuration
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Database
   MONGODB_URI=mongodb+srv://safespace_admin:YOUR_PASSWORD@safespace-cluster.xxxxx.mongodb.net/safespace?retryWrites=true&w=majority
   
   # Authentication
   JWT_SECRET=YOUR_GENERATED_SECRET_1
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=YOUR_GENERATED_SECRET_2
   
   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

### Step 4: Seed Database

```powershell
# Run seed script to populate test data
npm run seed
```

**Expected Output:**
```
🌱 Seeding database...
✅ Connected to MongoDB
✅ Database cleared
✅ Created 4 test users
✅ Created 8 sample businesses
✅ Created 6 reviews
🎉 Database seeded successfully!

📝 Test Credentials:
Admin: admin@safespace.com / Admin123!
User: user@safespace.com / User123!
```

---

## 🔌 Phase 2: API Route Enhancement (2-3 hours)

### Priority 1: Authentication Routes

#### File: `src/app/api/auth/[...nextauth]/route.ts`

<function_calls>
<invoke name="read_file">
<parameter name="filePath">c:\Users\2245109\OneDrive - Cognizant\Documents\SafespaceFinder\src\app\api\auth\login\route.ts
```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/lib/database/mongodb';
import { User } from '@/lib/models';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide email and password');
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !(await user.comparePassword(credentials.password))) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.avatar,
          role: user.role
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Priority 2: Business Routes

#### Enhanced Business List Endpoint

```typescript
// src/app/api/businesses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database/mongodb';
import { Business } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const minScore = parseFloat(searchParams.get('minScore') || '0');
    
    // Features filters
    const wheelchair = searchParams.get('wheelchair') === 'true';
    const lgbtq = searchParams.get('lgbtq') === 'true';
    const autismFriendly = searchParams.get('autismFriendly') === 'true';

    // Build query
    const query: any = { status: 'approved' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) query.category = category;
    if (city) query['address.city'] = city;
    if (minScore > 0) query.safetyScore = { $gte: minScore };

    if (wheelchair) query['features.accessibility.wheelchair'] = true;
    if (lgbtq) query['features.identity.lgbtqFriendly'] = true;
    if (autismFriendly) query['features.neurodiversity.autismFriendly'] = true;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [businesses, total] = await Promise.all([
      Business.find(query)
        .select('-__v')
        .sort({ safetyScore: -1, reviewCount: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Business.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: businesses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Business fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields
    const { name, category, description, address, contact } = body;
    if (!name || !category || !description || !address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create business
    const business = await Business.create({
      ...body,
      status: 'pending', // Requires admin approval
      ownerId: request.headers.get('user-id'), // From auth middleware
    });

    return NextResponse.json({
      success: true,
      data: business
    }, { status: 201 });
  } catch (error) {
    console.error('Business creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create business' },
      { status: 500 }
    );
  }
}
```

### Priority 3: Review Routes

```typescript
// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database/mongodb';
import { Review, Business } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const userId = request.headers.get('user-id'); // From auth middleware

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { businessId, rating, comment, features, photos } = body;

    if (!businessId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Invalid review data' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this business
    const existingReview = await Review.findOne({ userId, businessId });
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this business' },
        { status: 400 }
      );
    }

    // Create review
    const review = await Review.create({
      userId,
      businessId,
      rating,
      comment,
      features,
      photos,
      verified: true, // Implement verification logic
    });

    // Update business review count and score (handled by post-save hook)

    return NextResponse.json({
      success: true,
      data: review
    }, { status: 201 });
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
```

---

## 🎨 Phase 3: Frontend-Backend Connection (3-4 hours)

### Step 1: Create API Client Utility

```typescript
// src/lib/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Redirect to login
          window.location.href = '/auth/signin';
        }
        return Promise.reject(error);
      }
    );
  }

  // Business APIs
  async getBusinesses(params?: Record<string, any>) {
    const { data } = await this.client.get('/api/businesses', { params });
    return data;
  }

  async getBusiness(id: string) {
    const { data } = await this.client.get(`/api/businesses/${id}`);
    return data;
  }

  async createBusiness(business: any) {
    const { data } = await this.client.post('/api/businesses', business);
    return data;
  }

  async updateBusiness(id: string, updates: any) {
    const { data } = await this.client.patch(`/api/businesses/${id}`, updates);
    return data;
  }

  // Review APIs
  async getReviews(businessId: string, params?: Record<string, any>) {
    const { data } = await this.client.get('/api/reviews', {
      params: { businessId, ...params }
    });
    return data;
  }

  async createReview(review: any) {
    const { data } = await this.client.post('/api/reviews', review);
    return data;
  }

  // User APIs
  async getProfile(userId: string) {
    const { data } = await this.client.get(`/api/users/${userId}`);
    return data;
  }

  async updateProfile(userId: string, updates: any) {
    const { data } = await this.client.patch(`/api/users/${userId}`, updates);
    return data;
  }

  // Auth APIs
  async login(email: string, password: string) {
    const { data } = await this.client.post('/api/auth/login', {
      email,
      password
    });
    return data;
  }

  async signup(userData: any) {
    const { data } = await this.client.post('/api/auth/signup', userData);
    return data;
  }

  async logout() {
    const { data } = await this.client.post('/api/auth/logout');
    return data;
  }
}

export const apiClient = new APIClient();
export default apiClient;
```

### Step 2: Create Custom Hooks for Data Fetching

```typescript
// src/hooks/useBusinesses.ts
import useSWR from 'swr';
import { apiClient } from '@/lib/api-client';

interface UseBusinessesOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  city?: string;
  minScore?: number;
  features?: {
    wheelchair?: boolean;
    lgbtq?: boolean;
    autismFriendly?: boolean;
  };
}

export function useBusinesses(options: UseBusinessesOptions = {}) {
  const params = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue) params.append(subKey, String(subValue));
        });
      } else {
        params.append(key, String(value));
      }
    }
  });

  const { data, error, mutate, isLoading } = useSWR(
    `/api/businesses?${params.toString()}`,
    () => apiClient.getBusinesses(options)
  );

  return {
    businesses: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  };
}

export function useBusiness(id: string) {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `/api/businesses/${id}` : null,
    () => apiClient.getBusiness(id)
  );

  return {
    business: data?.data,
    isLoading,
    error,
    mutate,
  };
}
```

```typescript
// src/hooks/useReviews.ts
import useSWR from 'swr';
import { apiClient } from '@/lib/api-client';

export function useReviews(businessId: string, page: number = 1) {
  const { data, error, mutate, isLoading } = useSWR(
    businessId ? `/api/reviews?businessId=${businessId}&page=${page}` : null,
    () => apiClient.getReviews(businessId, { page })
  );

  return {
    reviews: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  };
}
```

### Step 3: Update Enhanced Pages to Use Real Data

#### Example: Discover Page

```typescript
// src/app/discover/page.tsx
'use client';

import { useState } from 'react';
import { useBusinesses } from '@/hooks/useBusinesses';
import { BusinessCard } from '@/components/BusinessCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { Skeleton } from '@/components/ui/Skeleton';
import { PageTransition } from '@/components/animations/PageTransitions';

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    minScore: 0,
    wheelchair: false,
    lgbtq: false,
    autismFriendly: false,
  });
  const [page, setPage] = useState(1);

  const { businesses, pagination, isLoading, error } = useBusinesses({
    search,
    ...filters,
    page,
    limit: 12,
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search businesses..."
            className="mb-6"
          />

          {/* Filters */}
          <FilterBar
            filters={filters}
            onChange={setFilters}
            className="mb-8"
          />

          {/* Results */}
          {error && (
            <div className="text-center text-red-600 py-8">
              Failed to load businesses. Please try again.
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No businesses found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business: any) => (
                  <BusinessCard key={business._id} business={business} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {page} of {pagination.pages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                    disabled={page === pagination.pages}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
```

---

## 📸 Phase 4: Image Upload Integration (1-2 hours)

### Option A: Cloudinary (Recommended)

1. **Setup Cloudinary**
   ```
   Visit: https://cloudinary.com/users/register/free
   - Create free account
   - Get Cloud Name, API Key, API Secret
   ```

2. **Install Package**
   ```powershell
   npm install cloudinary
   ```

3. **Create Upload API Route**
   ```typescript
   // src/app/api/upload/route.ts
   import { v2 as cloudinary } from 'cloudinary';
   import { NextRequest, NextResponse } from 'next/server';

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   export async function POST(request: NextRequest) {
     try {
       const formData = await request.formData();
       const file = formData.get('file') as File;

       if (!file) {
         return NextResponse.json(
           { error: 'No file provided' },
           { status: 400 }
         );
       }

       const bytes = await file.arrayBuffer();
       const buffer = Buffer.from(bytes);

       // Upload to Cloudinary
       const result = await new Promise((resolve, reject) => {
         cloudinary.uploader
           .upload_stream(
             {
               folder: 'safespace',
               resource_type: 'auto',
             },
             (error, result) => {
               if (error) reject(error);
               else resolve(result);
             }
           )
           .end(buffer);
       });

       return NextResponse.json({ success: true, data: result });
     } catch (error) {
       console.error('Upload error:', error);
       return NextResponse.json(
         { error: 'Upload failed' },
         { status: 500 }
       );
     }
   }
   ```

---

## 🧪 Phase 5: Testing (2-3 hours)

### Setup Testing Environment

```powershell
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### Create Jest Config

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

---

## 🚀 Phase 6: Deployment (1-2 hours)

### Deploy to Vercel

1. **Push to GitHub**
   ```powershell
   git add .
   git commit -m "Complete backend integration"
   git push origin main
   ```

2. **Deploy on Vercel**
   ```
   Visit: https://vercel.com
   - Import GitHub repository
   - Add environment variables
   - Deploy
   ```

3. **Update Environment Variables**
   - Add all .env.local variables to Vercel
   - Update NEXT_PUBLIC_APP_URL to production URL
   - Update NEXTAUTH_URL to production URL

---

## ✅ Completion Checklist

### Environment Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Google Maps API key obtained
- [ ] All APIs enabled
- [ ] Secrets generated
- [ ] .env.local configured
- [ ] Database seeded

### Backend Development
- [ ] NextAuth configured
- [ ] All API routes enhanced
- [ ] Image upload implemented
- [ ] Error handling added
- [ ] Input validation added
- [ ] Rate limiting added

### Frontend Integration
- [ ] API client created
- [ ] Custom hooks implemented
- [ ] Enhanced pages connected
- [ ] Loading states added
- [ ] Error handling added
- [ ] Real-time updates working

### Testing
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] E2E tests written
- [ ] Manual testing completed
- [ ] Performance testing done

### Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Production deployment successful
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Google Maps Platform](https://developers.google.com/maps)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🆘 Troubleshooting

### MongoDB Connection Issues
```powershell
# Test connection
node -e "require('dotenv').config({path:'.env.local'}); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(e => console.error('❌ Error:', e));"
```

### API Route Debugging
```typescript
// Add logging to routes
console.log('[API] Request:', request.method, request.url);
console.log('[API] Body:', await request.json());
```

### Clear Next.js Cache
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 🎯 Next Steps After Integration

1. **Add Advanced Features**
   - Real-time chat
   - Push notifications
   - Email notifications
   - Advanced search with Algolia
   - Analytics dashboard

2. **Optimize Performance**
   - Image optimization
   - Code splitting
   - Server-side caching
   - CDN integration

3. **Enhance Security**
   - Rate limiting
   - CSRF protection
   - XSS prevention
   - SQL injection prevention
   - Content Security Policy

4. **Add Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Uptime monitoring

---

**Need Help?** Check the documentation files or create an issue in the repository.
