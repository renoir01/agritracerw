// lib/config/app_config.dart
// Copy this to: mobile/lib/config/app_config.dart

class AppConfig {
  // API Configuration
  // IMPORTANT: Replace with your computer's IP address
  // Find it with: ipconfig (Windows) or ifconfig (Mac/Linux)
  static const String baseUrl = 'http://192.168.1.100:8000/api';
  
  // For Android Emulator, use:
  // static const String baseUrl = 'http://10.0.2.2:8000/api';
  
  // For iOS Simulator, use:
  // static const String baseUrl = 'http://localhost:8000/api';
  
  // App Information
  static const String appName = 'AGRITRACE';
  static const String appVersion = '1.0.0';
  static const String appDescription = 'Blockchain-Based Traceability for Biofortified Crops';
  
  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userKey = 'user';
  
  // API Endpoints
  static const String loginEndpoint = '/login/';
  static const String registerEndpoint = '/register/';
  static const String productsEndpoint = '/products/';
  static const String transactionsEndpoint = '/transactions/';
  static const String usersEndpoint = '/users/';
  
  // Timeouts
  static const Duration connectionTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
  
  // Pagination
  static const int pageSize = 20;
  
  // Cache Duration
  static const Duration cacheDuration = Duration(hours: 1);
}
