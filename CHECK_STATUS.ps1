# AGRITRACE - System Status Check
# This script checks if all components are properly set up

Write-Host "========================================" -ForegroundColor Green
Write-Host "  AGRITRACE System Status Check" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found" -ForegroundColor Red
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found" -ForegroundColor Red
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>&1
    Write-Host "✓ npm installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found" -ForegroundColor Red
}

# Check Docker
Write-Host "Checking Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>&1
    Write-Host "✓ Docker installed: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker not found (optional)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Checking project structure..." -ForegroundColor Yellow

# Check backend
if (Test-Path "$PSScriptRoot\backend") {
    Write-Host "✓ Backend directory exists" -ForegroundColor Green
} else {
    Write-Host "✗ Backend directory missing" -ForegroundColor Red
}

# Check frontend
if (Test-Path "$PSScriptRoot\frontend") {
    Write-Host "✓ Frontend directory exists" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend directory missing" -ForegroundColor Red
}

# Check blockchain
if (Test-Path "$PSScriptRoot\blockchain") {
    Write-Host "✓ Blockchain directory exists" -ForegroundColor Green
} else {
    Write-Host "✗ Blockchain directory missing" -ForegroundColor Red
}

# Check if frontend dependencies are installed
if (Test-Path "$PSScriptRoot\frontend\node_modules") {
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend dependencies not installed (run: cd frontend; npm install)" -ForegroundColor Yellow
}

# Check if backend virtual environment exists
if (Test-Path "$PSScriptRoot\backend\venv") {
    Write-Host "✓ Backend virtual environment exists" -ForegroundColor Green
} else {
    Write-Host "✗ Backend virtual environment not created (run: cd backend; python -m venv venv)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Status check complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install frontend dependencies: cd frontend; npm install" -ForegroundColor White
Write-Host "2. Start frontend: cd frontend; npm start" -ForegroundColor White
Write-Host "3. Access at: http://localhost:3000" -ForegroundColor White
Write-Host ""
