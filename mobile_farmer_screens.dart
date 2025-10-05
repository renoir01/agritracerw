// lib/screens/farmer/farm_management_screen.dart
// Copy this to: mobile/lib/screens/farmer/farm_management_screen.dart

import 'package:flutter/material.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';
import '../../widgets/stat_card.dart';

class FarmManagementScreen extends StatefulWidget {
  const FarmManagementScreen({Key? key}) : super(key: key);

  @override
  State<FarmManagementScreen> createState() => _FarmManagementScreenState();
}

class _FarmManagementScreenState extends State<FarmManagementScreen> {
  final _formKey = GlobalKey<FormState>();
  final _farmNameController = TextEditingController();
  final _farmSizeController = TextEditingController();
  final _locationController = TextEditingController();
  
  String _selectedSoilType = 'Loam';
  String _selectedIrrigation = 'Rainfed';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Farm Management'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Farm Stats
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              children: [
                StatCard(
                  title: 'Total Harvest',
                  value: '0 kg',
                  icon: Icons.agriculture,
                  color: Colors.green,
                ),
                StatCard(
                  title: 'Products',
                  value: '0',
                  icon: Icons.inventory,
                  color: Colors.blue,
                ),
                StatCard(
                  title: 'Revenue',
                  value: '0 RWF',
                  icon: Icons.attach_money,
                  color: Colors.orange,
                ),
                StatCard(
                  title: 'Farm Size',
                  value: '0 ha',
                  icon: Icons.landscape,
                  color: Colors.purple,
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // Farm Information Form
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Farm Information',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      
                      CustomTextField(
                        controller: _farmNameController,
                        label: 'Farm Name',
                        hint: 'e.g., Green Valley Farm',
                        prefixIcon: Icons.agriculture,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter farm name';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      CustomTextField(
                        controller: _farmSizeController,
                        label: 'Farm Size (hectares)',
                        hint: 'e.g., 5',
                        prefixIcon: Icons.landscape,
                        keyboardType: TextInputType.number,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter farm size';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      CustomTextField(
                        controller: _locationController,
                        label: 'Location',
                        hint: 'e.g., Musanze District',
                        prefixIcon: Icons.location_on,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter location';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      DropdownButtonFormField<String>(
                        value: _selectedSoilType,
                        decoration: const InputDecoration(
                          labelText: 'Soil Type',
                          prefixIcon: Icon(Icons.terrain),
                          border: OutlineInputBorder(),
                        ),
                        items: ['Clay', 'Sandy', 'Loam', 'Silt'].map((type) {
                          return DropdownMenuItem(
                            value: type,
                            child: Text(type),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedSoilType = value!;
                          });
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      DropdownButtonFormField<String>(
                        value: _selectedIrrigation,
                        decoration: const InputDecoration(
                          labelText: 'Irrigation System',
                          prefixIcon: Icon(Icons.water_drop),
                          border: OutlineInputBorder(),
                        ),
                        items: ['Rainfed', 'Drip', 'Sprinkler', 'Flood'].map((type) {
                          return DropdownMenuItem(
                            value: type,
                            child: Text(type),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedIrrigation = value!;
                          });
                        },
                      ),
                      const SizedBox(height: 24),
                      
                      CustomButton(
                        text: 'Save Farm Information',
                        icon: Icons.save,
                        onPressed: _handleSave,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _handleSave() {
    if (_formKey.currentState!.validate()) {
      // TODO: Save to API
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Farm information saved successfully'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  @override
  void dispose() {
    _farmNameController.dispose();
    _farmSizeController.dispose();
    _locationController.dispose();
    super.dispose();
  }
}

// ============================================
// lib/screens/farmer/product_register_screen.dart
// Copy this to: mobile/lib/screens/farmer/product_register_screen.dart

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/product_provider.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class ProductRegisterScreen extends StatefulWidget {
  const ProductRegisterScreen({Key? key}) : super(key: key);

  @override
  State<ProductRegisterScreen> createState() => _ProductRegisterScreenState();
}

class _ProductRegisterScreenState extends State<ProductRegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _productNameController = TextEditingController();
  final _varietyController = TextEditingController();
  final _quantityController = TextEditingController();
  final _ironContentController = TextEditingController();
  final _batchNumberController = TextEditingController();
  
  String _selectedUnit = 'kg';
  bool _isBiofortified = true;
  DateTime _selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register Product'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Card(
                color: const Color(0xFFE8F5E9),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: const [
                      Icon(Icons.info, color: Color(0xFF2E7D32)),
                      SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          'Register your harvested biofortified products',
                          style: TextStyle(fontSize: 14),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              CustomTextField(
                controller: _productNameController,
                label: 'Product Name',
                hint: 'e.g., Iron-Rich Beans',
                prefixIcon: Icons.shopping_bag,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter product name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              CustomTextField(
                controller: _varietyController,
                label: 'Variety',
                hint: 'e.g., Iron Bean',
                prefixIcon: Icons.category,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter variety';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              Row(
                children: [
                  Expanded(
                    flex: 2,
                    child: CustomTextField(
                      controller: _quantityController,
                      label: 'Quantity',
                      hint: 'e.g., 100',
                      prefixIcon: Icons.scale,
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: _selectedUnit,
                      decoration: const InputDecoration(
                        labelText: 'Unit',
                        border: OutlineInputBorder(),
                      ),
                      items: ['kg', 'tons', 'bags'].map((unit) {
                        return DropdownMenuItem(
                          value: unit,
                          child: Text(unit),
                        );
                      }).toList(),
                      onChanged: (value) {
                        setState(() {
                          _selectedUnit = value!;
                        });
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              
              CustomTextField(
                controller: _ironContentController,
                label: 'Iron Content (ppm)',
                hint: 'e.g., 45',
                prefixIcon: Icons.science,
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter iron content';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              CustomTextField(
                controller: _batchNumberController,
                label: 'Batch Number (Optional)',
                hint: 'e.g., BATCH-2025-001',
                prefixIcon: Icons.qr_code,
              ),
              const SizedBox(height: 16),
              
              // Biofortified Switch
              Card(
                child: SwitchListTile(
                  title: const Text('Biofortified Product'),
                  subtitle: const Text('Is this a biofortified crop?'),
                  value: _isBiofortified,
                  activeColor: const Color(0xFF2E7D32),
                  onChanged: (value) {
                    setState(() {
                      _isBiofortified = value;
                    });
                  },
                ),
              ),
              const SizedBox(height: 16),
              
              // Harvest Date
              Card(
                child: ListTile(
                  leading: const Icon(Icons.calendar_today, color: Color(0xFF2E7D32)),
                  title: const Text('Harvest Date'),
                  subtitle: Text(
                    '${_selectedDate.day}/${_selectedDate.month}/${_selectedDate.year}',
                  ),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                  onTap: _selectDate,
                ),
              ),
              const SizedBox(height: 24),
              
              // Register Button
              Consumer<ProductProvider>(
                builder: (context, productProvider, _) {
                  return CustomButton(
                    text: 'Register Product',
                    icon: Icons.add_circle,
                    onPressed: () => _handleRegister(productProvider),
                    isLoading: productProvider.isLoading,
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
    );
    
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  Future<void> _handleRegister(ProductProvider productProvider) async {
    if (_formKey.currentState!.validate()) {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      
      final productData = {
        'product_name': _productNameController.text,
        'variety': _varietyController.text,
        'quantity': double.parse(_quantityController.text),
        'unit': _selectedUnit,
        'iron_content': double.parse(_ironContentController.text),
        'biofortified': _isBiofortified,
        'batch_number': _batchNumberController.text,
        'harvest_date': _selectedDate.toIso8601String(),
        'owner': authProvider.user?.id,
      };

      final success = await productProvider.createProduct(productData);

      if (mounted) {
        if (success) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Product registered successfully!'),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.pop(context);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(productProvider.error ?? 'Registration failed'),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    }
  }

  @override
  void dispose() {
    _productNameController.dispose();
    _varietyController.dispose();
    _quantityController.dispose();
    _ironContentController.dispose();
    _batchNumberController.dispose();
    super.dispose();
  }
}

// ============================================
// lib/screens/farmer/my_products_screen.dart
// Copy this to: mobile/lib/screens/farmer/my_products_screen.dart

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/product_provider.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/product_card.dart';
import '../../widgets/loading_indicator.dart';

class MyProductsScreen extends StatefulWidget {
  const MyProductsScreen({Key? key}) : super(key: key);

  @override
  State<MyProductsScreen> createState() => _MyProductsScreenState();
}

class _MyProductsScreenState extends State<MyProductsScreen> {
  final _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _loadProducts();
  }

  Future<void> _loadProducts() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final productProvider = Provider.of<ProductProvider>(context, listen: false);
    
    if (authProvider.user != null) {
      await productProvider.loadProducts(ownerId: authProvider.user!.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Products'),
        backgroundColor: const Color(0xFF2E7D32),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // TODO: Show filter options
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search products...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                filled: true,
                fillColor: Colors.white,
              ),
              onChanged: (value) {
                setState(() {
                  _searchQuery = value;
                });
              },
            ),
          ),
          
          // Products List
          Expanded(
            child: Consumer<ProductProvider>(
              builder: (context, productProvider, _) {
                if (productProvider.isLoading) {
                  return const LoadingIndicator(message: 'Loading products...');
                }

                final products = _searchQuery.isEmpty
                    ? productProvider.products
                    : productProvider.searchProducts(_searchQuery);

                if (products.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(
                          Icons.inventory_2_outlined,
                          size: 80,
                          color: Colors.grey,
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'No products yet',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Register your first product',
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey,
                          ),
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton.icon(
                          onPressed: () {
                            // Navigate to register
                          },
                          icon: const Icon(Icons.add),
                          label: const Text('Register Product'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF2E7D32),
                          ),
                        ),
                      ],
                    ),
                  );
                }

                return RefreshIndicator(
                  onRefresh: _loadProducts,
                  child: ListView.builder(
                    itemCount: products.length,
                    itemBuilder: (context, index) {
                      return ProductCard(
                        product: products[index],
                        onTap: () {
                          // Navigate to product details
                        },
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Navigate to register product
        },
        backgroundColor: const Color(0xFF2E7D32),
        child: const Icon(Icons.add),
      ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
