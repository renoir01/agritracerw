# 🔧 AGRITRACE - Backend Development Documentation

## Server-Side Architecture

### Technology Stack
- **Framework**: Django 4.2.x
- **API**: Django REST Framework
- **Authentication**: JWT (Simple JWT)
- **Database**: SQLite (development), PostgreSQL (production-ready)
- **Blockchain**: Custom implementation
- **USSD**: Africa's Talking API

---

## 1. Server-Side Code Examples

### 1.1 User Authentication (JWT)

**File**: `backend/users/views.py`

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class LoginView(APIView):
    """
    Handle user login and return JWT tokens
    """
    permission_classes = []  # Allow any
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
```

### 1.2 Product Registration with Blockchain

**File**: `backend/products/views.py`

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from blockchain.services import BlockchainService

class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Product operations
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def create(self, request):
        """
        Create new product and register on blockchain
        """
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Save product to database
            product = serializer.save(owner=request.user)
            
            # Register on blockchain
            blockchain_service = BlockchainService()
            block_hash = blockchain_service.add_product_block({
                'product_id': product.id,
                'product_name': product.product_name,
                'quantity': str(product.quantity),
                'owner': request.user.username,
                'timestamp': product.created_at.isoformat()
            })
            
            # Update product with blockchain hash
            product.blockchain_hash = block_hash
            product.save()
            
            return Response({
                'success': True,
                'message': 'Product registered successfully',
                'product': serializer.data,
                'blockchain_hash': block_hash
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def verify(self, request, pk=None):
        """
        Verify product authenticity via blockchain
        """
        product = self.get_object()
        blockchain_service = BlockchainService()
        
        is_valid = blockchain_service.verify_block(product.blockchain_hash)
        
        return Response({
            'product': ProductSerializer(product).data,
            'blockchain_verified': is_valid,
            'blockchain_hash': product.blockchain_hash
        })
```

### 1.3 Transaction Recording

**File**: `backend/transactions/views.py`

```python
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer
from blockchain.services import BlockchainService

class TransactionViewSet(viewsets.ModelViewSet):
    """
    Handle product transactions in supply chain
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    def create(self, request):
        """
        Create new transaction and record on blockchain
        """
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Create transaction
            transaction = serializer.save(
                sender=request.user,
                transaction_hash=self._generate_transaction_hash()
            )
            
            # Record on blockchain
            blockchain_service = BlockchainService()
            block_hash = blockchain_service.add_transaction_block({
                'transaction_id': transaction.id,
                'product_id': transaction.product.id,
                'sender': transaction.sender.username,
                'receiver': transaction.receiver.username,
                'quantity': str(transaction.quantity),
                'transaction_type': transaction.transaction_type,
                'timestamp': transaction.timestamp.isoformat()
            })
            
            transaction.blockchain_hash = block_hash
            transaction.save()
            
            return Response({
                'success': True,
                'transaction': serializer.data,
                'blockchain_hash': block_hash
            }, status=201)
        
        return Response(serializer.errors, status=400)
```

### 1.4 USSD Integration

**File**: `backend/ussd/views.py`

```python
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .services import USSDService

@csrf_exempt
def ussd_callback(request):
    """
    Handle USSD requests from Africa's Talking
    """
    session_id = request.POST.get('sessionId', None)
    service_code = request.POST.get('serviceCode', None)
    phone_number = request.POST.get('phoneNumber', None)
    text = request.POST.get('text', '')
    
    ussd_service = USSDService()
    response = ussd_service.process_request(
        session_id=session_id,
        phone_number=phone_number,
        text=text
    )
    
    return HttpResponse(response, content_type='text/plain')
```

---

## 2. Database Interactions

### 2.1 ORM Query Examples

**Complex Queries**:
```python
from django.db.models import Q, Count, Sum
from products.models import Product
from transactions.models import Transaction

# Get all biofortified products by a specific farmer
biofortified_products = Product.objects.filter(
    owner__user_type='farmer',
    biofortified=True,
    owner__id=user_id
).select_related('owner')

# Get transaction summary for a product
transaction_summary = Transaction.objects.filter(
    product_id=product_id
).aggregate(
    total_transactions=Count('id'),
    total_quantity_moved=Sum('quantity')
)

# Get products with their transaction count
products_with_transactions = Product.objects.annotate(
    transaction_count=Count('transaction')
).filter(transaction_count__gt=0)
```

### 2.2 Model Relationships

**Example**: Product with multiple transactions
```python
# Access related transactions
product = Product.objects.get(id=1)
all_transactions = product.transaction_set.all()

# Reverse relationship
transaction = Transaction.objects.get(id=1)
related_product = transaction.product
```

---

## 3. API Endpoints

### 3.1 Authentication Endpoints

```
POST /api/v1/users/register/
  - Register new user
  - Request Body: {username, email, password, user_type, ...}
  - Response: {success, message, user_id}

POST /api/v1/users/login/
  - User login
  - Request Body: {username, password}
  - Response: {success, user, tokens: {access, refresh}}

POST /api/v1/users/logout/
  - User logout
  - Headers: Authorization: Bearer <token>
  - Response: {success, message}

GET /api/v1/users/me/
  - Get current user profile
  - Headers: Authorization: Bearer <token>
  - Response: {user data}
```

### 3.2 Product Endpoints

```
GET /api/v1/products/
  - List all products
  - Query Params: ?owner_id=<id>, ?biofortified=true
  - Response: [{product1}, {product2}, ...]

POST /api/v1/products/
  - Create new product
  - Headers: Authorization: Bearer <token>
  - Request Body: {product_name, variety, quantity, ...}
  - Response: {success, product, blockchain_hash}

GET /api/v1/products/<id>/
  - Get product details
  - Response: {product data}

GET /api/v1/products/<id>/verify/
  - Verify product on blockchain
  - Response: {product, blockchain_verified, blockchain_hash}

GET /api/v1/products/<id>/history/
  - Get product transaction history
  - Response: [{transaction1}, {transaction2}, ...]
```

### 3.3 Transaction Endpoints

```
POST /api/v1/transactions/
  - Create new transaction
  - Headers: Authorization: Bearer <token>
  - Request Body: {product_id, receiver_id, quantity, ...}
  - Response: {success, transaction, blockchain_hash}

GET /api/v1/transactions/
  - List transactions
  - Query Params: ?product_id=<id>, ?sender_id=<id>
  - Response: [{transaction1}, {transaction2}, ...]

GET /api/v1/transactions/<id>/
  - Get transaction details
  - Response: {transaction data}
```

### 3.4 Blockchain Endpoints

```
GET /api/v1/blockchain/
  - Get blockchain status
  - Response: {chain_length, latest_block, is_valid}

GET /api/v1/blockchain/verify/<hash>/
  - Verify specific block
  - Response: {is_valid, block_data}
```

---

## 4. Server-Side Logic Examples

### 4.1 Custom Permissions

```python
from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission: Only owner or admin can modify
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions only for owner or admin
        return obj.owner == request.user or request.user.is_staff
```

### 4.2 Signal Handlers

```python
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction
from notifications.services import NotificationService

@receiver(post_save, sender=Transaction)
def notify_transaction_created(sender, instance, created, **kwargs):
    """
    Send notification when new transaction is created
    """
    if created:
        notification_service = NotificationService()
        notification_service.send_sms(
            phone=instance.receiver.phone_number,
            message=f"New transaction: {instance.quantity}kg of {instance.product.product_name}"
        )
```

### 4.3 Custom Middleware

```python
class RequestLoggingMiddleware:
    """
    Log all API requests for audit trail
    """
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Log request
        logger.info(f"{request.method} {request.path} from {request.user}")
        
        response = self.get_response(request)
        
        # Log response
        logger.info(f"Response: {response.status_code}")
        
        return response
```

---

## 5. Security Measures

### 5.1 Authentication
- JWT token-based authentication
- Token expiry: Access (5 min), Refresh (7 days)
- Secure password hashing (PBKDF2)

### 5.2 Authorization
- Role-based access control (RBAC)
- Custom permissions per endpoint
- Object-level permissions

### 5.3 Data Validation
```python
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be positive")
        return value
    
    def validate_harvest_date(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError("Harvest date cannot be in future")
        return value
```

### 5.4 SQL Injection Prevention
- Django ORM automatically escapes SQL
- Parameterized queries
- No raw SQL without proper escaping

### 5.5 CORS Configuration
```python
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^http://localhost:\d+$",
]
CORS_ALLOW_CREDENTIALS = True
```

---

## 6. Testing Examples

### 6.1 Unit Tests
```python
from django.test import TestCase
from users.models import User
from products.models import Product

class ProductTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testfarmer',
            password='test123',
            user_type='farmer'
        )
    
    def test_create_product(self):
        product = Product.objects.create(
            product_name='Maize',
            variety='Biofortified',
            quantity=100,
            owner=self.user
        )
        self.assertEqual(product.product_name, 'Maize')
        self.assertTrue(product.biofortified)
```

### 6.2 API Tests
```python
from rest_framework.test import APITestCase
from rest_framework import status

class ProductAPITestCase(APITestCase):
    def test_create_product_authenticated(self):
        # Login
        login_response = self.client.post('/api/v1/users/login/', {
            'username': 'testfarmer',
            'password': 'test123'
        })
        token = login_response.data['tokens']['access']
        
        # Create product
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/v1/products/', {
            'product_name': 'Cassava',
            'variety': 'Yellow',
            'quantity': 50
        })
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
```

---

## 7. Performance Optimizations

### 7.1 Database Indexing
```python
class Product(models.Model):
    product_name = models.CharField(max_length=200, db_index=True)
    qr_code = models.CharField(max_length=100, unique=True, db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['owner', 'created_at']),
            models.Index(fields=['biofortified', 'harvest_date']),
        ]
```

### 7.2 Query Optimization
```python
# Use select_related for foreign keys
products = Product.objects.select_related('owner').all()

# Use prefetch_related for many-to-many
products = Product.objects.prefetch_related('transaction_set').all()
```

### 7.3 Caching
```python
from django.core.cache import cache

def get_product_stats(product_id):
    cache_key = f'product_stats_{product_id}'
    stats = cache.get(cache_key)
    
    if stats is None:
        stats = calculate_stats(product_id)
        cache.set(cache_key, stats, timeout=3600)  # Cache for 1 hour
    
    return stats
```

---

## 8. Deployment Considerations

### 8.1 Environment Variables
```python
# settings.py
import os

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')
DATABASE_URL = os.getenv('DATABASE_URL')
```

### 8.2 Production Settings
- DEBUG = False
- HTTPS only
- Secure cookies
- CSRF protection enabled
- Content Security Policy headers

---

## Conclusion

The AGRITRACE backend demonstrates:
- ✅ Robust Django REST API
- ✅ Secure authentication & authorization
- ✅ Blockchain integration
- ✅ Database optimization
- ✅ Comprehensive error handling
- ✅ USSD integration for feature phones
- ✅ Production-ready architecture
