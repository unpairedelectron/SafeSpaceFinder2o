# 🚀 Safe Space Finder - Getting Started Script
# This script helps you verify your setup step by step

Write-Host ""
Write-Host "🌈 Safe Space Finder - Day 5-7 Setup Helper" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    Write-Host "   Current directory: $PWD" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project directory confirmed" -ForegroundColor Green
Write-Host ""

# Step 1: Check if secrets are generated
Write-Host "📋 Step 1: Check Secrets" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow

$secretsGenerated = $false
if (Test-Path ".env.local") {
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match "JWT_SECRET=\w+" -and $envContent -match "NEXTAUTH_SECRET=\w+") {
        Write-Host "   ✅ Secrets found in .env.local" -ForegroundColor Green
        $secretsGenerated = $true
    }
}

if (!$secretsGenerated) {
    Write-Host "   ⚠️  Secrets not found. Would you like to generate them now? (Y/n): " -ForegroundColor Yellow -NoNewline
    $response = Read-Host
    if ($response -ne 'n' -and $response -ne 'N') {
        Write-Host "   🔐 Generating secrets..." -ForegroundColor Cyan
        node scripts/generate-secrets.js
        Write-Host ""
        Write-Host "   💾 Please save these secrets!" -ForegroundColor Yellow
        Write-Host ""
    }
}
Write-Host ""

# Step 2: Check if .env.local exists
Write-Host "📋 Step 2: Check Environment File" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow

if (!(Test-Path ".env.local")) {
    Write-Host "   ⚠️  .env.local not found" -ForegroundColor Yellow
    Write-Host "   Would you like to create it from template? (Y/n): " -NoNewline
    $response = Read-Host
    if ($response -ne 'n' -and $response -ne 'N') {
        Copy-Item ".env.local.template" ".env.local"
        Write-Host "   ✅ Created .env.local from template" -ForegroundColor Green
        Write-Host "   📝 Opening .env.local for editing..." -ForegroundColor Cyan
        Start-Sleep -Seconds 1
        code ".env.local"
        Write-Host ""
        Write-Host "   ⏸️  Please fill in these required values:" -ForegroundColor Yellow
        Write-Host "      - MONGODB_URI (from MongoDB Atlas)" -ForegroundColor White
        Write-Host "      - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (from Google Cloud)" -ForegroundColor White
        Write-Host "      - JWT_SECRET (from generated secrets above)" -ForegroundColor White
        Write-Host "      - NEXTAUTH_SECRET (from generated secrets above)" -ForegroundColor White
        Write-Host ""
        Write-Host "   📖 Need help? Read: ACTION_PLAN_DAY_5-7.md (Steps 3-4)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "   Press Enter when you're done editing .env.local..." -NoNewline
        Read-Host
    }
} else {
    Write-Host "   ✅ .env.local exists" -ForegroundColor Green
}
Write-Host ""

# Step 3: Verify environment variables
Write-Host "📋 Step 3: Verify Required Variables" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow

if (Test-Path ".env.local") {
    $envContent = Get-Content ".env.local" -Raw
    
    $allGood = $true
    
    # Check MONGODB_URI
    if ($envContent -match "MONGODB_URI=mongodb\+srv://") {
        Write-Host "   ✅ MONGODB_URI configured" -ForegroundColor Green
    } else {
        Write-Host "   ❌ MONGODB_URI not configured or invalid" -ForegroundColor Red
        $allGood = $false
    }
    
    # Check Google Maps API Key
    if ($envContent -match "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza\w+") {
        Write-Host "   ✅ Google Maps API Key configured" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Google Maps API Key not configured" -ForegroundColor Red
        $allGood = $false
    }
    
    # Check JWT Secret
    if ($envContent -match "JWT_SECRET=\w{20,}") {
        Write-Host "   ✅ JWT_SECRET configured" -ForegroundColor Green
    } else {
        Write-Host "   ❌ JWT_SECRET not configured" -ForegroundColor Red
        $allGood = $false
    }
    
    # Check NextAuth Secret
    if ($envContent -match "NEXTAUTH_SECRET=\w{20,}") {
        Write-Host "   ✅ NEXTAUTH_SECRET configured" -ForegroundColor Green
    } else {
        Write-Host "   ❌ NEXTAUTH_SECRET not configured" -ForegroundColor Red
        $allGood = $false
    }
    
    Write-Host ""
    
    if (!$allGood) {
        Write-Host "   ⚠️  Some required variables are missing!" -ForegroundColor Yellow
        Write-Host "   📖 Follow these guides:" -ForegroundColor Cyan
        Write-Host "      - MongoDB: docs/DATABASE_SETUP.md (Step 1)" -ForegroundColor White
        Write-Host "      - Google Maps: docs/DATABASE_SETUP.md (Step 2)" -ForegroundColor White
        Write-Host "      - Secrets: npm run generate-secrets" -ForegroundColor White
        Write-Host ""
        Write-Host "   Press Enter to continue anyway..." -NoNewline
        Read-Host
        Write-Host ""
    }
} else {
    Write-Host "   ⚠️  .env.local not found - skipping verification" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Offer to seed database
Write-Host "📋 Step 4: Seed Database (Optional)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host "   This will populate your database with test data." -ForegroundColor White
Write-Host "   (4 users, 8 businesses, 6 reviews)" -ForegroundColor White
Write-Host ""
Write-Host "   Would you like to seed the database now? (y/N): " -NoNewline
$response = Read-Host

if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host ""
    Write-Host "   🌱 Seeding database..." -ForegroundColor Cyan
    npm run seed
    Write-Host ""
} else {
    Write-Host "   ⏭️  Skipped database seeding" -ForegroundColor Gray
    Write-Host "   💡 You can seed later with: npm run seed" -ForegroundColor Cyan
}
Write-Host ""

# Step 5: Offer to start dev server
Write-Host "📋 Step 5: Start Development Server" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host "   Would you like to start the dev server now? (y/N): " -NoNewline
$response = Read-Host

if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host ""
    Write-Host "   🚀 Starting development server..." -ForegroundColor Cyan
    Write-Host "   📍 Server will be available at: http://localhost:3000" -ForegroundColor Green
    Write-Host "   📍 Map page: http://localhost:3000/map" -ForegroundColor Green
    Write-Host ""
    Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    Start-Sleep -Seconds 2
    npm run dev
} else {
    Write-Host "   ⏭️  Skipped starting server" -ForegroundColor Gray
    Write-Host "   💡 You can start it later with: npm run dev" -ForegroundColor Cyan
}
Write-Host ""

# Final summary
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Make sure .env.local is configured (all 4 required variables)" -ForegroundColor White
Write-Host "   2. Run: npm run seed (if not done yet)" -ForegroundColor White
Write-Host "   3. Run: npm run dev" -ForegroundColor White
Write-Host "   4. Open: http://localhost:3000/map" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   - Quick start: README_START_HERE.md" -ForegroundColor White
Write-Host "   - Detailed guide: ACTION_PLAN_DAY_5-7.md" -ForegroundColor White
Write-Host "   - Quick reference: QUICK_REFERENCE.md" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Test accounts (after seeding):" -ForegroundColor Yellow
Write-Host "   alex@example.com / password123 (User)" -ForegroundColor White
Write-Host "   admin@safespacefinder.com / admin123 (Admin)" -ForegroundColor White
Write-Host ""
Write-Host "Good luck! 🚀" -ForegroundColor Green
Write-Host ""
