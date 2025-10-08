// Environment configuration and validation
import { z } from 'zod';

// Define environment variable schema
const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  
  // Database
  DATABASE_URL: z.string().url().optional(),
  MONGODB_URI: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
  
  // Authentication
  JWT_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  
  // OAuth Providers
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  
  // Maps & Geolocation
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),
  
  // File Upload
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
  
  // Monitoring & Logging
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  LOGTAIL_SOURCE_TOKEN: z.string().optional(),
  
  // AI & ML
  OPENAI_API_KEY: z.string().optional(),
  HUGGINGFACE_API_KEY: z.string().optional(),
  
  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'), // 15 minutes
  
  // Feature Flags
  ENABLE_ADMIN_DASHBOARD: z.string().default('true'),
  ENABLE_AI_RECOMMENDATIONS: z.string().default('false'),
  ENABLE_REAL_TIME_UPDATES: z.string().default('false'),
});

// Parse and validate environment variables
function getEnv() {
  try {
    return envSchema.parse({
      // App
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      
      // Database
      DATABASE_URL: process.env.DATABASE_URL,
      MONGODB_URI: process.env.MONGODB_URI,
      REDIS_URL: process.env.REDIS_URL,
      
      // Authentication
      JWT_SECRET: process.env.JWT_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      
      // OAuth Providers
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      
      // Maps & Geolocation
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      
      // File Upload
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,
      
      // Email
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD,
      SMTP_FROM: process.env.SMTP_FROM,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      
      // Analytics
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
      
      // Monitoring & Logging
      SENTRY_DSN: process.env.SENTRY_DSN,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
      LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
      
      // AI & ML
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
      
      // Rate Limiting
      RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
      
      // Feature Flags
      ENABLE_ADMIN_DASHBOARD: process.env.ENABLE_ADMIN_DASHBOARD,
      ENABLE_AI_RECOMMENDATIONS: process.env.ENABLE_AI_RECOMMENDATIONS,
      ENABLE_REAL_TIME_UPDATES: process.env.ENABLE_REAL_TIME_UPDATES,
    });
  } catch (error) {
    console.error('❌ Invalid environment variables:');
    if (error instanceof z.ZodError) {
      console.error(error.flatten().fieldErrors);
    }
    throw new Error('Invalid environment variables');
  }
}

// Export validated environment variables
export const env = getEnv();

// Helper functions
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Feature flags
export const features = {
  adminDashboard: env.ENABLE_ADMIN_DASHBOARD === 'true',
  aiRecommendations: env.ENABLE_AI_RECOMMENDATIONS === 'true',
  realTimeUpdates: env.ENABLE_REAL_TIME_UPDATES === 'true',
};

// API configuration
export const apiConfig = {
  rateLimit: {
    maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10),
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10),
  },
};
