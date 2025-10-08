# Google Maps API Setup Guide

## Quick Steps to Get Your API Key

### Step 1: Go to Google Cloud Console
🔗 **https://console.cloud.google.com/**

### Step 2: Create a New Project
1. Click the project dropdown at the top
2. Click "**New Project**"
3. Name: `Safe Space Finder`
4. Click "**Create**"
5. Wait for project creation (~30 seconds)
6. Select your new project from the dropdown

### Step 3: Enable Required APIs
1. Go to "**APIs & Services**" → "**Library**" (from left sidebar)
2. Search and enable each of these:
   - ✅ **Maps JavaScript API** (required)
   - ✅ **Places API** (optional but recommended)
   - ✅ **Geocoding API** (optional but recommended)

For each API:
- Click on the API
- Click "**Enable**"
- Wait for it to enable (~10 seconds)

### Step 4: Create API Key
1. Go to "**APIs & Services**" → "**Credentials**"
2. Click "**+ Create Credentials**" at the top
3. Select "**API Key**"
4. Your API key will be displayed - **COPY IT!**
5. Click "**Restrict Key**" (recommended for security)

### Step 5: Restrict Your API Key (Optional but Recommended)

#### Application Restrictions:
- Select "**HTTP referrers (web sites)**"
- Add these referrers:
  ```
  http://localhost:3000/*
  http://localhost:*/*
  https://yourdomain.vercel.app/*
  ```

#### API Restrictions:
- Select "**Restrict key**"
- Choose the APIs you enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API
- Click "**Save**"

### Step 6: Add to Your Project

1. Open `.env.local` file in your project
2. Add this line:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here
   ```
3. Replace `your-api-key-here` with your actual API key
4. Save the file

### Step 7: Restart Development Server

```powershell
# Stop the server (Ctrl+C if running)
# Start it again
npm run dev
```

---

## ⚠️ Important Notes

### Free Tier Limits:
- **$200 free credit per month**
- Maps JavaScript API: $7 per 1,000 loads
- With $200 credit, you get ~28,000 map loads per month **FREE**
- Perfect for testing and MVP!

### Billing Setup:
- You'll need to add a credit card (for verification)
- You won't be charged unless you exceed the $200 free credit
- Set up billing alerts to avoid surprises

### Security Best Practices:
1. ✅ Always restrict your API key
2. ✅ Never commit `.env.local` to Git (it's in .gitignore)
3. ✅ Use different keys for development and production
4. ✅ Monitor usage in Google Cloud Console

---

## 🧪 Test Your API Key

After adding the key and restarting the server:

1. Visit: `http://localhost:3000/map`
2. You should see a Google Map with markers
3. Check browser console for any errors
4. If you see errors, check:
   - API key is correct in `.env.local`
   - APIs are enabled in Google Cloud Console
   - Development server was restarted

---

## 🆘 Troubleshooting

### "This page can't load Google Maps correctly"
- **Solution:** API key is invalid or not properly set
- Check: Is the key in `.env.local` correct?
- Check: Did you restart the dev server?

### "RefererNotAllowedMapError"
- **Solution:** Add `http://localhost:3000/*` to HTTP referrer restrictions
- Or temporarily remove restrictions for testing

### "ApiNotActivatedMapError"
- **Solution:** Enable Maps JavaScript API in Google Cloud Console
- Go to: APIs & Services → Library → Search "Maps JavaScript API" → Enable

### Map shows but no markers
- This is OK! It means Google Maps is working
- Markers will appear once you:
  1. Set up MongoDB
  2. Run the seed script
  3. API routes are connected

---

## 📝 Current Status Checklist

After completing this guide, you should have:

- [ ] Google Cloud project created
- [ ] Maps JavaScript API enabled
- [ ] API key created
- [ ] API key added to `.env.local`
- [ ] Development server restarted
- [ ] Map page loads without errors

---

## 🎯 Next Steps

Once your Google Maps API key is working:

1. **Setup MongoDB Atlas** (Step 2 in MVP_QUICK_START.md)
2. **Create database models** (Step 4)
3. **Run seed script** (Step 12)
4. **See your businesses on the map!** 🗺️

---

## 💡 Pro Tips

### For Development:
- Use a separate project for development
- Enable all APIs to test features
- Don't worry too much about restrictions initially

### For Production:
- Create a new project for production
- Use strict API key restrictions
- Enable only the APIs you need
- Set up usage alerts
- Monitor costs regularly

---

## 📚 Official Documentation

- Google Maps Platform: https://developers.google.com/maps
- API Key Best Practices: https://developers.google.com/maps/api-security-best-practices
- Pricing Calculator: https://mapsplatform.google.com/pricing/

---

**Good luck! 🚀 Once you have your API key, the map will come alive with safe spaces!**
