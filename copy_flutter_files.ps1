# AGRITRACE Flutter Files Auto-Copy Script

Write-Host "Creating Flutter directory structure..." -ForegroundColor Cyan

$mobileDir = "e:\agritracerw\mobile\lib"

# Create directories
$directories = @(
    "$mobileDir\config",
    "$mobileDir\models", 
    "$mobileDir\services",
    "$mobileDir\providers",
    "$mobileDir\screens\auth",
    "$mobileDir\screens\home",
    "$mobileDir\screens\shared",
    "$mobileDir\widgets",
    "$mobileDir\utils"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Copying files..." -ForegroundColor Cyan

# Copy main.dart
Get-Content "e:\agritracerw\mobile_main.dart" | Select-Object -Skip 3 | Set-Content "$mobileDir\main.dart"
Write-Host "Copied: main.dart" -ForegroundColor Green

# Copy config
Get-Content "e:\agritracerw\mobile_app_config.dart" | Select-Object -Skip 3 | Set-Content "$mobileDir\config\app_config.dart"
Write-Host "Copied: config/app_config.dart" -ForegroundColor Green

Get-Content "e:\agritracerw\mobile_theme.dart" | Select-Object -Skip 3 | Set-Content "$mobileDir\config\theme.dart"
Write-Host "Copied: config/theme.dart" -ForegroundColor Green

# Copy API service
Get-Content "e:\agritracerw\mobile_api_service.dart" | Select-Object -Skip 3 | Set-Content "$mobileDir\services\api_service.dart"
Write-Host "Copied: services/api_service.dart" -ForegroundColor Green

# Copy dashboard
Get-Content "e:\agritracerw\mobile_dashboard.dart" | Select-Object -Skip 3 | Set-Content "$mobileDir\screens\home\dashboard_screen.dart"
Write-Host "Copied: screens/home/dashboard_screen.dart" -ForegroundColor Green

Write-Host ""
Write-Host "Done! Now manually split these files:" -ForegroundColor Yellow
Write-Host "- mobile_models.dart -> 4 model files" -ForegroundColor Gray
Write-Host "- mobile_auth_provider.dart -> 2 provider files" -ForegroundColor Gray  
Write-Host "- mobile_widgets.dart -> 5 widget files" -ForegroundColor Gray
Write-Host "- mobile_auth_screens.dart -> 3 auth screens" -ForegroundColor Gray
Write-Host "- mobile_verify_screens.dart -> 3 shared screens" -ForegroundColor Gray
Write-Host ""
Write-Host "Or just copy code manually from each file!" -ForegroundColor Cyan
