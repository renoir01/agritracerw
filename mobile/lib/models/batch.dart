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
