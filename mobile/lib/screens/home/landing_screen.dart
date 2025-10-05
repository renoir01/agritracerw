import 'package:flutter/material.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section
            Container(
              padding: const EdgeInsets.all(40),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFF2E7D32), Color(0xFF1B5E20)],
                ),
              ),
              child: Column(
                children: [
                  const SizedBox(height: 40),
                  const Text(
                    '🌾 AGRITRACE',
                    style: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Blockchain-Based Traceability for Biofortified Crops in Rwanda',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Ensuring food security through transparent, traceable, and nutritious agricultural supply chains',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white70,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        onPressed: () => Navigator.pushNamed(context, '/register'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: const Color(0xFF2E7D32),
                          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                        ),
                        child: const Text('Get Started Free', style: TextStyle(fontSize: 16)),
                      ),
                      const SizedBox(width: 16),
                      OutlinedButton(
                        onPressed: () => Navigator.pushNamed(context, '/verify'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.white,
                          side: const BorderSide(color: Colors.white, width: 2),
                          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                        ),
                        child: const Text('Verify Product', style: TextStyle(fontSize: 16)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),

            // Stats Section
            Container(
              padding: const EdgeInsets.all(40),
              color: Colors.grey[100],
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStat('100%', 'Traceable'),
                  _buildStat('🔗', 'Blockchain Secured'),
                  _buildStat('24/7', 'Available'),
                  _buildStat('🇷🇼', 'Made in Rwanda'),
                ],
              ),
            ),

            // Features Section
            Padding(
              padding: const EdgeInsets.all(40),
              child: Column(
                children: [
                  const Text(
                    'Why Choose AGRITRACE?',
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 40),
                  _buildFeatureGrid(context),
                ],
              ),
            ),

            // CTA Section
            Container(
              padding: const EdgeInsets.all(60),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF2E7D32), Color(0xFF1B5E20)],
                ),
              ),
              child: Column(
                children: [
                  const Text(
                    'Ready to Get Started?',
                    style: TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'Join thousands of farmers, traders, and consumers using AGRITRACE',
                    style: TextStyle(fontSize: 18, color: Colors.white70),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 30),
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/register'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF2E7D32),
                      padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 16),
                    ),
                    child: const Text('Create Free Account', style: TextStyle(fontSize: 18)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 36,
            fontWeight: FontWeight.bold,
            color: Color(0xFF2E7D32),
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(color: Colors.grey)),
      ],
    );
  }

  Widget _buildFeatureGrid(BuildContext context) {
    final features = [
      {'icon': '🔗', 'title': 'Blockchain Verification', 'desc': 'Immutable records ensure product authenticity'},
      {'icon': '📱', 'title': 'Mobile-First Design', 'desc': 'Access from any device'},
      {'icon': '🌾', 'title': 'Supply Chain Tracking', 'desc': 'Track crops from farm to fork'},
      {'icon': '🔍', 'title': 'QR Code Scanning', 'desc': 'Instant product verification'},
    ];

    return Wrap(
      spacing: 20,
      runSpacing: 20,
      children: features.map((f) => SizedBox(
        width: 200,
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Text(f['icon']!, style: const TextStyle(fontSize: 48)),
                const SizedBox(height: 12),
                Text(
                  f['title']!,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  f['desc']!,
                  style: const TextStyle(color: Colors.grey, fontSize: 14),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      )).toList(),
    );
  }
}
