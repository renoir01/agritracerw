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
