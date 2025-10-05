"""
AGRITRACE URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.generic import TemplateView

def api_root(request):
    """API root endpoint"""
    return JsonResponse({
        'message': 'Welcome to AGRITRACE API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'admin': '/admin/',
            'users': '/api/v1/users/',
            'products': '/api/v1/products/',
            'transactions': '/api/v1/transactions/',
            'blockchain': '/api/v1/blockchain/',
            'analytics': '/api/v1/analytics/',
            'ussd': '/api/v1/ussd/',
        },
        'documentation': 'Visit /admin/ for admin panel'
    })

urlpatterns = [
    # Root
    path('', api_root, name='api_root'),
    
    # Admin
    path('admin/', admin.site.urls),
    
    # API Endpoints
    path('api/v1/users/', include('users.urls')),
    path('api/v1/products/', include('products.urls')),
    path('api/v1/transactions/', include('transactions.urls')),
    path('api/v1/blockchain/', include('blockchain.urls')),
    path('api/v1/analytics/', include('analytics.urls')),
    path('api/v1/ussd/', include('ussd.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin site customization
admin.site.site_header = "AGRITRACE Administration"
admin.site.site_title = "AGRITRACE Admin Portal"
admin.site.index_title = "Welcome to AGRITRACE Administration"
