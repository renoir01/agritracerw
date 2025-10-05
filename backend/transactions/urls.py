"""
URL patterns for Transactions app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.TransactionViewSet, basename='transaction')
router.register(r'supply-chain', views.SupplyChainViewSet, basename='supply-chain')
router.register(r'payments', views.PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
]
