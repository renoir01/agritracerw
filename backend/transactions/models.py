"""
Transaction models for AGRITRACE supply chain
"""
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator
import uuid


class Transaction(models.Model):
    """Transaction model for supply chain transfers"""
    
    TRANSACTION_TYPES = [
        ('harvest', _('Harvest')),
        ('transfer', _('Transfer')),
        ('processing', _('Processing')),
        ('sale', _('Sale')),
        ('return', _('Return')),
    ]
    
    STATUS_CHOICES = [
        ('pending', _('Pending')),
        ('in_progress', _('In Progress')),
        ('completed', _('Completed')),
        ('cancelled', _('Cancelled')),
    ]
    
    transaction_id = models.UUIDField(_('Transaction ID'), default=uuid.uuid4, editable=False, unique=True)
    from_user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='transactions_sent',
        verbose_name=_('From User')
    )
    to_user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='transactions_received',
        verbose_name=_('To User')
    )
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    quantity = models.DecimalField(
        _('Quantity (kg)'),
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    price = models.DecimalField(
        _('Price (RWF)'),
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        null=True,
        blank=True
    )
    transaction_type = models.CharField(
        _('Transaction Type'),
        max_length=20,
        choices=TRANSACTION_TYPES
    )
    status = models.CharField(
        _('Status'),
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    location = models.ForeignKey(
        'users.Location',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='transactions'
    )
    
    # Blockchain reference
    blockchain_hash = models.CharField(_('Blockchain Hash'), max_length=66, blank=True, db_index=True)
    
    # Additional metadata
    notes = models.TextField(_('Notes'), blank=True)
    transport_method = models.CharField(_('Transport Method'), max_length=100, blank=True)
    estimated_delivery = models.DateTimeField(_('Estimated Delivery'), null=True, blank=True)
    actual_delivery = models.DateTimeField(_('Actual Delivery'), null=True, blank=True)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('Transaction')
        verbose_name_plural = _('Transactions')
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['from_user', '-timestamp']),
            models.Index(fields=['to_user', '-timestamp']),
            models.Index(fields=['product', '-timestamp']),
            models.Index(fields=['status', '-timestamp']),
            models.Index(fields=['blockchain_hash']),
        ]
    
    def __str__(self):
        return f"{self.transaction_id} - {self.get_transaction_type_display()}"
    
    @property
    def total_value(self):
        """Calculate total transaction value"""
        if self.price:
            return self.quantity * self.price
        return 0


class SupplyChain(models.Model):
    """Supply chain tracking model"""
    
    ACTOR_TYPES = [
        ('farmer', _('Farmer')),
        ('trader', _('Trader')),
        ('processor', _('Processor')),
        ('retailer', _('Retailer')),
        ('consumer', _('Consumer')),
    ]
    
    ACTIONS = [
        ('planted', _('Planted')),
        ('harvested', _('Harvested')),
        ('collected', _('Collected')),
        ('transported', _('Transported')),
        ('processed', _('Processed')),
        ('packaged', _('Packaged')),
        ('distributed', _('Distributed')),
        ('sold', _('Sold')),
    ]
    
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name='supply_chain_steps'
    )
    step_number = models.PositiveIntegerField(_('Step Number'))
    actor_type = models.CharField(_('Actor Type'), max_length=20, choices=ACTOR_TYPES)
    actor = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='supply_chain_actions'
    )
    action = models.CharField(_('Action'), max_length=20, choices=ACTIONS)
    description = models.TextField(_('Description'), blank=True)
    location = models.ForeignKey(
        'users.Location',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='supply_chain_steps'
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Blockchain reference
    blockchain_hash = models.CharField(_('Blockchain Hash'), max_length=66, blank=True)
    
    # Additional data
    temperature = models.DecimalField(
        _('Temperature (°C)'),
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True
    )
    humidity = models.DecimalField(
        _('Humidity (%)'),
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name = _('Supply Chain Step')
        verbose_name_plural = _('Supply Chain Steps')
        ordering = ['product', 'step_number']
        unique_together = ['product', 'step_number']
        indexes = [
            models.Index(fields=['product', 'step_number']),
            models.Index(fields=['actor', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.product.qr_code} - Step {self.step_number}: {self.get_action_display()}"


class Payment(models.Model):
    """Payment model for transaction settlements"""
    
    PAYMENT_METHODS = [
        ('cash', _('Cash')),
        ('mobile_money', _('Mobile Money')),
        ('bank_transfer', _('Bank Transfer')),
        ('credit', _('Credit')),
    ]
    
    PAYMENT_STATUS = [
        ('pending', _('Pending')),
        ('processing', _('Processing')),
        ('completed', _('Completed')),
        ('failed', _('Failed')),
        ('refunded', _('Refunded')),
    ]
    
    transaction = models.OneToOneField(
        Transaction,
        on_delete=models.CASCADE,
        related_name='payment'
    )
    amount = models.DecimalField(
        _('Amount (RWF)'),
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    payment_method = models.CharField(
        _('Payment Method'),
        max_length=20,
        choices=PAYMENT_METHODS
    )
    status = models.CharField(
        _('Status'),
        max_length=20,
        choices=PAYMENT_STATUS,
        default='pending'
    )
    
    # Mobile money details
    phone_number = models.CharField(_('Phone Number'), max_length=20, blank=True)
    transaction_reference = models.CharField(_('Transaction Reference'), max_length=100, blank=True)
    
    # Timestamps
    initiated_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(_('Completed At'), null=True, blank=True)
    
    # Additional metadata
    notes = models.TextField(_('Notes'), blank=True)
    
    class Meta:
        verbose_name = _('Payment')
        verbose_name_plural = _('Payments')
        ordering = ['-initiated_at']
        indexes = [
            models.Index(fields=['status', '-initiated_at']),
            models.Index(fields=['transaction_reference']),
        ]
    
    def __str__(self):
        return f"Payment {self.id} - {self.amount} RWF ({self.get_status_display()})"
