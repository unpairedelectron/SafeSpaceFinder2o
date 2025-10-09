Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host " Google Maps API Setup Checker" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Check .env.local
if (Test-Path ".env.local") {
    Write-Host "[OK] .env.local file exists" -ForegroundColor Green
    
    $content = Get-Content ".env.local" | Out-String
    
    if ($content -like "*NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza*") {
        Write-Host "[OK] Google Maps API key is configured" -ForegroundColor Green
    } elseif ($content -like "*NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=*") {
        Write-Host "[WARN] API key found but format looks incorrect" -ForegroundColor Yellow
        Write-Host "      Google Maps keys should start with 'AIza'" -ForegroundColor Yellow
    } else {
        Write-Host "[ERROR] API key not found in .env.local" -ForegroundColor Red
    }
} else {
    Write-Host "[ERROR] .env.local file not found" -ForegroundColor Red
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host " Required Setup Steps:" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor White

Write-Host "1. Go to Google Cloud Console" -ForegroundColor White
Write-Host "   https://console.cloud.google.com/apis/library`n" -ForegroundColor Gray

Write-Host "2. Enable these APIs:" -ForegroundColor White
Write-Host "   - Maps JavaScript API" -ForegroundColor Gray
Write-Host "   - Places API`n" -ForegroundColor Gray

Write-Host "3. Configure API Key Restrictions" -ForegroundColor White
Write-Host "   https://console.cloud.google.com/apis/credentials" -ForegroundColor Gray
Write-Host "   Add HTTP referrer: http://localhost:3000/*`n" -ForegroundColor Gray

Write-Host "4. Enable Billing (Required!)" -ForegroundColor White
Write-Host "   https://console.cloud.google.com/billing" -ForegroundColor Gray
Write-Host "   Free: $200/month credit (~28k map loads)`n" -ForegroundColor Gray

Write-Host "5. After setup, restart dev server:" -ForegroundColor White
Write-Host "   npm run dev`n" -ForegroundColor Gray

Write-Host "6. Test the map:" -ForegroundColor White
Write-Host "   http://localhost:3000/map`n" -ForegroundColor Gray

Write-Host "Full instructions: GOOGLE_MAPS_SETUP.md`n" -ForegroundColor Cyan
