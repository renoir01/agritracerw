# AGRITRACE - Start Django Backend
# This script sets up and starts the Django backend server

Write-Host "========================================" -ForegroundColor Green
Write-Host "  AGRITRACE Backend Startup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Navigate to backend directory
Set-Location -Path "$PSScriptRoot\backend"

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Install/Update dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt --quiet

# Create .env if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    python env_config.py
}

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
python manage.py makemigrations
python manage.py migrate

# Create superuser prompt
Write-Host ""
Write-Host "Do you want to create a superuser? (Y/N)" -ForegroundColor Cyan
$createSuperuser = Read-Host
if ($createSuperuser -eq "Y" -or $createSuperuser -eq "y") {
    python manage.py createsuperuser
}

# Start server
Write-Host ""
Write-Host "Starting Django development server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will be available at:" -ForegroundColor Cyan
Write-Host "  http://localhost:8000" -ForegroundColor Cyan
Write-Host "  API Docs: http://localhost:8000/api/docs/" -ForegroundColor Cyan
Write-Host "  Admin: http://localhost:8000/admin/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python manage.py runserver
