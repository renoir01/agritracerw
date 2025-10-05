"""
User models for AGRITRACE
"""
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class Location(models.Model):
    """Geographic location model for Rwanda"""
    
    district = models.CharField(_('District'), max_length=100)
    sector = models.CharField(_('Sector'), max_length=100)
    cell = models.CharField(_('Cell'), max_length=100)
    village = models.CharField(_('Village'), max_length=100)
    latitude = models.DecimalField(_('Latitude'), max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(_('Longitude'), max_digits=9, decimal_places=6, null=True, blank=True)
    elevation = models.IntegerField(_('Elevation (meters)'), null=True, blank=True)
    climate_zone = models.CharField(_('Climate Zone'), max_length=50, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('Location')
        verbose_name_plural = _('Locations')
        ordering = ['district', 'sector', 'cell', 'village']
        indexes = [
            models.Index(fields=['district', 'sector']),
            models.Index(fields=['latitude', 'longitude']),
        ]
    
    def __str__(self):
        return f"{self.village}, {self.cell}, {self.sector}, {self.district}"


class User(AbstractUser):
    """Custom User model for AGRITRACE"""
    
    USER_TYPE_CHOICES = [
        ('farmer', _('Farmer')),
        ('trader', _('Trader/Aggregator')),
        ('processor', _('Processor/Retailer')),
        ('consumer', _('Consumer')),
        ('seed_producer', _('Seed Producer')),
        ('admin', _('Administrator')),
    ]
    
    user_type = models.CharField(
        _('User Type'),
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default='consumer'
    )
    phone_number = models.CharField(_('Phone Number'), max_length=20, unique=True)
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users',
        verbose_name=_('Location')
    )
    verified_status = models.BooleanField(_('Verified'), default=False)
    profile_image = models.ImageField(
        _('Profile Image'),
        upload_to='profiles/',
        null=True,
        blank=True
    )
    national_id = models.CharField(_('National ID'), max_length=16, blank=True)
    cooperative_name = models.CharField(_('Cooperative Name'), max_length=200, blank=True)
    farm_size = models.DecimalField(
        _('Farm Size (hectares)'),
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    preferred_language = models.CharField(
        _('Preferred Language'),
        max_length=2,
        choices=[('en', 'English'), ('rw', 'Kinyarwanda'), ('fr', 'French')],
        default='rw'
    )
    
    # Blockchain wallet address
    wallet_address = models.CharField(_('Wallet Address'), max_length=42, blank=True)
    
    # Consent and privacy
    data_consent = models.BooleanField(_('Data Consent'), default=False)
    consent_date = models.DateTimeField(_('Consent Date'), null=True, blank=True)
    
    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        indexes = [
            models.Index(fields=['user_type', 'verified_status']),
            models.Index(fields=['phone_number']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.get_user_type_display()})"
    
    def get_full_name(self):
        """Return the user's full name"""
        full_name = super().get_full_name()
        return full_name if full_name else self.username


class UserActivity(models.Model):
    """Track user activity for analytics"""
    
    ACTIVITY_TYPES = [
        ('login', _('Login')),
        ('product_register', _('Product Registration')),
        ('product_verify', _('Product Verification')),
        ('transaction', _('Transaction')),
        ('qr_scan', _('QR Code Scan')),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(_('Activity Type'), max_length=30, choices=ACTIVITY_TYPES)
    description = models.TextField(_('Description'), blank=True)
    ip_address = models.GenericIPAddressField(_('IP Address'), null=True, blank=True)
    user_agent = models.CharField(_('User Agent'), max_length=255, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('User Activity')
        verbose_name_plural = _('User Activities')
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', '-timestamp']),
            models.Index(fields=['activity_type', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.get_activity_type_display()} - {self.timestamp}"
