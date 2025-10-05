"""
Admin configuration for User models
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, Location, UserActivity


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['district', 'sector', 'cell', 'village', 'latitude', 'longitude']
    list_filter = ['district', 'sector']
    search_fields = ['district', 'sector', 'cell', 'village']
    ordering = ['district', 'sector', 'cell', 'village']


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'phone_number', 'user_type', 'verified_status', 'date_joined']
    list_filter = ['user_type', 'verified_status', 'is_staff', 'is_active']
    search_fields = ['username', 'email', 'phone_number', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone_number')}),
        (_('User Type'), {'fields': ('user_type', 'verified_status', 'location')}),
        (_('Additional Info'), {'fields': ('profile_image', 'national_id', 'cooperative_name', 'farm_size', 'preferred_language', 'wallet_address')}),
        (_('Consent'), {'fields': ('data_consent', 'consent_date')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'phone_number', 'password1', 'password2', 'user_type'),
        }),
    )
    
    actions = ['verify_users']
    
    def verify_users(self, request, queryset):
        updated = queryset.update(verified_status=True)
        self.message_user(request, f'{updated} users verified successfully.')
    verify_users.short_description = 'Verify selected users'


@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'timestamp', 'ip_address']
    list_filter = ['activity_type', 'timestamp']
    search_fields = ['user__username', 'description']
    ordering = ['-timestamp']
    readonly_fields = ['user', 'activity_type', 'description', 'ip_address', 'user_agent', 'timestamp']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
