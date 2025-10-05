# AGRITRACE - Run Frontend Only
# This script starts just the React frontend for quick preview

Write-Host "========================================" -ForegroundColor Green
Write-Host "  AGRITRACE Frontend Startup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "$PSScriptRoot\frontend"

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Starting React development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Once started, open your browser to:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start
