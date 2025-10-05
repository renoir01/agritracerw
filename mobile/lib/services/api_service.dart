import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/app_config.dart';
import '../models/user.dart';
import '../models/product.dart';
import '../models/transaction.dart';

class ApiService {
  static const _storage = FlutterSecureStorage();

  // Get headers with JWT token
  static Future<Map<String, String>> _getHeaders() async {
    final token = await _storage.read(key: AppConfig.accessTokenKey);
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  static Future<Map<String, dynamic>> login(
    String username,
    String password,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.loginEndpoint}'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': username,
          'password': password,
        }),
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        
        // Save tokens
        await _storage.write(
          key: AppConfig.accessTokenKey,
          value: data['access'],
        );
        await _storage.write(
          key: AppConfig.refreshTokenKey,
          value: data['refresh'],
        );
        await _storage.write(
          key: AppConfig.userKey,
          value: jsonEncode(data['user']),
        );
        
        return data;
      } else {
        throw Exception('Login failed: ${response.body}');
      }
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  static Future<Map<String, dynamic>> register(
    Map<String, dynamic> userData,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.registerEndpoint}'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(userData),
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 201 || response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        final error = jsonDecode(response.body);
        throw Exception(error.toString());
      }
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  static Future<User?> getCurrentUser() async {
    try {
      final userJson = await _storage.read(key: AppConfig.userKey);
      if (userJson != null) {
        return User.fromJson(jsonDecode(userJson));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  static Future<void> logout() async {
    await _storage.deleteAll();
  }

  // ============================================
  // PRODUCTS
  // ============================================

  static Future<List<Product>> getProducts({
    String? userType,
    int? ownerId,
  }) async {
    try {
      final headers = await _getHeaders();
      var url = '${AppConfig.baseUrl}${AppConfig.productsEndpoint}';
      
      if (ownerId != null) {
        url += '?owner=$ownerId';
      }
      
      final response = await http.get(
        Uri.parse(url),
        headers: headers,
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((json) => Product.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load products');
      }
    } catch (e) {
      throw Exception('Error loading products: $e');
    }
  }

  static Future<Product> getProductById(int id) async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.productsEndpoint}$id/'),
        headers: headers,
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        return Product.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Product not found');
      }
    } catch (e) {
      throw Exception('Error loading product: $e');
    }
  }

  static Future<Product> verifyProduct(String qrCode) async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.productsEndpoint}verify/$qrCode/'),
        headers: headers,
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        return Product.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Product not found or invalid QR code');
      }
    } catch (e) {
      throw Exception('Verification failed: $e');
    }
  }

  static Future<Product> createProduct(Map<String, dynamic> productData) async {
    try {
      final headers = await _getHeaders();
      final response = await http.post(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.productsEndpoint}'),
        headers: headers,
        body: jsonEncode(productData),
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 201 || response.statusCode == 200) {
        return Product.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to create product: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error creating product: $e');
    }
  }

  static Future<Product> updateProduct(
    int id,
    Map<String, dynamic> productData,
  ) async {
    try {
      final headers = await _getHeaders();
      final response = await http.put(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.productsEndpoint}$id/'),
        headers: headers,
        body: jsonEncode(productData),
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        return Product.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to update product');
      }
    } catch (e) {
      throw Exception('Error updating product: $e');
    }
  }

  static Future<void> deleteProduct(int id) async {
    try {
      final headers = await _getHeaders();
      final response = await http.delete(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.productsEndpoint}$id/'),
        headers: headers,
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode != 204 && response.statusCode != 200) {
        throw Exception('Failed to delete product');
      }
    } catch (e) {
      throw Exception('Error deleting product: $e');
    }
  }

  // ============================================
  // TRANSACTIONS
  // ============================================

  static Future<List<Transaction>> getTransactions({int? userId}) async {
    try {
      final headers = await _getHeaders();
      var url = '${AppConfig.baseUrl}${AppConfig.transactionsEndpoint}';
      
      if (userId != null) {
        url += '?user=$userId';
      }
      
      final response = await http.get(
        Uri.parse(url),
        headers: headers,
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((json) => Transaction.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load transactions');
      }
    } catch (e) {
      throw Exception('Error loading transactions: $e');
    }
  }

  static Future<Transaction> createTransaction(
    Map<String, dynamic> transactionData,
  ) async {
    try {
      final headers = await _getHeaders();
      final response = await http.post(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.transactionsEndpoint}'),
        headers: headers,
        body: jsonEncode(transactionData),
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 201 || response.statusCode == 200) {
        return Transaction.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to create transaction');
      }
    } catch (e) {
      throw Exception('Error creating transaction: $e');
    }
  }

  // ============================================
  // USERS (Admin only)
  // ============================================

  static Future<List<User>> getAllUsers() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.usersEndpoint}'),
        headers: headers,
      ).timeout(AppConfig.connectionTimeout);

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((json) => User.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load users');
      }
    } catch (e) {
      throw Exception('Error loading users: $e');
    }
  }

  // ============================================
  // UTILITY
  // ============================================

  static Future<bool> checkConnection() async {
    try {
      final response = await http.get(
        Uri.parse('${AppConfig.baseUrl}/health/'),
      ).timeout(const Duration(seconds: 5));
      
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  static Future<String?> getAccessToken() async {
    return await _storage.read(key: AppConfig.accessTokenKey);
  }

  static Future<bool> isLoggedIn() async {
    final token = await getAccessToken();
    return token != null && token.isNotEmpty;
  }
}
