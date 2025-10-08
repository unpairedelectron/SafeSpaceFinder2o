# 🚀 Database & Environment Setup Guide

This guide will help you set up MongoDB Atlas and configure your environment variables.

## ⏱️ Estimated Time: 30-40 minutes

---

## Step 1: MongoDB Atlas Setup (15-20 minutes)

### 1.1 Create MongoDB Atlas Account

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** using Google (fastest) or email
3. **Verify** your email if needed

### 1.2 Create Free Cluster

1. Click **"Build a Database"**
2. Choose **"FREE"** (M0 Sandbox - 512 MB storage)
3. **Select Cloud Provider & Region**:
   - Provider: AWS (recommended)
   - Region: Choose closest to you
   - Name: `Cluster0` (default is fine)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Create Database User

1. Go to **Security → Database Access**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Fill in:
   - Username: `safespace_admin`
   - Password: Click **"Autogenerate Secure Password"** and **COPY IT!** 💾
   - Built-in Role: Choose **"Read and write to any database"**
5. Click **"Add User"**

### 1.4 Configure Network Access

1. Go to **Security → Network Access**
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For development only. In production, restrict to your server IPs
4. Click **"Confirm"**

### 1.5 Get Connection String

1. Go to **Database → Clusters**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **Driver**: Node.js, **Version**: 5.5 or later
5. **Copy the connection string**

   It looks like:
   ```
   mongodb+srv://safespace_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Replace `<password>`** with your actual password (from step 1.3)
7. **Add database name** before the `?`:
   ```
   mongodb+srv://safespace_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/safespacefinder?retryWrites=true&w=majority
   ```

---

## Step 2: Google Maps API Setup (15-20 minutes)

### 2.1 Create Google Cloud Project

1. **Go to**: https://console.cloud.google.com/
2. **Sign in** with Google account
3. Click **"Select a project"** → **"New Project"**
4. **Project name**: `Safe Space Finder`
5. Click **"Create"**

### 2.2 Enable Required APIs

1. Go to **APIs & Services → Library**
2. Search and enable these APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
   - ✅ **Geocoding API**

### 2.3 Create API Key

1. Go to **APIs & Services → Credentials**
2. Click **"Create Credentials"** → **"API Key"**
3. **Copy your API key** 💾
4. Click **"Restrict Key"** (recommended)

### 2.4 Restrict API Key (Recommended)

1. **API restrictions**:
   - Select **"Restrict key"**
   - Choose the 3 APIs you enabled
2. **Application restrictions**:
   - For development: Choose **"HTTP referrers"**
   - Add: `localhost:3000/*`
   - For production: Add your domain (e.g., `yourdomain.com/*`)
3. Click **"Save"**

---

## Step 3: Create .env.local File

1. **Copy the template**:
   ```powershell
   Copy-Item .env.local.template .env.local
   ```

2. **Open** `.env.local` in VS Code

3. **Fill in required values**:

   ```bash
   # Required - fill these in!
   MONGODB_URI=mongodb+srv://safespace_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/safespacefinder?retryWrites=true&w=majority
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
   ```

4. **Generate secrets** in PowerShell:
   ```powershell
   # Run this command twice to generate two different secrets
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

5. **Add secrets to .env.local**:
   ```bash
   JWT_SECRET=first-generated-secret-here
   NEXTAUTH_SECRET=second-generated-secret-here
   ```

---

## Step 4: Verify Setup

### 4.1 Check .env.local

Your `.env.local` should look like:

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://safespace_admin:MyP@ssw0rd123@cluster0.abc123.mongodb.net/safespacefinder?retryWrites=true&w=majority

# Secrets
JWT_SECRET=abc123XYZ789...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=def456UVW...

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC...
```

### 4.2 Test Connection

```powershell
# Install dependencies (if not already done)
npm install

# Run the seed script to test database connection
npm run seed
```

Expected output:
```
🌱 Starting database seed...
✅ Connected to MongoDB
👥 Creating users...
   ✓ Alex Chen (alex@example.com) - user
   ✓ Jordan Smith (jordan@example.com) - user
   ...
🎉 Database seeded successfully!
```

---

## Step 5: Start Development Server

```powershell
npm run dev
```

Open http://localhost:3000 and you should see:
- ✅ Landing page loads
- ✅ Map page shows Google Maps
- ✅ Businesses appear on map
- ✅ Can click markers to see business info

---

## 🎉 You're Done!

### Test Accounts

You now have these test accounts:

| Email | Password | Role |
|-------|----------|------|
| alex@example.com | password123 | User |
| jordan@example.com | password123 | User |
| sam@example.com | password123 | User |
| admin@safespacefinder.com | admin123 | Admin |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoServerError: bad auth`
- ✅ Double-check your password in connection string
- ✅ Make sure you replaced `<password>` with actual password
- ✅ Check for special characters - they need URL encoding

**Error**: `MongoServerError: IP not whitelisted`
- ✅ Add 0.0.0.0/0 to Network Access in MongoDB Atlas
- ✅ Wait 1-2 minutes for changes to propagate

### Google Maps Not Loading

**Error**: "Google Maps JavaScript API error: InvalidKeyMapError"
- ✅ Check API key is correct in `.env.local`
- ✅ Make sure APIs are enabled in Google Cloud Console
- ✅ Restart dev server after adding/changing API key

**Error**: Map shows but no markers
- ✅ Run `npm run seed` to populate database
- ✅ Check browser console for errors
- ✅ Verify MONGODB_URI is correct

### Seed Script Errors

**Error**: `Cannot find module`
- ✅ Run `npm install` first
- ✅ Make sure you're in project root directory

**Error**: `MONGODB_URI not defined`
- ✅ Create `.env.local` file
- ✅ Add MONGODB_URI to `.env.local`
- ✅ Restart terminal/VS Code

---

## 📚 Next Steps

1. ✅ **Test authentication**: Try logging in with test accounts
2. ✅ **Explore features**: Add a business, write a review
3. ✅ **Check admin dashboard**: Login as admin user
4. ✅ **Review API docs**: See `docs/API.md`
5. ✅ **Prepare for deployment**: See `docs/DEPLOYMENT.md`

---

## 🔒 Security Notes

### Development
- ✅ Never commit `.env.local` to git (it's in `.gitignore`)
- ✅ Use "Allow Access from Anywhere" for MongoDB (easier testing)

### Production
- ⚠️ Restrict MongoDB Network Access to your server IPs only
- ⚠️ Restrict Google Maps API to your domain only
- ⚠️ Use strong, unique secrets (not the auto-generated ones)
- ⚠️ Enable MongoDB Atlas backup
- ⚠️ Monitor API usage and set quotas

---

## 💡 Tips

1. **MongoDB Compass**: Download [MongoDB Compass](https://www.mongodb.com/products/compass) to visually explore your database

2. **Google Cloud Console**: Set up billing alerts to avoid unexpected charges

3. **Backup secrets**: Save your `.env.local` values securely (password manager)

4. **API quotas**: Google Maps has daily quotas. Monitor usage in Google Cloud Console

---

## Need Help?

- 📖 MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- 📖 Google Maps Platform: https://developers.google.com/maps/documentation
- 📖 Next.js Environment Variables: https://nextjs.org/docs/basic-features/environment-variables
- 🐛 Project Issues: Check TROUBLESHOOTING.md

---

**Good luck! 🚀**
