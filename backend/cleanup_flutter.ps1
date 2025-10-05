# Cleanup Flutter files accidentally created in backend folder

Write-Host "🧹 Cleaning up Flutter files from backend folder..." -ForegroundColor Yellow

# List of Flutter-created folders to remove
$foldersToRemove = @(
    "android",
    "ios",
    "lib",
    "linux",
    "macos",
    "test",
    "web",
    "windows",
    ".dart_tool",
    ".idea"
)

# List of Flutter-created files to remove
$filesToRemove = @(
    ".gitignore",
    ".metadata",
    "analysis_options.yaml",
    "backend.iml",
    "pubspec.lock",
    "pubspec.yaml",
    "README.md"
)

# Remove folders
foreach ($folder in $foldersToRemove) {
    $path = Join-Path -Path $PSScriptRoot -ChildPath $folder
    if (Test-Path $path) {
        Write-Host "Removing folder: $folder" -ForegroundColor Cyan
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Remove files (but keep Django files)
foreach ($file in $filesToRemove) {
    $path = Join-Path -Path $PSScriptRoot -ChildPath $file
    if (Test-Path $path) {
        # Check if it's a Flutter-created file (not Django)
        $content = Get-Content $path -Raw -ErrorAction SilentlyContinue
        if ($content -match "flutter" -or $content -match "dart" -or $file -eq ".metadata") {
            Write-Host "Removing file: $file" -ForegroundColor Cyan
            Remove-Item -Path $path -Force -ErrorAction SilentlyContinue
        } else {
            Write-Host "Keeping Django file: $file" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. cd .." -ForegroundColor White
Write-Host "2. flutter create mobile" -ForegroundColor White
Write-Host "3. cd mobile" -ForegroundColor White
Write-Host "4. Copy Flutter code files" -ForegroundColor White
