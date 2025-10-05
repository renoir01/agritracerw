"""
Views for Transactions app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transaction, SupplyChain, Payment
from .serializers import TransactionSerializer, SupplyChainSerializer, PaymentSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    """Transaction CRUD operations"""
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        queryset = Transaction.objects.all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by transaction type
        tx_type = self.request.query_params.get('type')
        if tx_type:
            queryset = queryset.filter(transaction_type=tx_type)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def my_transactions(self, request):
        """Get current user's transactions"""
        transactions = Transaction.objects.filter(
            from_user=request.user
        ) | Transaction.objects.filter(
            to_user=request.user
        )
        serializer = self.get_serializer(transactions, many=True)
        return Response(serializer.data)


class SupplyChainViewSet(viewsets.ModelViewSet):
    """Supply Chain CRUD operations"""
    queryset = SupplyChain.objects.all()
    serializer_class = SupplyChainSerializer
    permission_classes = (IsAuthenticated,)
    
    @action(detail=False, methods=['get'], url_path='(?P<qr_code>[^/.]+)')
    def by_qr_code(self, request, qr_code=None):
        """Get supply chain by product QR code"""
        from products.models import Product
        
        try:
            product = Product.objects.get(qr_code=qr_code)
            supply_chain = SupplyChain.objects.filter(product=product).order_by('step_number')
            serializer = self.get_serializer(supply_chain, many=True)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(
                {'detail': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'], url_path='history/(?P<product_id>[^/.]+)')
    def history(self, request, product_id=None):
        """Get supply chain history for a product"""
        supply_chain = SupplyChain.objects.filter(
            product_id=product_id
        ).order_by('step_number')
        serializer = self.get_serializer(supply_chain, many=True)
        return Response(serializer.data)


class PaymentViewSet(viewsets.ModelViewSet):
    """Payment CRUD operations"""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = (IsAuthenticated,)
