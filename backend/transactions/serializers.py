"""
Serializers for Transaction models
"""
from rest_framework import serializers
from .models import Transaction, SupplyChain, Payment
from users.serializers import UserSerializer
from products.serializers import ProductSerializer


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for Transaction model"""
    
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    total_value = serializers.ReadOnlyField()
    
    class Meta:
        model = Transaction
        fields = [
            'id', 'transaction_id', 'from_user', 'to_user', 'product',
            'quantity', 'price', 'transaction_type', 'status', 'location',
            'blockchain_hash', 'notes', 'transport_method',
            'estimated_delivery', 'actual_delivery', 'timestamp',
            'updated_at', 'total_value'
        ]
        read_only_fields = ['id', 'transaction_id', 'blockchain_hash', 'timestamp', 'updated_at']


class SupplyChainSerializer(serializers.ModelSerializer):
    """Serializer for SupplyChain model"""
    
    actor = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = SupplyChain
        fields = [
            'id', 'product', 'step_number', 'actor_type', 'actor',
            'action', 'description', 'location', 'timestamp',
            'blockchain_hash', 'temperature', 'humidity'
        ]
        read_only_fields = ['id', 'blockchain_hash', 'timestamp']


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Payment model"""
    
    transaction = TransactionSerializer(read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'transaction', 'amount', 'payment_method', 'status',
            'phone_number', 'transaction_reference', 'initiated_at',
            'completed_at', 'notes'
        ]
        read_only_fields = ['id', 'initiated_at', 'completed_at']
