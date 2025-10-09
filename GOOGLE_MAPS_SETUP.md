# 🗺️ Google Maps API Setup Guide

## Step 1: Enable Required APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** > **Library**
4. Search for and enable these APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
   - ✅ **Geocoding API** (optional, for address lookup)

## Step 2: Configure API Key Restrictions

1. Go to **APIs & Services** > **Credentials**
2. Click on your API key (currently: `AIzaSyD9188F188ncbbf-ME3AzEuq_iDr7zWkew`)
3. Under **Application restrictions**:
   - Select **HTTP referrers (web sites)**
   - Add these referrers:
     ```
     http://localhost:3000/*
     http://127.0.0.1:3000/*
     https://yourdomain.com/*  (for production)
     ```

4. Under **API restrictions**:
   - Select **Restrict key**
   - Enable only:
     - Maps JavaScript API
     - Places API
     - Geocoding API

## Step 3: Enable Billing

⚠️ **Important:** Google Maps requires billing to be enabled

1. Go to **Billing** in Cloud Console
2. Link a billing account to your project
3. Google provides $200/month free credit (covers ~28,000 map loads)

## Step 4: Test Your Configuration

```bash
# Restart your dev server
npm run dev
```

Visit: http://localhost:3000/map

**Expected Result:** Map loads without errors

## Troubleshooting

### Error: "ApiNotActivatedMapError"
- ✅ Solution: Enable "Maps JavaScript API" in Cloud Console

### Error: "RefererNotAllowedMapError"
- ✅ Solution: Add `http://localhost:3000/*` to HTTP referrers

### Error: "This page can't load Google Maps correctly"
- ✅ Solution: Enable billing on your Google Cloud project

### Still not working?
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for detailed error messages
- Verify API key in `.env.local` (no spaces, no quotes)
- Restart dev server after any `.env.local` changes

## Free Tier Limits

- **Map loads:** 28,000/month free
- **Geocoding:** 40,000 requests/month free
- **Places API:** 2,000 requests/month free

For a small-medium app, you'll likely stay within free limits.

## Alternative: Use Mock Map (Temporary)

If you can't enable billing right now, we've added a fallback static map view.
The app will detect the Maps API error and show an interactive list view instead.
