"""
Product models for AGRITRACE
"""
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Batch(models.Model):
    """Batch model for tracking crop batches"""
    
    batch_number = models.CharField(_('Batch Number'), max_length=50, unique=True, db_index=True)
    seed_variety = models.CharField(_('Seed Variety'), max_length=100)
    planting_date = models.DateField(_('Planting Date'))
    harvest_date = models.DateField(_('Harvest Date'), null=True, blank=True)
    total_quantity = models.DecimalField(
        _('Total Quantity (kg)'),
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    farmer = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='batches',
        limit_choices_to={'user_type': 'farmer'}
    )
    location = models.ForeignKey(
        'users.Location',
        on_delete=models.SET_NULL,
        null=True,
        related_name='batches'
    )
    soil_test_results = models.JSONField(_('Soil Test Results'), null=True, blank=True)
    
    # Blockchain reference
    blockchain_hash = models.CharField(_('Blockchain Hash'), max_length=66, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('Batch')
        verbose_name_plural = _('Batches')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['farmer', '-created_at']),
            models.Index(fields=['batch_number']),
        ]
    
    def __str__(self):
        return f"{self.batch_number} - {self.seed_variety}"
    
    def save(self, *args, **kwargs):
        if not self.batch_number:
            # Generate unique batch number
            self.batch_number = f"BATCH-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)


class Product(models.Model):
    """Product model for biofortified crops"""
    
    PRODUCT_STATUS = [
        ('registered', _('Registered')),
        ('in_transit', _('In Transit')),
        ('processed', _('Processed')),
        ('retail', _('At Retail')),
        ('sold', _('Sold')),
    ]
    
    name = models.CharField(_('Product Name'), max_length=200)
    variety = models.CharField(_('Variety'), max_length=100)
    iron_content = models.DecimalField(
        _('Iron Content (ppm)'),
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(200)]
    )
    biofortified = models.BooleanField(_('Biofortified'), default=True)
    qr_code = models.CharField(_('QR Code'), max_length=100, unique=True, db_index=True)
    creator = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='created_products'
    )
    batch = models.ForeignKey(
        Batch,
        on_delete=models.CASCADE,
        related_name='products',
        null=True,
        blank=True
    )
    quantity = models.DecimalField(
        _('Quantity (kg)'),
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    harvest_date = models.DateField(_('Harvest Date'))
    status = models.CharField(
        _('Status'),
        max_length=20,
        choices=PRODUCT_STATUS,
        default='registered'
    )
    
    # Images and documents
    product_image = models.ImageField(_('Product Image'), upload_to='products/', null=True, blank=True)
    ipfs_hash = models.CharField(_('IPFS Hash'), max_length=100, blank=True)
    
    # Blockchain reference
    blockchain_hash = models.CharField(_('Blockchain Hash'), max_length=66, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['qr_code']),
            models.Index(fields=['creator', '-created_at']),
            models.Index(fields=['biofortified', 'status']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.variety} ({self.qr_code})"
    
    def save(self, *args, **kwargs):
        if not self.qr_code:
            # Generate unique QR code
            self.qr_code = f"QR-{uuid.uuid4().hex[:12].upper()}"
        super().save(*args, **kwargs)


class Certification(models.Model):
    """Certification model for product verification"""
    
    CERT_TYPES = [
        ('biofortification', _('Biofortification Certificate')),
        ('organic', _('Organic Certificate')),
        ('quality', _('Quality Certificate')),
        ('lab_test', _('Laboratory Test')),
    ]
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='certifications'
    )
    cert_type = models.CharField(_('Certificate Type'), max_length=30, choices=CERT_TYPES)
    issuer = models.CharField(_('Issuer'), max_length=200)
    issue_date = models.DateField(_('Issue Date'))
    expiry_date = models.DateField(_('Expiry Date'), null=True, blank=True)
    certificate_url = models.URLField(_('Certificate URL'), blank=True)
    ipfs_hash = models.CharField(_('IPFS Hash'), max_length=100, blank=True)
    verified = models.BooleanField(_('Verified'), default=False)
    
    # Certificate document
    certificate_file = models.FileField(
        _('Certificate File'),
        upload_to='certificates/',
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('Certification')
        verbose_name_plural = _('Certifications')
        ordering = ['-issue_date']
        indexes = [
            models.Index(fields=['product', '-issue_date']),
            models.Index(fields=['cert_type', 'verified']),
        ]
    
    def __str__(self):
        return f"{self.get_cert_type_display()} - {self.product.name}"


class Verification(models.Model):
    """Verification model for tracking product authenticity checks"""
    
    VERIFICATION_METHODS = [
        ('qr_scan', _('QR Code Scan')),
        ('manual', _('Manual Verification')),
        ('blockchain', _('Blockchain Verification')),
        ('lab_test', _('Laboratory Test')),
    ]
    
    VERIFICATION_RESULTS = [
        ('authentic', _('Authentic')),
        ('suspicious', _('Suspicious')),
        ('counterfeit', _('Counterfeit')),
        ('pending', _('Pending')),
    ]
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='verifications'
    )
    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='verifications'
    )
    verification_type = models.CharField(
        _('Verification Type'),
        max_length=20,
        choices=VERIFICATION_METHODS
    )
    result = models.CharField(
        _('Result'),
        max_length=20,
        choices=VERIFICATION_RESULTS,
        default='pending'
    )
    verified_at = models.DateTimeField(auto_now_add=True)
    verification_method = models.CharField(_('Method Details'), max_length=100, blank=True)
    confidence_score = models.DecimalField(
        _('Confidence Score'),
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,
        blank=True
    )
    notes = models.TextField(_('Notes'), blank=True)
    
    class Meta:
        verbose_name = _('Verification')
        verbose_name_plural = _('Verifications')
        ordering = ['-verified_at']
        indexes = [
            models.Index(fields=['product', '-verified_at']),
            models.Index(fields=['user', '-verified_at']),
            models.Index(fields=['result']),
        ]
    
    def __str__(self):
        return f"{self.product.qr_code} - {self.get_result_display()}"
