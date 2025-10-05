# 🌾 AGRITRACE Flutter Mobile App

## ✅ Setup Complete

The Flutter mobile app for AGRITRACE is now fully configured and ready to use!

## 🎯 Features Implemented

### **Authentication**
- ✅ Landing page with app introduction
- ✅ User registration (with all fields from web app)
- ✅ User login
- ✅ JWT token authentication
- ✅ Shared authentication with React web app

### **User Types Supported**
- 👨‍🌾 Farmer
- 🚚 Trader/Aggregator
- 🏭 Processor/Retailer
- 🛒 Consumer
- 🌱 Seed Producer
- 👔 Administrator

### **Multi-Language Support**
- 🇷🇼 Kinyarwanda (rw)
- 🇬🇧 English (en)
- 🇫🇷 French (fr)

## 📁 Project Structure

```
mobile/
├── lib/
│   ├── main.dart                    # App entry point
│   ├── config/
│   │   ├── app_config.dart          # API configuration
│   │   └── theme.dart               # App theme
│   ├── models/
│   │   ├── user.dart
│   │   ├── product.dart
│   │   ├── transaction.dart
│   │   └── batch.dart
│   ├── providers/
│   │   ├── auth_provider.dart       # Authentication state
│   │   └── product_provider.dart    # Product state
│   ├── services/
│   │   └── api_service.dart         # API client
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── login_screen.dart
│   │   │   └── register_screen.dart
│   │   ├── home/
│   │   │   ├── landing_screen.dart
│   │   │   └── dashboard_screen.dart
│   │   └── shared/
│   │       ├── verify_screen.dart
│   │       └── profile_screen.dart
│   └── widgets/
│       └── stat_card.dart
├── pubspec.yaml
└── README.md
```

## 🔧 Configuration

### **API Endpoints**

The app connects to Django backend at:
- **Base URL**: `http://localhost:8000/api/v1`
- **Login**: `/users/login/`
- **Register**: `/users/register/`
- **Products**: `/products/`
- **Transactions**: `/transactions/`

### **CORS Configuration**

Django is configured to accept requests from any localhost port:
```python
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^http://localhost:\d+$",
    r"^http://127\.0\.0\.1:\d+$",
]
```

## 🚀 Running the App

### **1. Start Django Backend**
```powershell
cd e:\agritracerw\backend
python manage.py runserver
```

### **2. Run Flutter Mobile App**

**For Web (Chrome):**
```powershell
cd e:\agritracerw\mobile
flutter run -d chrome
```

**For Windows Desktop:**
```powershell
flutter run -d windows
```

**For Android Emulator:**
1. Update `lib/config/app_config.dart`:
   ```dart
   static const String baseUrl = 'http://10.0.2.2:8000/api/v1';
   ```
2. Run:
   ```powershell
   flutter run -d <device_id>
   ```

## 🧪 Testing

### **Test Unified Authentication**

1. **Register on React Web** (`http://localhost:3000/register`):
   - Username: `testuser`
   - Password: `test1234`
   - User Type: Farmer

2. **Login on Flutter Mobile**:
   - Use the same credentials
   - Should successfully authenticate

3. **Verify Dashboard**:
   - Dashboard should show role-specific content
   - Stats cards should display

## 📱 App Flow

```
Splash Screen (2s)
    ↓
Landing Page (if not authenticated)
    ↓
Login / Register
    ↓
Dashboard (role-based)
    ↓
- Products
- Transactions
- QR Verification
- Profile
```

## 🎨 Design

The Flutter app follows the same design principles as the React web app:
- **Primary Color**: Green (`#2E7D32`) - Agriculture theme
- **Card-based UI**: Clean, modern design
- **Responsive**: Works on all screen sizes
- **Accessible**: High contrast, clear labels

## 🔐 Security

- JWT token-based authentication
- Secure token storage using Hive
- HTTPS support (configure in production)
- CORS protection

## 📦 Dependencies

Key packages used:
- `provider` - State management
- `http` - API calls
- `hive` - Local storage
- `google_fonts` - Typography
- `flutter_svg` - Vector graphics

## 🐛 Troubleshooting

### **CORS Error**
Make sure Django backend has CORS configured:
```python
INSTALLED_APPS = [
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]
```

### **404 API Not Found**
Verify API endpoints in `lib/config/app_config.dart` match Django URLs.

### **Build Error**
Run:
```powershell
flutter clean
flutter pub get
flutter run
```

## 🚧 Future Enhancements

- [ ] QR code scanner implementation
- [ ] Offline mode with local caching
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Photo upload for products
- [ ] GPS location tracking
- [ ] Analytics charts
- [ ] Export to PDF reports

## 📞 Support

For issues or questions, contact: r.kaze@alustudent.com

---

**Version**: 1.0.0
**Last Updated**: 2025-10-03
**Platform**: Flutter 3.x
**Backend**: Django 4.x + Django REST Framework
