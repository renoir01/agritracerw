// lib/models/user.dart
// Copy this to: mobile/lib/models/user.dart

class User {
  final int id;
  final String username;
  final String email;
  final String? phoneNumber;
  final String userType;
  final String? firstName;
  final String? lastName;
  final bool isActive;
  final DateTime? createdAt;

  User({
    required this.id,
    required this.username,
    required this.email,
    this.phoneNumber,
    required this.userType,
    this.firstName,
    this.lastName,
    this.isActive = true,
    this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      phoneNumber: json['phone_number'],
      userType: json['user_type'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      isActive: json['is_active'] ?? true,
      createdAt: json['created_at'] != null 
          ? DateTime.parse(json['created_at'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'email': email,
      'phone_number': phoneNumber,
      'user_type': userType,
      'first_name': firstName,
      'last_name': lastName,
      'is_active': isActive,
      'created_at': createdAt?.toIso8601String(),
    };
  }

  String get fullName => '${firstName ?? ''} ${lastName ?? ''}'.trim();
  
  String get userTypeLabel {
    switch (userType) {
      case 'farmer':
        return '👨‍🌾 Farmer';
      case 'trader':
        return '🚚 Trader';
      case 'processor':
        return '🏭 Processor';
      case 'consumer':
        return '🛒 Consumer';
      case 'seed_producer':
        return '🌱 Seed Producer';
      case 'admin':
        return '👔 Administrator';
      default:
        return userType;
    }
  }
}

// ============================================
// lib/models/product.dart
// Copy this to: mobile/lib/models/product.dart

class Product {
  final int id;
  final String qrCode;
  final String productName;
  final String variety;
  final double ironContent;
  final double quantity;
  final String unit;
  final bool biofortified;
  final int ownerId;
  final String? ownerName;
  final String? batchNumber;
  final String? blockchainHash;
  final DateTime? harvestDate;
  final DateTime createdAt;

  Product({
    required this.id,
    required this.qrCode,
    required this.productName,
    required this.variety,
    required this.ironContent,
    required this.quantity,
    required this.unit,
    required this.biofortified,
    required this.ownerId,
    this.ownerName,
    this.batchNumber,
    this.blockchainHash,
    this.harvestDate,
    required this.createdAt,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      qrCode: json['qr_code'],
      productName: json['product_name'],
      variety: json['variety'],
      ironContent: (json['iron_content'] ?? 0).toDouble(),
      quantity: (json['quantity'] ?? 0).toDouble(),
      unit: json['unit'] ?? 'kg',
      biofortified: json['biofortified'] ?? false,
      ownerId: json['owner'],
      ownerName: json['owner_name'],
      batchNumber: json['batch_number'],
      blockchainHash: json['blockchain_hash'],
      harvestDate: json['harvest_date'] != null
          ? DateTime.parse(json['harvest_date'])
          : null,
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'qr_code': qrCode,
      'product_name': productName,
      'variety': variety,
      'iron_content': ironContent,
      'quantity': quantity,
      'unit': unit,
      'biofortified': biofortified,
      'owner': ownerId,
      'owner_name': ownerName,
      'batch_number': batchNumber,
      'blockchain_hash': blockchainHash,
      'harvest_date': harvestDate?.toIso8601String(),
      'created_at': createdAt.toIso8601String(),
    };
  }

  String get displayQuantity => '$quantity $unit';
  String get displayIronContent => '${ironContent.toStringAsFixed(1)} ppm';
  bool get isVerified => blockchainHash != null && blockchainHash!.isNotEmpty;
}

// ============================================
// lib/models/transaction.dart
// Copy this to: mobile/lib/models/transaction.dart

class Transaction {
  final int id;
  final int fromUserId;
  final String? fromUserName;
  final int toUserId;
  final String? toUserName;
  final int productId;
  final String? productName;
  final double quantity;
  final String transactionType;
  final String? blockchainHash;
  final DateTime timestamp;

  Transaction({
    required this.id,
    required this.fromUserId,
    this.fromUserName,
    required this.toUserId,
    this.toUserName,
    required this.productId,
    this.productName,
    required this.quantity,
    required this.transactionType,
    this.blockchainHash,
    required this.timestamp,
  });

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'],
      fromUserId: json['from_user'],
      fromUserName: json['from_user_name'],
      toUserId: json['to_user'],
      toUserName: json['to_user_name'],
      productId: json['product'],
      productName: json['product_name'],
      quantity: (json['quantity'] ?? 0).toDouble(),
      transactionType: json['transaction_type'],
      blockchainHash: json['blockchain_hash'],
      timestamp: DateTime.parse(json['timestamp']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'from_user': fromUserId,
      'from_user_name': fromUserName,
      'to_user': toUserId,
      'to_user_name': toUserName,
      'product': productId,
      'product_name': productName,
      'quantity': quantity,
      'transaction_type': transactionType,
      'blockchain_hash': blockchainHash,
      'timestamp': timestamp.toIso8601String(),
    };
  }

  String get typeLabel {
    switch (transactionType) {
      case 'sale':
        return '💰 Sale';
      case 'transfer':
        return '🔄 Transfer';
      case 'purchase':
        return '🛒 Purchase';
      default:
        return transactionType;
    }
  }

  bool get isVerified => blockchainHash != null && blockchainHash!.isNotEmpty;
}

// ============================================
// lib/models/batch.dart
// Copy this to: mobile/lib/models/batch.dart

class Batch {
  final int id;
  final String batchNumber;
  final String seedVariety;
  final double quantity;
  final double ironContent;
  final double germinationRate;
  final DateTime productionDate;
  final String? certificationNumber;
  final int producerId;
  final String? producerName;
  final DateTime createdAt;

  Batch({
    required this.id,
    required this.batchNumber,
    required this.seedVariety,
    required this.quantity,
    required this.ironContent,
    required this.germinationRate,
    required this.productionDate,
    this.certificationNumber,
    required this.producerId,
    this.producerName,
    required this.createdAt,
  });

  factory Batch.fromJson(Map<String, dynamic> json) {
    return Batch(
      id: json['id'],
      batchNumber: json['batch_number'],
      seedVariety: json['seed_variety'],
      quantity: (json['quantity'] ?? 0).toDouble(),
      ironContent: (json['iron_content'] ?? 0).toDouble(),
      germinationRate: (json['germination_rate'] ?? 0).toDouble(),
      productionDate: DateTime.parse(json['production_date']),
      certificationNumber: json['certification_number'],
      producerId: json['producer'],
      producerName: json['producer_name'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'batch_number': batchNumber,
      'seed_variety': seedVariety,
      'quantity': quantity,
      'iron_content': ironContent,
      'germination_rate': germinationRate,
      'production_date': productionDate.toIso8601String(),
      'certification_number': certificationNumber,
      'producer': producerId,
      'producer_name': producerName,
      'created_at': createdAt.toIso8601String(),
    };
  }

  String get displayQuantity => '${quantity.toStringAsFixed(0)} kg';
  String get displayIronContent => '${ironContent.toStringAsFixed(1)} ppm';
  String get displayGerminationRate => '${germinationRate.toStringAsFixed(0)}%';
  bool get isCertified => certificationNumber != null && certificationNumber!.isNotEmpty;
}
