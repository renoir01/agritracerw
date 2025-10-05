"""
Views for Products app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Batch, Product, Certification, Verification
from .serializers import (
    BatchSerializer,
    ProductSerializer,
    ProductCreateSerializer,
    CertificationSerializer,
    VerificationSerializer,
    ProductVerificationSerializer
)


class BatchViewSet(viewsets.ModelViewSet):
    """Batch CRUD operations"""
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user)


class ProductViewSet(viewsets.ModelViewSet):
    """Product CRUD operations"""
    queryset = Product.objects.all()
    permission_classes = (IsAuthenticated,)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ProductCreateSerializer
        return ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Filter by biofortified
        biofortified = self.request.query_params.get('biofortified')
        if biofortified is not None:
            queryset = queryset.filter(biofortified=biofortified.lower() == 'true')
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
    
    @action(detail=False, methods=['get'], url_path='qr/(?P<qr_code>[^/.]+)')
    def by_qr_code(self, request, qr_code=None):
        """Get product by QR code"""
        try:
            product = Product.objects.get(qr_code=qr_code)
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(
                {'detail': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        """Verify a product"""
        product = self.get_object()
        serializer = ProductVerificationSerializer(data=request.data)
        
        if serializer.is_valid():
            Verification.objects.create(
                product=product,
                user=request.user,
                verification_type=serializer.validated_data['verification_method'],
                result='authentic',  # Simplified for now
                notes=serializer.validated_data.get('notes', '')
            )
            return Response({'detail': 'Product verified successfully'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def qr_code(self, request, pk=None):
        """Generate QR code for product"""
        product = self.get_object()
        # TODO: Implement actual QR code generation
        return Response({
            'qr_code': product.qr_code,
            'url': f'/products/verify?qr={product.qr_code}'
        })


class CertificationViewSet(viewsets.ModelViewSet):
    """Certification CRUD operations"""
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = (IsAuthenticated,)
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        """Verify a certification"""
        certification = self.get_object()
        if request.user.is_staff:
            certification.verified = True
            certification.save()
            return Response({'detail': 'Certification verified'})
        return Response(
            {'detail': 'Only admins can verify certifications'},
            status=status.HTTP_403_FORBIDDEN
        )


class VerificationViewSet(viewsets.ReadOnlyModelViewSet):
    """Verification read-only operations"""
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer
    permission_classes = (IsAuthenticated,)
