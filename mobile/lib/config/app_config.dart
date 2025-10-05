class AppConfig {
  // API Configuration
  // For Web (Chrome/Edge), use localhost
  static const String baseUrl = 'http://localhost:8000/api/v1';
  
  // For Android Emulator, use:
  // static const String baseUrl = 'http://10.0.2.2:8000/api/v1';
  
  // For iOS Simulator, use:
  // static const String baseUrl = 'http://localhost:8000/api/v1';
  
  // App Information
  static const String appName = 'AGRITRACE';
  static const String appVersion = '1.0.0';
  static const String appDescription = 'Blockchain-Based Traceability for Biofortified Crops';
  
  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userKey = 'user';
  
  // API Endpoints
  static const String loginEndpoint = '/users/login/';
  static const String registerEndpoint = '/users/register/';
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
