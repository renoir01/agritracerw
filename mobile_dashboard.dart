// lib/screens/home/dashboard_screen.dart
// Copy this to: mobile/lib/screens/home/dashboard_screen.dart

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/product_provider.dart';
import '../../widgets/stat_card.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
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
        title: const Text('Dashboard'),
        backgroundColor: const Color(0xFF2E7D32),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {
              // TODO: Show notifications
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16.0),
          child: Consumer2<AuthProvider, ProductProvider>(
            builder: (context, authProvider, productProvider, _) {
              final user = authProvider.user;
              if (user == null) {
                return const Center(child: Text('Please login'));
              }

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Welcome Card
                  Card(
                    color: const Color(0xFF2E7D32),
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Welcome back!',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            user.fullName.isNotEmpty ? user.fullName : user.username,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            user.userTypeLabel,
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 16,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  
                  // Statistics
                  const Text(
                    'Statistics',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    mainAxisSpacing: 16,
                    crossAxisSpacing: 16,
                    children: _buildStatsCards(user.userType, productProvider),
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Quick Actions
                  const Text(
                    'Quick Actions',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  ..._buildQuickActions(context, user.userType),
                ],
              );
            },
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() => _selectedIndex = index);
          _handleNavigation(index);
        },
        selectedItemColor: const Color(0xFF2E7D32),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.qr_code_scanner),
            label: 'Verify',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  List<Widget> _buildStatsCards(String userType, ProductProvider productProvider) {
    if (userType == 'farmer') {
      return [
        StatCard(
          title: 'Products',
          value: productProvider.products.length.toString(),
          icon: Icons.inventory,
          color: Colors.blue,
        ),
        StatCard(
          title: 'Revenue',
          value: '0 RWF',
          icon: Icons.attach_money,
          color: Colors.green,
        ),
        StatCard(
          title: 'Harvest',
          value: '0 kg',
          icon: Icons.agriculture,
          color: Colors.orange,
        ),
        StatCard(
          title: 'Sales',
          value: '0',
          icon: Icons.shopping_cart,
          color: Colors.purple,
        ),
      ];
    } else if (userType == 'trader') {
      return [
        StatCard(
          title: 'Inventory',
          value: '0 kg',
          icon: Icons.warehouse,
          color: Colors.blue,
        ),
        StatCard(
          title: 'Suppliers',
          value: '0',
          icon: Icons.people,
          color: Colors.green,
        ),
        StatCard(
          title: 'Purchases',
          value: '0',
          icon: Icons.shopping_bag,
          color: Colors.orange,
        ),
        StatCard(
          title: 'Profit',
          value: '0 RWF',
          icon: Icons.trending_up,
          color: Colors.purple,
        ),
      ];
    } else if (userType == 'consumer') {
      return [
        StatCard(
          title: 'Verified',
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
          title: 'Reviews',
          value: '0',
          icon: Icons.star,
          color: Colors.orange,
        ),
        StatCard(
          title: 'Iron Intake',
          value: '0 mg',
          icon: Icons.science,
          color: Colors.purple,
        ),
      ];
    } else {
      return [
        StatCard(
          title: 'Total',
          value: '0',
          icon: Icons.dashboard,
          color: Colors.blue,
        ),
        StatCard(
          title: 'Active',
          value: '0',
          icon: Icons.check_circle,
          color: Colors.green,
        ),
        StatCard(
          title: 'Pending',
          value: '0',
          icon: Icons.pending,
          color: Colors.orange,
        ),
        StatCard(
          title: 'Completed',
          value: '0',
          icon: Icons.done_all,
          color: Colors.purple,
        ),
      ];
    }
  }

  List<Widget> _buildQuickActions(BuildContext context, String userType) {
    final actions = <Widget>[];

    if (userType == 'farmer') {
      actions.addAll([
        _buildActionCard(
          context,
          'Register Product',
          'Add new harvest to system',
          Icons.add_box,
          const Color(0xFF2E7D32),
          () {
            // Navigate to product register
          },
        ),
        _buildActionCard(
          context,
          'My Products',
          'View all your products',
          Icons.inventory,
          const Color(0xFF1976D2),
          () {
            // Navigate to products
          },
        ),
        _buildActionCard(
          context,
          'Farm Management',
          'Manage farm information',
          Icons.agriculture,
          const Color(0xFFFF9800),
          () {
            // Navigate to farm management
          },
        ),
      ]);
    } else if (userType == 'trader') {
      actions.addAll([
        _buildActionCard(
          context,
          'Buy from Farmers',
          'Purchase products',
          Icons.shopping_cart,
          const Color(0xFF2E7D32),
          () {
            // Navigate to buy
          },
        ),
        _buildActionCard(
          context,
          'My Inventory',
          'Manage stock',
          Icons.warehouse,
          const Color(0xFF1976D2),
          () {
            // Navigate to inventory
          },
        ),
      ]);
    } else if (userType == 'consumer') {
      actions.addAll([
        _buildActionCard(
          context,
          'Verify Product',
          'Scan QR code',
          Icons.qr_code_scanner,
          const Color(0xFF2E7D32),
          () {
            Navigator.pushNamed(context, '/verify');
          },
        ),
        _buildActionCard(
          context,
          'Purchase History',
          'View your purchases',
          Icons.history,
          const Color(0xFF1976D2),
          () {
            // Navigate to history
          },
        ),
      ]);
    } else if (userType == 'admin') {
      actions.addAll([
        _buildActionCard(
          context,
          'User Management',
          'Manage all users',
          Icons.people,
          const Color(0xFF2E7D32),
          () {
            // Navigate to users
          },
        ),
        _buildActionCard(
          context,
          'All Products',
          'View all products',
          Icons.inventory,
          const Color(0xFF1976D2),
          () {
            // Navigate to products
          },
        ),
      ]);
    }

    return actions;
  }

  Widget _buildActionCard(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, size: 32, color: color),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
            ],
          ),
        ),
      ),
    );
  }

  void _handleNavigation(int index) {
    switch (index) {
      case 0:
        // Dashboard - already here
        break;
      case 1:
        Navigator.pushNamed(context, '/verify');
        break;
      case 2:
        Navigator.pushNamed(context, '/profile');
        break;
    }
  }
}
