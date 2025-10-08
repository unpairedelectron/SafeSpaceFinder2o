# Safe Space Finder - Page Diagnostic Script
# Run this to check if pages are configured correctly

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Safe Space Finder - Page Diagnostics" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$issuesFound = 0

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ ERROR: Not in project root directory" -ForegroundColor Red
    Write-Host "   Please run this script from: SafespaceFinder folder`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Running from project root`n" -ForegroundColor Green

# Check Node Modules
Write-Host "Checking dependencies..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "❌ node_modules not found" -ForegroundColor Red
    Write-Host "   Run: npm install`n" -ForegroundColor Yellow
    $issuesFound++
}

# Check .env.local
Write-Host "`nChecking environment configuration..." -ForegroundColor Cyan
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local exists" -ForegroundColor Green
    
    $envContent = Get-Content ".env.local" -Raw
    
    # Check Google Maps API Key
    if ($envContent -match "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=.+") {
        Write-Host "✓ Google Maps API key found" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Google Maps API key not found or empty" -ForegroundColor Yellow
        Write-Host "   Map page will not work without this key" -ForegroundColor Yellow
        Write-Host "   Add: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`n" -ForegroundColor Yellow
        $issuesFound++
    }
    
    # Check MongoDB URI
    if ($envContent -match "MONGODB_URI=.+") {
        Write-Host "✓ MongoDB URI found" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB URI not found or empty" -ForegroundColor Yellow
        Write-Host "   Backend features will not work`n" -ForegroundColor Yellow
    }
    
} else {
    Write-Host "❌ .env.local not found" -ForegroundColor Red
    Write-Host "   Run: Copy-Item .env.local.template .env.local`n" -ForegroundColor Yellow
    $issuesFound++
}

# Check Page Files
Write-Host "`nChecking page files..." -ForegroundColor Cyan

$pagesToCheck = @(
    "src\app\map\page.tsx",
    "src\app\add-business\page.tsx",
    "src\app\discover\page.tsx",
    "src\app\profile\page.tsx"
)

foreach ($page in $pagesToCheck) {
    if (Test-Path $page) {
        $pageName = ($page -split "\\")[-2]
        Write-Host "✓ $pageName page exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $page not found" -ForegroundColor Red
        $issuesFound++
    }
}

# Check Component Files
Write-Host "`nChecking key components..." -ForegroundColor Cyan

$componentsToCheck = @(
    "src\components\Header.tsx",
    "src\components\ui\Button.tsx",
    "src\components\ui\Input.tsx"
)

foreach ($component in $componentsToCheck) {
    if (Test-Path $component) {
        $componentName = (Split-Path $component -Leaf) -replace ".tsx", ""
        Write-Host "✓ $componentName component exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $component not found" -ForegroundColor Red
        $issuesFound++
    }
}

# Check if dev server is running
Write-Host "`nChecking dev server..." -ForegroundColor Cyan
$nodeProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.MainWindowTitle -like "*Next.js*" -or $_.CommandLine -like "*next dev*"
}

if ($nodeProcess) {
    Write-Host "✓ Dev server appears to be running" -ForegroundColor Green
} else {
    Write-Host "⚠️  Dev server not detected" -ForegroundColor Yellow
    Write-Host "   Run: npm run dev`n" -ForegroundColor Yellow
}

# Check localhost connection
Write-Host "`nChecking localhost..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ localhost:3000 is responding" -ForegroundColor Green
} catch {
    Write-Host "❌ Cannot connect to localhost:3000" -ForegroundColor Red
    Write-Host "   Make sure dev server is running: npm run dev`n" -ForegroundColor Yellow
    $issuesFound++
}

# Test specific pages
Write-Host "`nTesting page URLs..." -ForegroundColor Cyan
$pagesToTest = @{
    "Map" = "http://localhost:3000/map"
    "Add Business" = "http://localhost:3000/add-business"
    "Discover" = "http://localhost:3000/discover"
}

foreach ($pageInfo in $pagesToTest.GetEnumerator()) {
    try {
        $response = Invoke-WebRequest -Uri $pageInfo.Value -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ $($pageInfo.Key) page accessible" -ForegroundColor Green
        }
    } catch {
        Write-Host "⚠️  $($pageInfo.Key) page returned error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Diagnostic Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($issuesFound -eq 0) {
    Write-Host "✅ No critical issues found!" -ForegroundColor Green
    Write-Host "`nYour app should be working. If pages still don't work:" -ForegroundColor White
    Write-Host "1. Check browser console (F12) for errors" -ForegroundColor White
    Write-Host "2. Check dev server console for errors" -ForegroundColor White
    Write-Host "3. Try clearing cache: Remove-Item -Recurse -Force .next`n" -ForegroundColor White
} else {
    Write-Host "⚠️  Found $issuesFound issue(s) - please fix above errors`n" -ForegroundColor Yellow
}

Write-Host "Quick Commands:" -ForegroundColor Cyan
Write-Host "  Start server:    npm run dev" -ForegroundColor White
Write-Host "  Clear cache:     Remove-Item -Recurse -Force .next" -ForegroundColor White
Write-Host "  Reinstall:       npm install" -ForegroundColor White
Write-Host "  Check logs:      See terminal where dev server is running`n" -ForegroundColor White

Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  Troubleshooting: TROUBLESHOOTING_PAGES.md" -ForegroundColor White
Write-Host "  Quick Reference: QUICK_REFERENCE_BACKEND.md" -ForegroundColor White
Write-Host "  Full Guide:      BACKEND_INTEGRATION_GUIDE.md`n" -ForegroundColor White

# Offer to open browser
$openBrowser = Read-Host "Would you like to open the app in browser? (y/n)"
if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
    Write-Host "`nOpening pages in browser..." -ForegroundColor Cyan
    Start-Process "http://localhost:3000"
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000/map"
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:3000/add-business"
}

Write-Host "`nDiagnostics complete!`n" -ForegroundColor Green
