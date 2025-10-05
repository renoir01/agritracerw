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
