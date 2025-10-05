"""
URL patterns for Products app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'batches', views.BatchViewSet, basename='batch')
router.register(r'', views.ProductViewSet, basename='product')
router.register(r'certifications', views.CertificationViewSet, basename='certification')
router.register(r'verifications', views.VerificationViewSet, basename='verification')

urlpatterns = [
    path('', include(router.urls)),
]
