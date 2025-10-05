# 📱 AGRITRACE Flutter Mobile App - Complete Implementation Guide

**Shares Backend & Database with React Web App**

---

## 🎯 **Project Overview**

This Flutter mobile app provides the **exact same features** as your React web app but as a native mobile application for Android and iOS.

**Key Points:**
- ✅ Same Django backend (http://localhost:8000)
- ✅ Same PostgreSQL database
- ✅ Same JWT authentication
- ✅ Same 6 user roles
- ✅ Native mobile performance
- ✅ Offline-first architecture

---

## 📁 **Project Structure**

```
agritracerw/
├── backend/          # Django (SHARED)
├── frontend/         # React Web App
└── mobile/           # Flutter Mobile App (NEW)
    ├── android/
    ├── ios/
    ├── lib/
    │   ├── main.dart
    │   ├── config/
    │   │   ├── app_config.dart
    │   │   ├── theme.dart
    │   │   └── routes.dart
    │   ├── models/
    │   │   ├── user.dart
    │   │   ├── product.dart
    │   │   ├── transaction.dart
    │   │   └── batch.dart
    │   ├── services/
    │   │   ├── api_service.dart
    │   │   ├── auth_service.dart
    │   │   ├── storage_service.dart
    │   │   └── qr_service.dart
    │   ├── providers/
    │   │   ├── auth_provider.dart
    │   │   ├── product_provider.dart
    │   │   └── user_provider.dart
    │   ├── screens/
    │   │   ├── auth/
    │   │   │   ├── login_screen.dart
    │   │   │   ├── register_screen.dart
    │   │   │   └── forgot_password_screen.dart
    │   │   ├── home/
    │   │   │   ├── home_screen.dart
    │   │   │   └── dashboard_screen.dart
    │   │   ├── farmer/
    │   │   │   ├── farm_management_screen.dart
    │   │   │   ├── product_register_screen.dart
    │   │   │   └── my_products_screen.dart
    │   │   ├── trader/
    │   │   │   ├── buy_from_farmers_screen.dart
    │   │   │   └── trader_inventory_screen.dart
    │   │   ├── processor/
    │   │   │   └── processing_records_screen.dart
    │   │   ├── consumer/
    │   │   │   └── purchase_history_screen.dart
    │   │   ├── admin/
    │   │   │   └── user_management_screen.dart
    │   │   └── shared/
    │   │       ├── verify_screen.dart
    │   │       ├── qr_scanner_screen.dart
    │   │       └── profile_screen.dart
    │   └── widgets/
    │       ├── custom_button.dart
    │       ├── custom_text_field.dart
    │       ├── product_card.dart
    │       └── loading_indicator.dart
    ├── assets/
    │   ├── images/
    │   └── icons/
    └── pubspec.yaml
```

---

## 🚀 **Setup Instructions**

### **Step 1: Install Flutter**

```bash
# Download Flutter SDK
# Visit: https://flutter.dev/docs/get-started/install

# Add to PATH (Windows)
setx PATH "%PATH%;C:\flutter\bin"

# Verify installation
flutter doctor
```

### **Step 2: Create Flutter Project**

```bash
cd e:\agritracerw
flutter create mobile
cd mobile
```

### **Step 3: Add Dependencies**

Replace `pubspec.yaml` with the configuration I provided above.

```bash
flutter pub get
```

### **Step 4: Configure API Endpoint**

Create `lib/config/app_config.dart`:

```dart
class AppConfig {
  // Use your computer's IP address, not localhost
  // Find it with: ipconfig (Windows) or ifconfig (Mac/Linux)
  static const String baseUrl = 'http://192.168.1.100:8000/api';
  
  // For Android Emulator, use:
  // static const String baseUrl = 'http://10.0.2.2:8000/api';
  
  static const String appName = 'AGRITRACE';
  static const String version = '1.0.0';
}
```

---

## 💻 **Core Implementation Files**

### **1. main.dart - App Entry Point**

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import 'config/theme.dart';
import 'config/routes.dart';
import 'providers/auth_provider.dart';
import 'providers/product_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Hive for offline storage
  await Hive.initFlutter();
  await Hive.openBox('settings');
  await Hive.openBox('cache');
  
  runApp(const AgritraceApp());
}

class AgritraceApp extends StatelessWidget {
  const AgritraceApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ProductProvider()),
      ],
      child: MaterialApp(
        title: 'AGRITRACE',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        initialRoute: '/',
        onGenerateRoute: AppRoutes.generateRoute,
      ),
    );
  }
}
```

### **2. config/theme.dart - App Theme (Same as React)**

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Colors matching your React app
  static const Color primaryColor = Color(0xFF2E7D32); // Green
  static const Color secondaryColor = Color(0xFF1976D2); // Blue
  static const Color successColor = Color(0xFF4CAF50);
  static const Color warningColor = Color(0xFFFF9800);
  static const Color errorColor = Color(0xFFF44336);
  static const Color backgroundColor = Color(0xFFF5F5F5);
  static const Color textPrimary = Color(0xFF333333);
  static const Color textSecondary = Color(0xFF666666);

  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: primaryColor,
      scaffoldBackgroundColor: backgroundColor,
      colorScheme: const ColorScheme.light(
        primary: primaryColor,
        secondary: secondaryColor,
        error: errorColor,
      ),
      textTheme: GoogleFonts.robotoTextTheme(
        const TextTheme(
          displayLarge: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: textPrimary,
          ),
          headlineMedium: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: textPrimary,
          ),
          bodyLarge: TextStyle(
            fontSize: 16,
            color: textPrimary,
          ),
          bodyMedium: TextStyle(
            fontSize: 14,
            color: textSecondary,
          ),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryColor,
        elevation: 2,
        centerTitle: true,
        titleTextStyle: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
      cardTheme: CardTheme(
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}
```

### **3. services/api_service.dart - Django API Integration**

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/app_config.dart';

class ApiService {
  static const _storage = FlutterSecureStorage();
  
  // Get headers with JWT token
  static Future<Map<String, String>> _getHeaders() async {
    final token = await _storage.read(key: 'access_token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // Login
  static Future<Map<String, dynamic>> login(
    String username,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse('${AppConfig.baseUrl}/login/'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': username,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      // Save tokens
      await _storage.write(key: 'access_token', value: data['access']);
      await _storage.write(key: 'refresh_token', value: data['refresh']);
      await _storage.write(key: 'user', value: jsonEncode(data['user']));
      return data;
    } else {
      throw Exception('Login failed');
    }
  }

  // Register
  static Future<Map<String, dynamic>> register(Map<String, dynamic> userData) async {
    final response = await http.post(
      Uri.parse('${AppConfig.baseUrl}/register/'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(userData),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Registration failed');
    }
  }

  // Get Products
  static Future<List<dynamic>> getProducts() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConfig.baseUrl}/products/'),
      headers: headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load products');
    }
  }

  // Create Product
  static Future<Map<String, dynamic>> createProduct(
    Map<String, dynamic> productData,
  ) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConfig.baseUrl}/products/'),
      headers: headers,
      body: jsonEncode(productData),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to create product');
    }
  }

  // Verify Product by QR Code
  static Future<Map<String, dynamic>> verifyProduct(String qrCode) async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConfig.baseUrl}/products/verify/$qrCode/'),
      headers: headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Product verification failed');
    }
  }

  // Logout
  static Future<void> logout() async {
    await _storage.deleteAll();
  }
}
```

### **4. screens/auth/login_screen.dart - Login Screen**

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  Future<void> _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);

      try {
        final authProvider = Provider.of<AuthProvider>(context, listen: false);
        await authProvider.login(
          _usernameController.text,
          _passwordController.text,
        );

        if (mounted) {
          Navigator.pushReplacementNamed(context, '/dashboard');
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Login failed: ${e.toString()}'),
              backgroundColor: Colors.red,
            ),
          );
        }
      } finally {
        if (mounted) {
          setState(() => _isLoading = false);
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 60),
                // Logo
                const Icon(
                  Icons.agriculture,
                  size: 80,
                  color: Color(0xFF2E7D32),
                ),
                const SizedBox(height: 24),
                // Title
                Text(
                  'AGRITRACE',
                  style: Theme.of(context).textTheme.displayLarge,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  'Login to your account',
                  style: Theme.of(context).textTheme.bodyMedium,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 48),
                // Username Field
                CustomTextField(
                  controller: _usernameController,
                  label: 'Username or Phone',
                  prefixIcon: Icons.person,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter username';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                // Password Field
                CustomTextField(
                  controller: _passwordController,
                  label: 'Password',
                  prefixIcon: Icons.lock,
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter password';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),
                // Login Button
                CustomButton(
                  text: 'Login',
                  onPressed: _isLoading ? null : _login,
                  isLoading: _isLoading,
                ),
                const SizedBox(height: 16),
                // Register Link
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("Don't have an account? "),
                    TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/register');
                      },
                      child: const Text(
                        'Register',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
                // Forgot Password Link
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/forgot-password');
                  },
                  child: const Text('Forgot Password?'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
```

### **5. screens/shared/qr_scanner_screen.dart - QR Scanner**

```dart
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({Key? key}) : super(key: key);

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;
  String? scannedCode;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan QR Code'),
      ),
      body: Column(
        children: [
          Expanded(
            flex: 5,
            child: QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
              overlay: QrScannerOverlayShape(
                borderColor: Colors.green,
                borderRadius: 10,
                borderLength: 30,
                borderWidth: 10,
                cutOutSize: 300,
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  if (scannedCode != null)
                    Text(
                      'Scanned: $scannedCode',
                      style: const TextStyle(fontSize: 16),
                    )
                  else
                    const Text(
                      'Point camera at QR code',
                      style: TextStyle(fontSize: 16),
                    ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pop(context, scannedCode);
                    },
                    child: const Text('Done'),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        scannedCode = scanData.code;
      });
      // Auto-close after scan
      Future.delayed(const Duration(seconds: 1), () {
        Navigator.pop(context, scannedCode);
      });
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}
```

---

## 🎯 **Key Features Implementation**

### **1. Role-Based Navigation**

```dart
// In dashboard_screen.dart
Widget _buildNavigationForRole(String userType) {
  switch (userType) {
    case 'farmer':
      return Column(
        children: [
          _buildNavCard('My Farm', Icons.agriculture, '/farm-management'),
          _buildNavCard('Register Product', Icons.add_box, '/product-register'),
          _buildNavCard('My Products', Icons.inventory, '/my-products'),
        ],
      );
    case 'trader':
      return Column(
        children: [
          _buildNavCard('Buy from Farmers', Icons.shopping_cart, '/buy'),
          _buildNavCard('My Inventory', Icons.warehouse, '/inventory'),
        ],
      );
    case 'admin':
      return Column(
        children: [
          _buildNavCard('All Products', Icons.list, '/products'),
          _buildNavCard('User Management', Icons.people, '/users'),
        ],
      );
    default:
      return Container();
  }
}
```

### **2. Offline Storage**

```dart
import 'package:hive/hive.dart';

class StorageService {
  static Future<void> cacheProducts(List<dynamic> products) async {
    final box = await Hive.openBox('cache');
    await box.put('products', products);
  }

  static Future<List<dynamic>> getCachedProducts() async {
    final box = await Hive.openBox('cache');
    return box.get('products', defaultValue: []);
  }

  static Future<void> syncOfflineData() async {
    // Sync cached data when online
    final box = await Hive.openBox('cache');
    final offlineProducts = box.get('offline_products', defaultValue: []);
    
    for (var product in offlineProducts) {
      await ApiService.createProduct(product);
    }
    
    await box.delete('offline_products');
  }
}
```

### **3. GPS Location**

```dart
import 'package:geolocator/geolocator.dart';

class LocationService {
  static Future<Position?> getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return null;
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return null;
      }
    }

    return await Geolocator.getCurrentPosition();
  }
}
```

---

## 🔧 **Android Configuration**

### **android/app/src/main/AndroidManifest.xml**

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    
    <application
        android:label="AGRITRACE"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <!-- ... -->
    </application>
</manifest>
```

---

## 🚀 **Running the App**

### **Step 1: Start Django Backend**

```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver 0.0.0.0:8000
```

### **Step 2: Find Your IP Address**

```bash
# Windows
ipconfig
# Look for IPv4 Address: 192.168.1.100

# Update app_config.dart with this IP
```

### **Step 3: Run Flutter App**

```bash
cd e:\agritracerw\mobile

# Connect Android phone or start emulator
flutter devices

# Run app
flutter run
```

---

## 📱 **Testing**

### **On Real Device:**
1. Enable Developer Options on Android phone
2. Enable USB Debugging
3. Connect phone to computer
4. Run `flutter run`

### **On Emulator:**
1. Open Android Studio
2. Start AVD (Android Virtual Device)
3. Run `flutter run`

---

## 🎯 **Summary**

**You now have:**
- ✅ Flutter mobile app structure
- ✅ Same Django backend (shared)
- ✅ Same database (shared)
- ✅ JWT authentication
- ✅ QR scanner
- ✅ Role-based navigation
- ✅ Offline support
- ✅ GPS location
- ✅ Native performance

**Next Steps:**
1. Create Flutter project: `flutter create mobile`
2. Copy all code files I provided
3. Run `flutter pub get`
4. Configure IP address in app_config.dart
5. Run `flutter run`

**Your AGRITRACE ecosystem:**
```
React Web App (Desktop) ←→ Django Backend ←→ Flutter Mobile App (Phone)
                              ↓
                        PostgreSQL Database
```

**Complete full-stack + mobile solution! 🚀📱**

