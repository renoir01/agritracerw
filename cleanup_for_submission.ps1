# AGRITRACE Project Cleanup Script
# Run this before submitting your project

Write-Host "🧹 Cleaning AGRITRACE project for submission..." -ForegroundColor Green

# Backend cleanup
Write-Host "`n📦 Cleaning backend..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "backend\venv" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "backend\__pycache__" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "backend\*\__pycache__" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "backend\staticfiles" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "backend\.pytest_cache" -ErrorAction SilentlyContinue
Remove-Item -Force "backend\db.sqlite3" -ErrorAction SilentlyContinue
Get-ChildItem -Recurse -Filter "*.pyc" | Remove-Item -Force -ErrorAction SilentlyContinue

# Frontend cleanup
Write-Host "`n⚛️  Cleaning React frontend..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "frontend\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "frontend\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "frontend\.cache" -ErrorAction SilentlyContinue

# Flutter cleanup
Write-Host "`n📱 Cleaning Flutter mobile..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "mobile\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "mobile\.dart_tool" -ErrorAction SilentlyContinue
Remove-Item -Force "mobile\.flutter-plugins" -ErrorAction SilentlyContinue
Remove-Item -Force "mobile\.flutter-plugins-dependencies" -ErrorAction SilentlyContinue
Remove-Item -Force "mobile\.packages" -ErrorAction SilentlyContinue

# Root cleanup
Write-Host "`n🗑️  Cleaning root temporary files..." -ForegroundColor Yellow
Remove-Item -Force "mobile_main.dart" -ErrorAction SilentlyContinue
Remove-Item -Force "mobile_auth_provider.dart" -ErrorAction SilentlyContinue
Remove-Item -Force "copy_flutter_files.ps1" -ErrorAction SilentlyContinue

# System files
Write-Host "`n🖥️  Cleaning system files..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Filter ".DS_Store" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Recurse -Filter "Thumbs.db" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Recurse -Filter "desktop.ini" | Remove-Item -Force -ErrorAction SilentlyContinue

Write-Host "`n✅ Cleanup complete!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Review remaining files"
Write-Host "   2. Test that project can be set up from scratch"
Write-Host "   3. Update README with setup instructions"
Write-Host "   4. Create ZIP/archive for submission"
Write-Host ""
