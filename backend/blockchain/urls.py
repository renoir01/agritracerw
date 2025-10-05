"""
URL patterns for Blockchain app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('status/', views.BlockchainStatusView.as_view(), name='blockchain_status'),
    path('register-product/', views.RegisterProductView.as_view(), name='register_product'),
    path('register-batch/', views.RegisterBatchView.as_view(), name='register_batch'),
    path('verify/<str:qr_code>/', views.VerifyProductView.as_view(), name='verify_product'),
    path('product/<str:qr_code>/', views.GetProductView.as_view(), name='get_product'),
    path('supply-chain/<str:qr_code>/', views.GetSupplyChainView.as_view(), name='get_supply_chain'),
]
