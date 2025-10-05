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
