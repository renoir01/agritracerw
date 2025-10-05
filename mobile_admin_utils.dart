// lib/screens/admin/user_management_screen.dart
// Copy this to: mobile/lib/screens/admin/user_management_screen.dart

import 'package:flutter/material.dart';

class UserManagementScreen extends StatefulWidget {
  const UserManagementScreen({Key? key}) : super(key: key);

  @override
  State<UserManagementScreen> createState() => _UserManagementScreenState();
}

class _UserManagementScreenState extends State<UserManagementScreen> {
  final _searchController = TextEditingController();
  String _selectedFilter = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('User Management'),
        backgroundColor: const Color(0xFF2E7D32),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // TODO: Add new user
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Search and Filter
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: 'Search users...',
                    prefixIcon: const Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _buildFilterChip('All', 'all'),
                      _buildFilterChip('👨‍🌾 Farmers', 'farmer'),
                      _buildFilterChip('🚚 Traders', 'trader'),
                      _buildFilterChip('🏭 Processors', 'processor'),
                      _buildFilterChip('🛒 Consumers', 'consumer'),
                      _buildFilterChip('🌱 Seed Producers', 'seed_producer'),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          // User List
          Expanded(
            child: ListView.builder(
              itemCount: 0, // TODO: Load from API
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: const Color(0xFF2E7D32),
                      child: Text(
                        'U',
                        style: const TextStyle(color: Colors.white),
                      ),
                    ),
                    title: const Text('Username'),
                    subtitle: const Text('user@example.com'),
                    trailing: PopupMenuButton(
                      itemBuilder: (context) => [
                        const PopupMenuItem(
                          value: 'view',
                          child: Text('View Details'),
                        ),
                        const PopupMenuItem(
                          value: 'edit',
                          child: Text('Edit'),
                        ),
                        const PopupMenuItem(
                          value: 'delete',
                          child: Text('Delete'),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, String value) {
    final isSelected = _selectedFilter == value;
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (selected) {
          setState(() {
            _selectedFilter = value;
          });
        },
        selectedColor: const Color(0xFF2E7D32).withOpacity(0.2),
        checkmarkColor: const Color(0xFF2E7D32),
      ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}

// ============================================
// lib/utils/constants.dart
// Copy this to: mobile/lib/utils/constants.dart

class AppConstants {
  // User Types
  static const String userTypeFarmer = 'farmer';
  static const String userTypeTrader = 'trader';
  static const String userTypeProcessor = 'processor';
  static const String userTypeConsumer = 'consumer';
  static const String userTypeSeedProducer = 'seed_producer';
  static const String userTypeAdmin = 'admin';

  // Units
  static const List<String> quantityUnits = ['kg', 'tons', 'bags', 'pieces'];

  // Soil Types
  static const List<String> soilTypes = ['Clay', 'Sandy', 'Loam', 'Silt', 'Peat'];

  // Irrigation Systems
  static const List<String> irrigationSystems = [
    'Rainfed',
    'Drip',
    'Sprinkler',
    'Flood',
    'Manual',
  ];

  // Processing Types
  static const List<String> processingTypes = [
    'Cleaning',
    'Sorting',
    'Milling',
    'Packaging',
    'Fortification',
    'Drying',
  ];

  // Quality Grades
  static const List<Map<String, String>> qualityGrades = [
    {'value': 'A', 'label': 'Grade A (Premium)'},
    {'value': 'B', 'label': 'Grade B (Standard)'},
    {'value': 'C', 'label': 'Grade C (Basic)'},
  ];

  // Transaction Types
  static const String transactionTypeSale = 'sale';
  static const String transactionTypeTransfer = 'transfer';
  static const String transactionTypePurchase = 'purchase';

  // Date Formats
  static const String dateFormat = 'dd/MM/yyyy';
  static const String dateTimeFormat = 'dd/MM/yyyy HH:mm';

  // Validation
  static const int minPasswordLength = 6;
  static const int minUsernameLength = 3;
}

// ============================================
// lib/utils/validators.dart
// Copy this to: mobile/lib/utils/validators.dart

class Validators {
  static String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email is required';
    }
    
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(value)) {
      return 'Please enter a valid email';
    }
    
    return null;
  }

  static String? validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Phone number is required';
    }
    
    // Rwanda phone format: +250 XXX XXX XXX
    final phoneRegex = RegExp(r'^\+?250\d{9}$|^0\d{9}$');
    if (!phoneRegex.hasMatch(value.replaceAll(' ', ''))) {
      return 'Please enter a valid Rwandan phone number';
    }
    
    return null;
  }

  static String? validateUsername(String? value) {
    if (value == null || value.isEmpty) {
      return 'Username is required';
    }
    
    if (value.length < AppConstants.minUsernameLength) {
      return 'Username must be at least ${AppConstants.minUsernameLength} characters';
    }
    
    final usernameRegex = RegExp(r'^[a-zA-Z0-9_]+$');
    if (!usernameRegex.hasMatch(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    
    return null;
  }

  static String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Password is required';
    }
    
    if (value.length < AppConstants.minPasswordLength) {
      return 'Password must be at least ${AppConstants.minPasswordLength} characters';
    }
    
    return null;
  }

  static String? validateRequired(String? value, String fieldName) {
    if (value == null || value.isEmpty) {
      return '$fieldName is required';
    }
    return null;
  }

  static String? validateNumber(String? value, String fieldName) {
    if (value == null || value.isEmpty) {
      return '$fieldName is required';
    }
    
    if (double.tryParse(value) == null) {
      return 'Please enter a valid number';
    }
    
    return null;
  }

  static String? validatePositiveNumber(String? value, String fieldName) {
    final numberError = validateNumber(value, fieldName);
    if (numberError != null) return numberError;
    
    if (double.parse(value!) <= 0) {
      return '$fieldName must be greater than 0';
    }
    
    return null;
  }
}

// ============================================
// lib/utils/helpers.dart
// Copy this to: mobile/lib/utils/helpers.dart

import 'package:intl/intl.dart';

class Helpers {
  // Format date
  static String formatDate(DateTime date) {
    return DateFormat('dd/MM/yyyy').format(date);
  }

  static String formatDateTime(DateTime date) {
    return DateFormat('dd/MM/yyyy HH:mm').format(date);
  }

  static String formatTime(DateTime date) {
    return DateFormat('HH:mm').format(date);
  }

  // Format currency (Rwandan Francs)
  static String formatCurrency(double amount) {
    final formatter = NumberFormat('#,##0', 'en_US');
    return '${formatter.format(amount)} RWF';
  }

  // Format number with decimals
  static String formatNumber(double number, {int decimals = 2}) {
    return number.toStringAsFixed(decimals);
  }

  // Format weight
  static String formatWeight(double kg) {
    if (kg >= 1000) {
      return '${(kg / 1000).toStringAsFixed(2)} tons';
    }
    return '${kg.toStringAsFixed(0)} kg';
  }

  // Get time ago
  static String getTimeAgo(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inDays > 365) {
      return '${(difference.inDays / 365).floor()} years ago';
    } else if (difference.inDays > 30) {
      return '${(difference.inDays / 30).floor()} months ago';
    } else if (difference.inDays > 0) {
      return '${difference.inDays} days ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} hours ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} minutes ago';
    } else {
      return 'Just now';
    }
  }

  // Truncate text
  static String truncateText(String text, int maxLength) {
    if (text.length <= maxLength) return text;
    return '${text.substring(0, maxLength)}...';
  }

  // Get user type emoji
  static String getUserTypeEmoji(String userType) {
    switch (userType) {
      case 'farmer':
        return '👨‍🌾';
      case 'trader':
        return '🚚';
      case 'processor':
        return '🏭';
      case 'consumer':
        return '🛒';
      case 'seed_producer':
        return '🌱';
      case 'admin':
        return '👔';
      default:
        return '👤';
    }
  }

  // Show success snackbar
  static void showSuccess(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  // Show error snackbar
  static void showError(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  // Show info snackbar
  static void showInfo(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.blue,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  // Show confirmation dialog
  static Future<bool> showConfirmDialog(
    BuildContext context, {
    required String title,
    required String message,
    String confirmText = 'Confirm',
    String cancelText = 'Cancel',
  }) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(cancelText),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(confirmText),
          ),
        ],
      ),
    );
    
    return result ?? false;
  }

  // Calculate iron content percentage
  static String calculateIronPercentage(double ironContent) {
    // Standard iron content for comparison (e.g., 30 ppm)
    const standardIron = 30.0;
    final percentage = (ironContent / standardIron) * 100;
    return '${percentage.toStringAsFixed(0)}%';
  }

  // Validate QR code format
  static bool isValidQRCode(String qrCode) {
    // QR code should be alphanumeric and at least 8 characters
    return qrCode.length >= 8 && RegExp(r'^[A-Z0-9-]+$').hasMatch(qrCode);
  }

  // Generate random QR code (for demo)
  static String generateQRCode() {
    final now = DateTime.now();
    return 'AGT-${now.year}${now.month}${now.day}-${now.millisecondsSinceEpoch % 10000}';
  }
}

// ============================================
// lib/services/storage_service.dart
// Copy this to: mobile/lib/services/storage_service.dart

import 'package:hive/hive.dart';

class StorageService {
  static const String _settingsBox = 'settings';
  static const String _cacheBox = 'cache';

  // Settings
  static Future<void> saveSetting(String key, dynamic value) async {
    final box = await Hive.openBox(_settingsBox);
    await box.put(key, value);
  }

  static Future<dynamic> getSetting(String key, {dynamic defaultValue}) async {
    final box = await Hive.openBox(_settingsBox);
    return box.get(key, defaultValue: defaultValue);
  }

  static Future<void> deleteSetting(String key) async {
    final box = await Hive.openBox(_settingsBox);
    await box.delete(key);
  }

  // Cache
  static Future<void> cacheData(String key, dynamic data) async {
    final box = await Hive.openBox(_cacheBox);
    await box.put(key, {
      'data': data,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }

  static Future<dynamic> getCachedData(String key) async {
    final box = await Hive.openBox(_cacheBox);
    final cached = box.get(key);
    
    if (cached == null) return null;
    
    final timestamp = DateTime.parse(cached['timestamp']);
    final now = DateTime.now();
    
    // Check if cache is still valid (1 hour)
    if (now.difference(timestamp).inHours < 1) {
      return cached['data'];
    }
    
    // Cache expired
    await box.delete(key);
    return null;
  }

  static Future<void> clearCache() async {
    final box = await Hive.openBox(_cacheBox);
    await box.clear();
  }

  // Offline queue for syncing
  static Future<void> addToOfflineQueue(String type, Map<String, dynamic> data) async {
    final box = await Hive.openBox(_cacheBox);
    final queue = box.get('offline_queue', defaultValue: <Map>[]) as List;
    
    queue.add({
      'type': type,
      'data': data,
      'timestamp': DateTime.now().toIso8601String(),
    });
    
    await box.put('offline_queue', queue);
  }

  static Future<List> getOfflineQueue() async {
    final box = await Hive.openBox(_cacheBox);
    return box.get('offline_queue', defaultValue: <Map>[]) as List;
  }

  static Future<void> clearOfflineQueue() async {
    final box = await Hive.openBox(_cacheBox);
    await box.delete('offline_queue');
  }
}

// ============================================
// lib/services/qr_service.dart
// Copy this to: mobile/lib/services/qr_service.dart

import 'package:qr_flutter/qr_flutter.dart';
import 'package:flutter/material.dart';

class QRService {
  // Generate QR code widget
  static Widget generateQRWidget(
    String data, {
    double size = 200,
    Color foregroundColor = Colors.black,
    Color backgroundColor = Colors.white,
  }) {
    return QrImageView(
      data: data,
      version: QrVersions.auto,
      size: size,
      foregroundColor: foregroundColor,
      backgroundColor: backgroundColor,
      errorCorrectionLevel: QrErrorCorrectLevel.H,
      embeddedImage: null, // Can add logo here
      embeddedImageStyle: const QrEmbeddedImageStyle(
        size: Size(40, 40),
      ),
    );
  }

  // Validate QR code format
  static bool isValidQRCode(String qrCode) {
    // QR code should match pattern: AGT-YYYYMMDD-XXXX
    final regex = RegExp(r'^AGT-\d{8}-\d{4,}$');
    return regex.hasMatch(qrCode);
  }

  // Parse QR code data
  static Map<String, String> parseQRCode(String qrCode) {
    final parts = qrCode.split('-');
    if (parts.length >= 3) {
      return {
        'prefix': parts[0],
        'date': parts[1],
        'id': parts[2],
      };
    }
    return {};
  }
}
