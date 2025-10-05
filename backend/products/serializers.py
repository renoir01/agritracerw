"""
Serializers for Product models
"""
from rest_framework import serializers
from .models import Batch, Product, Certification, Verification
from users.serializers import UserSerializer, LocationSerializer


class BatchSerializer(serializers.ModelSerializer):
    """Serializer for Batch model"""
    
    farmer = UserSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    
    class Meta:
        model = Batch
        fields = [
            'id', 'batch_number', 'seed_variety', 'planting_date',
            'harvest_date', 'total_quantity', 'farmer', 'location',
            'soil_test_results', 'blockchain_hash', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'batch_number', 'blockchain_hash', 'created_at', 'updated_at']


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for Product model"""
    
    creator = UserSerializer(read_only=True)
    batch = BatchSerializer(read_only=True)
    batch_id = serializers.PrimaryKeyRelatedField(
        queryset=Batch.objects.all(),
        source='batch',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'variety', 'iron_content', 'biofortified',
            'qr_code', 'creator', 'batch', 'batch_id', 'quantity',
            'harvest_date', 'status', 'product_image', 'ipfs_hash',
            'blockchain_hash', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'qr_code', 'blockchain_hash', 'created_at', 'updated_at']


class ProductCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating products"""
    
    class Meta:
        model = Product
        fields = [
            'name', 'variety', 'iron_content', 'biofortified',
            'batch_id', 'quantity', 'harvest_date', 'product_image'
        ]
    
    def validate_iron_content(self, value):
        """Validate iron content for biofortified crops"""
        if self.initial_data.get('biofortified', True) and value < 50:
            raise serializers.ValidationError(
                "Biofortified crops must have iron content of at least 50 ppm"
            )
        return value


class CertificationSerializer(serializers.ModelSerializer):
    """Serializer for Certification model"""
    
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = Certification
        fields = [
            'id', 'product', 'cert_type', 'issuer', 'issue_date',
            'expiry_date', 'certificate_url', 'ipfs_hash', 'verified',
            'certificate_file', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'verified', 'created_at', 'updated_at']


class VerificationSerializer(serializers.ModelSerializer):
    """Serializer for Verification model"""
    
    product = ProductSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Verification
        fields = [
            'id', 'product', 'user', 'verification_type', 'result',
            'verified_at', 'verification_method', 'confidence_score', 'notes'
        ]
        read_only_fields = ['id', 'verified_at']


class ProductVerificationSerializer(serializers.Serializer):
    """Serializer for product verification requests"""
    
    qr_code = serializers.CharField(max_length=100)
    verification_method = serializers.ChoiceField(
        choices=['qr_scan', 'manual', 'blockchain', 'lab_test']
    )
    notes = serializers.CharField(required=False, allow_blank=True)
    
    def validate_qr_code(self, value):
        """Validate QR code exists"""
        if not Product.objects.filter(qr_code=value).exists():
            raise serializers.ValidationError("Invalid QR code")
        return value
