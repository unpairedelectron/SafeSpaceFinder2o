# Deployment Guide

This guide covers deploying the Safe Space Finder application to various platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Deployment Platforms](#deployment-platforms)
   - [Vercel](#vercel-recommended)
   - [AWS](#aws)
   - [Docker](#docker)
   - [Kubernetes](#kubernetes)
4. [Database Setup](#database-setup)
5. [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] All environment variables configured
- [ ] Database setup and migrated
- [ ] Domain name (optional but recommended)
- [ ] SSL certificate (usually auto-provided)
- [ ] API keys for third-party services
- [ ] CDN setup for static assets (optional)

---

## Environment Variables

Copy `.env.example` to `.env.production` and fill in all values:

```bash
cp .env.example .env.production
```

**Required variables:**
- `DATABASE_URL` or `MONGODB_URI`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`

**Recommended:**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` or `NEXT_PUBLIC_MAPBOX_TOKEN`
- Email service credentials (SMTP or SendGrid)
- File upload service (Cloudinary or AWS S3)
- Analytics (Google Analytics, Mixpanel)
- Monitoring (Sentry)

---

## Deployment Platforms

### Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

#### 4. Configure Environment Variables

```bash
# Add environment variables via CLI
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production

# Or use Vercel Dashboard:
# https://vercel.com/dashboard -> Your Project -> Settings -> Environment Variables
```

#### 5. Configure Domain

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain

#### Production Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["iad1"]
}
```

---

### AWS

Deploy to AWS using Elastic Beanstalk, ECS, or EC2.

#### Option 1: AWS Elastic Beanstalk

1. **Install AWS EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize EB:**
```bash
eb init -p node.js safe-space-finder
```

3. **Create Environment:**
```bash
eb create production-env
```

4. **Configure Environment Variables:**
```bash
eb setenv MONGODB_URI="your-connection-string" \
         JWT_SECRET="your-secret" \
         NEXTAUTH_SECRET="your-secret"
```

5. **Deploy:**
```bash
eb deploy
```

#### Option 2: AWS ECS (Elastic Container Service)

1. **Build Docker image** (see Docker section)
2. **Push to AWS ECR:**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag safe-space-finder:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/safe-space-finder:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/safe-space-finder:latest
```

3. **Create ECS Task Definition** and **Service**
4. **Configure Load Balancer** and **Auto Scaling**

---

### Docker

#### 1. Create Dockerfile

Already exists at `Dockerfile` in the project root.

#### 2. Build Image

```bash
docker build -t safe-space-finder:latest .
```

#### 3. Run Container Locally

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="your-connection-string" \
  -e JWT_SECRET="your-secret" \
  safe-space-finder:latest
```

#### 4. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - mongodb
      - redis
    restart: unless-stopped

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mongodb_data:
  redis_data:
```

Run with:
```bash
docker-compose up -d
```

---

### Kubernetes

#### 1. Create Kubernetes Manifests

**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: safe-space-finder
spec:
  replicas: 3
  selector:
    matchLabels:
      app: safe-space-finder
  template:
    metadata:
      labels:
        app: safe-space-finder
    spec:
      containers:
      - name: app
        image: your-registry/safe-space-finder:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: mongodb-uri
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: safe-space-finder
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: safe-space-finder
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  mongodb-uri: "your-mongodb-connection-string"
  jwt-secret: "your-jwt-secret"
```

#### 2. Apply Manifests

```bash
kubectl apply -f deployment.yaml
```

#### 3. Check Status

```bash
kubectl get pods
kubectl get services
kubectl logs -f <pod-name>
```

#### 4. Scale Application

```bash
kubectl scale deployment safe-space-finder --replicas=5
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Select region closest to your app

2. **Configure Network Access:**
   - Add your deployment server IPs
   - Or allow access from anywhere (0.0.0.0/0) for testing

3. **Create Database User:**
   - Database Access → Add New Database User
   - Set username and password

4. **Get Connection String:**
   - Connect → Connect Your Application
   - Copy the connection string
   - Replace `<password>` with your user password

### PostgreSQL (Alternative)

If using Prisma with PostgreSQL:

1. **Setup Database:**
```bash
# Using managed service (Heroku, Railway, Supabase)
# Or self-hosted
```

2. **Run Migrations:**
```bash
npx prisma migrate deploy
```

3. **Generate Client:**
```bash
npx prisma generate
```

---

## Post-Deployment

### 1. Health Check

Create `/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
}
```

### 2. Monitoring

**Setup Sentry:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Setup Uptime Monitoring:**
- Use services like UptimeRobot, Pingdom, or AWS CloudWatch

### 3. Analytics

**Google Analytics:**
Add to `src/app/layout.tsx`:
```typescript
import Script from 'next/script';

// In component
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### 4. Performance Optimization

- Enable CDN for static assets
- Configure caching headers
- Optimize images with Next.js Image component
- Enable compression (gzip/brotli)
- Use database indexes
- Implement Redis caching

### 5. Security Checklist

- [ ] SSL/TLS enabled (HTTPS)
- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Security headers configured
- [ ] Regular dependency updates

### 6. Backup Strategy

- **Database:** Daily automated backups
- **File Storage:** Versioned S3 buckets or similar
- **Code:** Git repository with tags/releases

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Troubleshooting

### Build Failures

1. Check build logs
2. Verify all environment variables are set
3. Ensure dependencies are installed
4. Check for TypeScript errors

### Runtime Errors

1. Check application logs
2. Verify database connection
3. Check API keys and credentials
4. Monitor error tracking (Sentry)

### Performance Issues

1. Check database query performance
2. Enable caching where appropriate
3. Optimize API response times
4. Use CDN for static assets
5. Scale horizontally if needed

---

## Support

For deployment issues:
- Check documentation: `docs/`
- Open an issue: GitHub Issues
- Contact: hello@safespacefinder.com
