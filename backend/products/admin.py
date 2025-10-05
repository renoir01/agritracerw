"""
Admin configuration for Product models
"""
from django.contrib import admin
from django.utils.html import format_html
from .models import Batch, Product, Certification, Verification


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['batch_number', 'seed_variety', 'farmer', 'total_quantity', 'planting_date', 'harvest_date']
    list_filter = ['seed_variety', 'planting_date', 'harvest_date']
    search_fields = ['batch_number', 'seed_variety', 'farmer__username']
    readonly_fields = ['batch_number', 'blockchain_hash', 'created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Batch Information', {
            'fields': ('batch_number', 'seed_variety', 'planting_date', 'harvest_date')
        }),
        ('Quantity & Location', {
            'fields': ('total_quantity', 'farmer', 'location')
        }),
        ('Additional Data', {
            'fields': ('soil_test_results', 'blockchain_hash')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['qr_code', 'name', 'variety', 'iron_content', 'biofortified', 'status', 'creator', 'created_at']
    list_filter = ['biofortified', 'status', 'variety', 'created_at']
    search_fields = ['qr_code', 'name', 'variety', 'creator__username']
    readonly_fields = ['qr_code', 'blockchain_hash', 'created_at', 'updated_at', 'display_qr_code']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Product Information', {
            'fields': ('name', 'variety', 'iron_content', 'biofortified', 'qr_code', 'display_qr_code')
        }),
        ('Quantity & Batch', {
            'fields': ('quantity', 'harvest_date', 'batch', 'status')
        }),
        ('Creator & Media', {
            'fields': ('creator', 'product_image', 'ipfs_hash')
        }),
        ('Blockchain', {
            'fields': ('blockchain_hash',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def display_qr_code(self, obj):
        if obj.qr_code:
            return format_html(
                '<div style="font-size: 16px; font-weight: bold; padding: 10px; background: #f0f0f0;">{}</div>',
                obj.qr_code
            )
        return '-'
    display_qr_code.short_description = 'QR Code Display'


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'cert_type', 'issuer', 'issue_date', 'expiry_date', 'verified']
    list_filter = ['cert_type', 'verified', 'issue_date']
    search_fields = ['product__qr_code', 'product__name', 'issuer']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-issue_date']
    
    actions = ['verify_certifications']
    
    def verify_certifications(self, request, queryset):
        updated = queryset.update(verified=True)
        self.message_user(request, f'{updated} certifications verified successfully.')
    verify_certifications.short_description = 'Verify selected certifications'


@admin.register(Verification)
class VerificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'verification_type', 'result', 'confidence_score', 'verified_at']
    list_filter = ['verification_type', 'result', 'verified_at']
    search_fields = ['product__qr_code', 'user__username']
    readonly_fields = ['verified_at']
    ordering = ['-verified_at']
    
    def has_add_permission(self, request):
        return False
