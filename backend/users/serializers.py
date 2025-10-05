"""
Serializers for User models
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Location, UserActivity

User = get_user_model()


class LocationSerializer(serializers.ModelSerializer):
    """Serializer for Location model"""
    
    class Meta:
        model = Location
        fields = [
            'id', 'district', 'sector', 'cell', 'village',
            'latitude', 'longitude', 'elevation', 'climate_zone',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    location = LocationSerializer(read_only=True)
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        source='location',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'user_type', 'location', 'location_id',
            'verified_status', 'profile_image', 'national_id',
            'cooperative_name', 'farm_size', 'preferred_language',
            'wallet_address', 'data_consent', 'consent_date',
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login', 'verified_status']
        extra_kwargs = {
            'password': {'write_only': True},
            'national_id': {'write_only': True}
        }
    
    def create(self, validated_data):
        """Create user with encrypted password"""
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name', 'phone_number', 'user_type',
            'preferred_language', 'data_consent'
        ]
    
    def validate(self, attrs):
        """Validate password match and data consent"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        
        if not attrs.get('data_consent', False):
            raise serializers.ValidationError({"data_consent": "Data consent is required"})
        
        attrs.pop('password_confirm')
        return attrs
    
    def create(self, validated_data):
        """Create new user"""
        password = validated_data.pop('password')
        data_consent = validated_data.pop('data_consent', True)
        
        # Create user
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.data_consent = data_consent
        
        # Set consent date
        from django.utils import timezone
        user.consent_date = timezone.now()
        user.save()
        
        return user


class UserActivitySerializer(serializers.ModelSerializer):
    """Serializer for UserActivity model"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserActivity
        fields = [
            'id', 'user', 'activity_type', 'description',
            'ip_address', 'user_agent', 'timestamp'
        ]
        read_only_fields = ['id', 'timestamp']
