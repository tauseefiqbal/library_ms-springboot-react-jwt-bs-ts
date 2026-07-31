#!/usr/bin/env pwsh
# Full Vercel deployment script for Docker monolith

param(
    [Parameter(Mandatory = $false)]
    [string]$ApiBaseUrl = "",

    [Parameter(Mandatory = $false)]
    [switch]$Production
)

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Vercel Deployment: Spring Boot + React" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Check Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Ask for API base URL if missing
if (-not $ApiBaseUrl) {
    Write-Host "⚠️  No API base URL provided." -ForegroundColor Yellow
    $ApiBaseUrl = Read-Host "Enter API base URL (e.g., https://your-backend.onrender.com)"
}

Write-Host ""
Write-Host "📝 Configuration:" -ForegroundColor Green
Write-Host "   API Base URL: $ApiBaseUrl"
Write-Host "   Environment: $(if ($Production) { 'Production' } else { 'Preview' })"
Write-Host ""

# Create .env file for Docker build
Write-Host "🔧 Creating .env for Docker build..." -ForegroundColor Blue
$envContent = @"
VITE_API_BASE_URL=$ApiBaseUrl
SPRING_PROFILES_ACTIVE=prod
"@
Set-Content -Path ".env" -Value $envContent

Write-Host "📦 .env file created and included in Docker build context." -ForegroundColor Green

# Deploy root folder (Dockerfile must be here)
Write-Host "🚀 Deploying Docker app to Vercel..." -ForegroundColor Blue
if ($Production) {
    vercel --prod
}
else {
    vercel
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  ✅ Deployment initiated!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Note your Vercel URL from the output above"
Write-Host "   2. Add that URL to your backend's CORS allowed origins"
Write-Host "   3. Redeploy backend if needed"
Write-Host ""
