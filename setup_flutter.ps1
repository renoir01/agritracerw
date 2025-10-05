# AGRITRACE Flutter Mobile App Setup Script
# Run this script to set up the Flutter mobile app structure

Write-Host "🚀 Setting up AGRITRACE Flutter Mobile App..." -ForegroundColor Green
Write-Host ""

# Navigate to mobile directory
Set-Location -Path "e:\agritracerw\mobile"

# Check if Flutter is installed
Write-Host "Checking Flutter installation..." -ForegroundColor Cyan
$flutterCheck = flutter --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Flutter is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Flutter from: https://flutter.dev/docs/get-started/install" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Flutter is installed" -ForegroundColor Green
Write-Host ""

# Run flutter doctor
Write-Host "Running Flutter Doctor..." -ForegroundColor Cyan
flutter doctor
Write-Host ""

# Create lib directory if it doesn't exist
Write-Host "Creating lib directory..." -ForegroundColor Cyan
if (!(Test-Path -Path "lib")) {
    New-Item -ItemType Directory -Path "lib" | Out-Null
    Write-Host "✅ Created lib directory" -ForegroundColor Green
} else {
    Write-Host "✅ lib directory already exists" -ForegroundColor Green
}
Write-Host ""

# Install dependencies
Write-Host "Installing Flutter dependencies..." -ForegroundColor Cyan
flutter pub get
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Create main.dart if it doesn't exist
$mainDartPath = "lib\main.dart"
if (!(Test-Path -Path $mainDartPath)) {
    Write-Host "Creating main.dart..." -ForegroundColor Cyan
    
    $mainDartContent = @"
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const AgritraceApp());
}

class AgritraceApp extends StatelessWidget {
  const AgritraceApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AGRITRACE',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFF2E7D32),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2E7D32),
        ),
        textTheme: GoogleFonts.robotoTextTheme(),
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF2E7D32),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.agriculture,
              size: 100,
              color: Colors.white,
            ),
            const SizedBox(height: 20),
            Text(
              'AGRITRACE',
              style: GoogleFonts.roboto(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              'Blockchain-Based Traceability',
              style: TextStyle(
                fontSize: 16,
                color: Colors.white70,
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              'for Biofortified Crops in Rwanda',
              style: TextStyle(
                fontSize: 14,
                color: Colors.white60,
              ),
            ),
            const SizedBox(height: 40),
            const CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
"@
    
    Set-Content -Path $mainDartPath -Value $mainDartContent
    Write-Host "✅ Created main.dart" -ForegroundColor Green
} else {
    Write-Host "✅ main.dart already exists" -ForegroundColor Green
}
Write-Host ""

# Summary
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ AGRITRACE Flutter Mobile App Setup Complete!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Connect Android device or start emulator" -ForegroundColor White
Write-Host "2. Run: flutter devices" -ForegroundColor White
Write-Host "3. Run: flutter run" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Useful Commands:" -ForegroundColor Yellow
Write-Host "   flutter run          - Run the app" -ForegroundColor White
Write-Host "   flutter run -d chrome - Run in Chrome browser" -ForegroundColor White
Write-Host "   flutter build apk    - Build Android APK" -ForegroundColor White
Write-Host "   flutter clean        - Clean build files" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   See FLUTTER_MOBILE_GUIDE.md for complete implementation" -ForegroundColor White
Write-Host "   See FLUTTER_SETUP_COMPLETE.md for detailed setup" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to develop! Happy coding!" -ForegroundColor Green
