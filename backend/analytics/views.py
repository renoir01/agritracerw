"""
Views for Analytics app
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Sum, Avg, Q
from products.models import Product, Verification
from transactions.models import Transaction
from users.models import User


class DashboardStatsView(APIView):
    """Get dashboard statistics"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        total_products = Product.objects.count()
        total_transactions = Transaction.objects.count()
        total_users = User.objects.count()
        total_verifications = Verification.objects.count()
        
        biofortified_count = Product.objects.filter(biofortified=True).count()
        
        recent_products = Product.objects.order_by('-created_at')[:5]
        recent_transactions = Transaction.objects.order_by('-timestamp')[:5]
        
        from products.serializers import ProductSerializer
        from transactions.serializers import TransactionSerializer
        
        return Response({
            'total_products': total_products,
            'total_transactions': total_transactions,
            'total_users': total_users,
            'total_verifications': total_verifications,
            'biofortified_products': biofortified_count,
            'conventional_products': total_products - biofortified_count,
            'recent_products': ProductSerializer(recent_products, many=True).data,
            'recent_transactions': TransactionSerializer(recent_transactions, many=True).data
        })


class ProductStatsView(APIView):
    """Get product statistics"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        stats = Product.objects.aggregate(
            total=Count('id'),
            biofortified=Count('id', filter=Q(biofortified=True)),
            avg_iron=Avg('iron_content'),
            total_quantity=Sum('quantity')
        )
        
        by_status = Product.objects.values('status').annotate(count=Count('id'))
        by_variety = Product.objects.values('variety').annotate(count=Count('id'))
        
        return Response({
            'summary': stats,
            'by_status': list(by_status),
            'by_variety': list(by_variety)
        })


class TransactionStatsView(APIView):
    """Get transaction statistics"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        stats = Transaction.objects.aggregate(
            total=Count('id'),
            total_value=Sum('price'),
            avg_price=Avg('price'),
            total_quantity=Sum('quantity')
        )
        
        by_type = Transaction.objects.values('transaction_type').annotate(count=Count('id'))
        by_status = Transaction.objects.values('status').annotate(count=Count('id'))
        
        return Response({
            'summary': stats,
            'by_type': list(by_type),
            'by_status': list(by_status)
        })


class UserStatsView(APIView):
    """Get user statistics"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        stats = User.objects.aggregate(
            total=Count('id'),
            verified=Count('id', filter=Q(verified_status=True))
        )
        
        by_type = User.objects.values('user_type').annotate(count=Count('id'))
        
        return Response({
            'summary': stats,
            'by_type': list(by_type)
        })


class SupplyChainStatsView(APIView):
    """Get supply chain statistics"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        from transactions.models import SupplyChain
        
        stats = SupplyChain.objects.aggregate(
            total_steps=Count('id')
        )
        
        by_action = SupplyChain.objects.values('action').annotate(count=Count('id'))
        
        return Response({
            'summary': stats,
            'by_action': list(by_action)
        })


class ExportDataView(APIView):
    """Export data to CSV/Excel"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, export_type):
        # TODO: Implement actual export functionality
        return Response({
            'detail': f'Export {export_type} functionality coming soon'
        })
