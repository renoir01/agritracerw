"""
Admin configuration for Transaction models
"""
from django.contrib import admin
from django.utils.html import format_html
from .models import Transaction, SupplyChain, Payment


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'from_user', 'to_user', 'product', 'quantity', 'price', 'status', 'timestamp']
    list_filter = ['transaction_type', 'status', 'timestamp']
    search_fields = ['transaction_id', 'from_user__username', 'to_user__username', 'product__qr_code']
    readonly_fields = ['transaction_id', 'blockchain_hash', 'timestamp', 'updated_at', 'display_total_value']
    ordering = ['-timestamp']
    
    fieldsets = (
        ('Transaction Details', {
            'fields': ('transaction_id', 'transaction_type', 'status')
        }),
        ('Parties', {
            'fields': ('from_user', 'to_user', 'product')
        }),
        ('Quantity & Price', {
            'fields': ('quantity', 'price', 'display_total_value')
        }),
        ('Location & Transport', {
            'fields': ('location', 'transport_method', 'estimated_delivery', 'actual_delivery')
        }),
        ('Additional Info', {
            'fields': ('notes', 'blockchain_hash')
        }),
        ('Timestamps', {
            'fields': ('timestamp', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def display_total_value(self, obj):
        if obj.price:
            total = obj.total_value
            return format_html(
                '<strong style="color: green;">{:,.2f} RWF</strong>',
                total
            )
        return '-'
    display_total_value.short_description = 'Total Value'


@admin.register(SupplyChain)
class SupplyChainAdmin(admin.ModelAdmin):
    list_display = ['product', 'step_number', 'actor_type', 'actor', 'action', 'timestamp']
    list_filter = ['actor_type', 'action', 'timestamp']
    search_fields = ['product__qr_code', 'actor__username', 'description']
    readonly_fields = ['blockchain_hash', 'timestamp']
    ordering = ['product', 'step_number']
    
    fieldsets = (
        ('Supply Chain Step', {
            'fields': ('product', 'step_number', 'action')
        }),
        ('Actor Information', {
            'fields': ('actor_type', 'actor', 'location')
        }),
        ('Details', {
            'fields': ('description', 'temperature', 'humidity')
        }),
        ('Blockchain', {
            'fields': ('blockchain_hash', 'timestamp'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'transaction', 'amount', 'payment_method', 'status', 'initiated_at', 'completed_at']
    list_filter = ['payment_method', 'status', 'initiated_at']
    search_fields = ['transaction__transaction_id', 'transaction_reference', 'phone_number']
    readonly_fields = ['initiated_at', 'completed_at']
    ordering = ['-initiated_at']
    
    fieldsets = (
        ('Payment Information', {
            'fields': ('transaction', 'amount', 'payment_method', 'status')
        }),
        ('Mobile Money Details', {
            'fields': ('phone_number', 'transaction_reference')
        }),
        ('Timestamps', {
            'fields': ('initiated_at', 'completed_at')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )
