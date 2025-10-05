import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../services/api_service.dart';

class ProductProvider with ChangeNotifier {
  List<Product> _products = [];
  Product? _selectedProduct;
  bool _isLoading = false;
  String? _error;

  List<Product> get products => _products;
  Product? get selectedProduct => _selectedProduct;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Load products
  Future<void> loadProducts({int? ownerId}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _products = await ApiService.getProducts(ownerId: ownerId);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  // Load single product
  Future<void> loadProduct(int id) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _selectedProduct = await ApiService.getProductById(id);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  // Verify product by QR code
  Future<Product?> verifyProduct(String qrCode) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final product = await ApiService.verifyProduct(qrCode);
      _selectedProduct = product;
      _isLoading = false;
      notifyListeners();
      return product;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return null;
    }
  }

  // Create product
  Future<bool> createProduct(Map<String, dynamic> productData) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final product = await ApiService.createProduct(productData);
      _products.insert(0, product);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Update product
  Future<bool> updateProduct(int id, Map<String, dynamic> productData) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final product = await ApiService.updateProduct(id, productData);
      final index = _products.indexWhere((p) => p.id == id);
      if (index != -1) {
        _products[index] = product;
      }
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Delete product
  Future<bool> deleteProduct(int id) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await ApiService.deleteProduct(id);
      _products.removeWhere((p) => p.id == id);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Search products
  List<Product> searchProducts(String query) {
    if (query.isEmpty) return _products;
    
    return _products.where((product) {
      return product.productName.toLowerCase().contains(query.toLowerCase()) ||
             product.variety.toLowerCase().contains(query.toLowerCase()) ||
             product.qrCode.toLowerCase().contains(query.toLowerCase());
    }).toList();
  }

  // Filter biofortified products
  List<Product> get biofortifiedProducts {
    return _products.where((p) => p.biofortified).toList();
  }

  // Get products by owner
  List<Product> getProductsByOwner(int ownerId) {
    return _products.where((p) => p.ownerId == ownerId).toList();
  }
}
