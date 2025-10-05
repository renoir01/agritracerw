// lib/screens/trader/buy_from_farmers_screen.dart
// Copy this to: mobile/lib/screens/trader/buy_from_farmers_screen.dart

import 'package:flutter/material.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';
import '../shared/qr_scanner_screen.dart';

class BuyFromFarmersScreen extends StatefulWidget {
  const BuyFromFarmersScreen({Key? key}) : super(key: key);

  @override
  State<BuyFromFarmersScreen> createState() => _BuyFromFarmersScreenState();
}

class _BuyFromFarmersScreenState extends State<BuyFromFarmersScreen> {
  final _formKey = GlobalKey<FormState>();
  final _qrCodeController = TextEditingController();
  final _quantityController = TextEditingController();
  final _priceController = TextEditingController();
  bool _isLoading = false;

  double get totalAmount {
    final quantity = double.tryParse(_quantityController.text) ?? 0;
    final price = double.tryParse(_priceController.text) ?? 0;
    return quantity * price;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Buy from Farmers'),
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
                color: const Color(0xFFE3F2FD),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: const [
                      Icon(Icons.info, color: Color(0xFF1976D2)),
                      SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          'Scan farmer\'s product QR code to verify before purchasing',
                          style: TextStyle(fontSize: 14),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              // QR Code Input
              CustomTextField(
                controller: _qrCodeController,
                label: 'Product QR Code',
                hint: 'Scan or enter QR code',
                prefixIcon: Icons.qr_code,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please scan or enter QR code';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              
              CustomButton(
                text: 'Scan QR Code',
                icon: Icons.qr_code_scanner,
                onPressed: _handleScanQR,
                isOutlined: true,
              ),
              const SizedBox(height: 24),
              
              // Quantity
              CustomTextField(
                controller: _quantityController,
                label: 'Quantity (kg)',
                hint: 'e.g., 100',
                prefixIcon: Icons.scale,
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter quantity';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              // Price
              CustomTextField(
                controller: _priceController,
                label: 'Purchase Price (RWF/kg)',
                hint: 'e.g., 500',
                prefixIcon: Icons.attach_money,
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter price';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              
              // Total Amount Card
              Card(
                color: const Color(0xFFF0F9FF),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      const Text(
                        'Total Amount',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '${totalAmount.toStringAsFixed(0)} RWF',
                        style: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF2E7D32),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              // Purchase Button
              CustomButton(
                text: 'Complete Purchase',
                icon: Icons.shopping_cart,
                onPressed: _handlePurchase,
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _handleScanQR() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const QRScannerScreen()),
    );

    if (result != null) {
      setState(() {
        _qrCodeController.text = result;
      });
    }
  }

  Future<void> _handlePurchase() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);

      // TODO: Create transaction via API
      await Future.delayed(const Duration(seconds: 2));

      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Purchase completed successfully!'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(context);
      }
    }
  }

  @override
  void dispose() {
    _qrCodeController.dispose();
    _quantityController.dispose();
    _priceController.dispose();
    super.dispose();
  }
}

// ============================================
// lib/screens/trader/trader_inventory_screen.dart
// Copy this to: mobile/lib/screens/trader/trader_inventory_screen.dart

import 'package:flutter/material.dart';
import '../../widgets/stat_card.dart';

class TraderInventoryScreen extends StatelessWidget {
  const TraderInventoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Inventory'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Inventory Stats
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              children: [
                StatCard(
                  title: 'Total Stock',
                  value: '0 kg',
                  icon: Icons.inventory,
                  color: Colors.blue,
                ),
                StatCard(
                  title: 'Inventory Value',
                  value: '0 RWF',
                  icon: Icons.attach_money,
                  color: Colors.green,
                ),
                StatCard(
                  title: 'Suppliers',
                  value: '0',
                  icon: Icons.people,
                  color: Colors.orange,
                ),
                StatCard(
                  title: 'Profit Margin',
                  value: '0%',
                  icon: Icons.trending_up,
                  color: Colors.purple,
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // Current Stock
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Current Stock',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Center(
                      child: Column(
                        children: const [
                          Icon(
                            Icons.inventory_2_outlined,
                            size: 60,
                            color: Colors.grey,
                          ),
                          SizedBox(height: 16),
                          Text(
                            'No inventory yet',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey,
                            ),
                          ),
                          SizedBox(height: 8),
                          Text(
                            'Purchase products from farmers to build your stock',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ============================================
// lib/screens/processor/processing_records_screen.dart
// Copy this to: mobile/lib/screens/processor/processing_records_screen.dart

import 'package:flutter/material.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';
import '../../widgets/stat_card.dart';

class ProcessingRecordsScreen extends StatefulWidget {
  const ProcessingRecordsScreen({Key? key}) : super(key: key);

  @override
  State<ProcessingRecordsScreen> createState() => _ProcessingRecordsScreenState();
}

class _ProcessingRecordsScreenState extends State<ProcessingRecordsScreen> {
  final _formKey = GlobalKey<FormState>();
  final _rawProductQRController = TextEditingController();
  final _outputQuantityController = TextEditingController();
  
  String _selectedProcessingType = 'Cleaning';
  String _selectedQualityGrade = 'A';
  DateTime _selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Processing Records'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Processing Stats
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              children: [
                StatCard(
                  title: 'Processed Today',
                  value: '0 kg',
                  icon: Icons.settings,
                  color: Colors.blue,
                ),
                StatCard(
                  title: 'Quality Pass Rate',
                  value: '0%',
                  icon: Icons.check_circle,
                  color: Colors.green,
                ),
                StatCard(
                  title: 'Batches',
                  value: '0',
                  icon: Icons.inventory,
                  color: Colors.orange,
                ),
                StatCard(
                  title: 'Avg Time',
                  value: '0 hrs',
                  icon: Icons.timer,
                  color: Colors.purple,
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // New Processing Record
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Record New Processing',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      
                      CustomTextField(
                        controller: _rawProductQRController,
                        label: 'Raw Product QR Code',
                        hint: 'Scan raw product',
                        prefixIcon: Icons.qr_code,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please scan raw product QR';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      DropdownButtonFormField<String>(
                        value: _selectedProcessingType,
                        decoration: const InputDecoration(
                          labelText: 'Processing Type',
                          prefixIcon: Icon(Icons.settings),
                          border: OutlineInputBorder(),
                        ),
                        items: ['Cleaning', 'Sorting', 'Milling', 'Packaging', 'Fortification']
                            .map((type) {
                          return DropdownMenuItem(
                            value: type,
                            child: Text(type),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedProcessingType = value!;
                          });
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      CustomTextField(
                        controller: _outputQuantityController,
                        label: 'Output Quantity (kg)',
                        hint: 'e.g., 95',
                        prefixIcon: Icons.scale,
                        keyboardType: TextInputType.number,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter output quantity';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),
                      
                      DropdownButtonFormField<String>(
                        value: _selectedQualityGrade,
                        decoration: const InputDecoration(
                          labelText: 'Quality Grade',
                          prefixIcon: Icon(Icons.star),
                          border: OutlineInputBorder(),
                        ),
                        items: [
                          {'value': 'A', 'label': 'Grade A (Premium)'},
                          {'value': 'B', 'label': 'Grade B (Standard)'},
                          {'value': 'C', 'label': 'Grade C (Basic)'},
                        ].map((grade) {
                          return DropdownMenuItem(
                            value: grade['value'],
                            child: Text(grade['label']!),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedQualityGrade = value!;
                          });
                        },
                      ),
                      const SizedBox(height: 24),
                      
                      CustomButton(
                        text: 'Record Processing',
                        icon: Icons.save,
                        onPressed: _handleRecord,
                        isLoading: _isLoading,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Processing History
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Processing History',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Center(
                      child: Column(
                        children: const [
                          Icon(
                            Icons.history,
                            size: 60,
                            color: Colors.grey,
                          ),
                          SizedBox(height: 16),
                          Text(
                            'No processing records yet',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleScanQR() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const QRScannerScreen()),
    );

    if (result != null) {
      setState(() {
        _qrCodeController.text = result;
      });
    }
  }

  Future<void> _handleRecord() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);

      // TODO: Save processing record via API
      await Future.delayed(const Duration(seconds: 2));

      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Processing record saved successfully!'),
            backgroundColor: Colors.green,
          ),
        );
        
        // Clear form
        _rawProductQRController.clear();
        _outputQuantityController.clear();
      }
    }
  }

  @override
  void dispose() {
    _rawProductQRController.dispose();
    _outputQuantityController.dispose();
    super.dispose();
  }
}

// ============================================
// lib/screens/consumer/purchase_history_screen.dart
// Copy this to: mobile/lib/screens/consumer/purchase_history_screen.dart

import 'package:flutter/material.dart';
import '../../widgets/stat_card.dart';

class PurchaseHistoryScreen extends StatelessWidget {
  const PurchaseHistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Purchase History'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Purchase Stats
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              children: [
                StatCard(
                  title: 'Products Verified',
                  value: '0',
                  icon: Icons.verified,
                  color: Colors.blue,
                ),
                StatCard(
                  title: 'Purchases',
                  value: '0',
                  icon: Icons.shopping_cart,
                  color: Colors.green,
                ),
                StatCard(
                  title: 'Reviews Given',
                  value: '0',
                  icon: Icons.star,
                  color: Colors.orange,
                ),
                StatCard(
                  title: 'Iron Consumed',
                  value: '0 mg',
                  icon: Icons.science,
                  color: Colors.purple,
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // Recent Purchases
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Recent Purchases',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Center(
                      child: Column(
                        children: const [
                          Icon(
                            Icons.shopping_bag_outlined,
                            size: 60,
                            color: Colors.grey,
                          ),
                          SizedBox(height: 16),
                          Text(
                            'No purchase history yet',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey,
                            ),
                          ),
                          SizedBox(height: 8),
                          Text(
                            'Start verifying products to track your purchases',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Nutritional Tracking
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.science, color: Color(0xFF2E7D32)),
                        SizedBox(width: 12),
                        Text(
                          'Nutritional Tracking',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Track your iron and nutrient intake from biofortified products.',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 16),
                    LinearProgressIndicator(
                      value: 0.0,
                      backgroundColor: Colors.grey[200],
                      color: const Color(0xFF2E7D32),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      '0 mg / 18 mg daily iron goal',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
