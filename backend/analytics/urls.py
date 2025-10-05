"""
URL patterns for Analytics app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.DashboardStatsView.as_view(), name='dashboard_stats'),
    path('products/', views.ProductStatsView.as_view(), name='product_stats'),
    path('transactions/', views.TransactionStatsView.as_view(), name='transaction_stats'),
    path('users/', views.UserStatsView.as_view(), name='user_stats'),
    path('supply-chain/', views.SupplyChainStatsView.as_view(), name='supply_chain_stats'),
    path('export/<str:export_type>/', views.ExportDataView.as_view(), name='export_data'),
]
