# Google Maps API Diagnostic Script
# Run this to check your Maps API configuration

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Google Maps API Configuration Check" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$issuesFound = 0

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local not found" -ForegroundColor Red
    Write-Host "   Create it from .env.local.template`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ .env.local exists" -ForegroundColor Green

# Check for API key
$envContent = Get-Content ".env.local" -Raw

if ($envContent -match 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=([^\r\n]+)') {
    $apiKey = $matches[1].Trim()
    
    if ($apiKey -and $apiKey -ne "") {
        Write-Host "✓ Google Maps API key found" -ForegroundColor Green
        $keyPreview = if ($apiKey.Length -gt 20) { $apiKey.Substring(0, 20) + "..." } else { $apiKey }
        Write-Host "  Key: $keyPreview" -ForegroundColor Gray
        
        # Test if key looks valid (Google API keys start with AIza)
        if ($apiKey -match '^AIza') {
            Write-Host "✓ API key format looks valid (starts with AIza)" -ForegroundColor Green
        } else {
            Write-Host "⚠️  API key format unusual (should start with AIza)" -ForegroundColor Yellow
            $issuesFound++
        }
    } else {
        Write-Host "❌ API key is empty" -ForegroundColor Red
        $issuesFound++
    }
} else {
    Write-Host "❌ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not found in .env.local" -ForegroundColor Red
    $issuesFound++
}

# Check if dev server is running
Write-Host "`nChecking dev server..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ Dev server is running on localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Dev server not running" -ForegroundColor Yellow
    Write-Host "   Start it with: npm run dev`n" -ForegroundColor Yellow
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Setup Checklist" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Google Cloud Console Tasks:" -ForegroundColor Yellow
Write-Host "  [ ] 1. Enable 'Maps JavaScript API'" -ForegroundColor White
Write-Host "  [ ] 2. Enable 'Places API'" -ForegroundColor White
Write-Host "  [ ] 3. Configure API key restrictions (HTTP referrers)" -ForegroundColor White
Write-Host "  [ ] 4. Add http://localhost:3000/* to allowed referrers" -ForegroundColor White
Write-Host "  [ ] 5. Enable billing (required for Maps API)" -ForegroundColor White

Write-Host "`nQuick Links:" -ForegroundColor Cyan
Write-Host "  API Library:    https://console.cloud.google.com/apis/library" -ForegroundColor White
Write-Host "  Credentials:    https://console.cloud.google.com/apis/credentials" -ForegroundColor White
Write-Host "  Billing:        https://console.cloud.google.com/billing" -ForegroundColor White
Write-Host "  Documentation:  GOOGLE_MAPS_SETUP.md`n" -ForegroundColor White

if ($issuesFound -eq 0) {
    Write-Host "✅ Configuration looks good!" -ForegroundColor Green
    Write-Host "`nNext Steps:" -ForegroundColor Cyan
    Write-Host "  1. Complete the Google Cloud Console checklist above" -ForegroundColor White
    Write-Host "  2. Restart dev server: npm run dev" -ForegroundColor White
    Write-Host "  3. Visit: http://localhost:3000/map" -ForegroundColor White
    Write-Host "  4. Check browser console for any Maps API errors`n" -ForegroundColor White
} else {
    Write-Host "⚠️  Found $issuesFound issue(s) - fix above before proceeding`n" -ForegroundColor Yellow
}

Write-Host "After completing setup, test at: http://localhost:3000/map`n" -ForegroundColor Cyan
