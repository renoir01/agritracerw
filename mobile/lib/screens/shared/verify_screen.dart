import 'package:flutter/material.dart';

class VerifyScreen extends StatelessWidget {
  const VerifyScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Verify Product'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
      body: const Center(
        child: Text('QR Verification - Coming Soon'),
      ),
    );
  }
}
