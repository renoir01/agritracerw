"""
Views for Users app
"""
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Location, UserActivity
from .serializers import (
    UserSerializer, 
    UserRegistrationSerializer, 
    LocationSerializer,
    UserActivitySerializer
)


class RegisterView(generics.CreateAPIView):
    """User registration endpoint"""
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        """Override create to add better error handling"""
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                {
                    'message': 'User registered successfully',
                    'user': serializer.data
                },
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            return Response(
                {
                    'detail': str(e),
                    'errors': serializer.errors if hasattr(serializer, 'errors') else {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class LoginView(generics.GenericAPIView):
    """User login endpoint"""
    permission_classes = (AllowAny,)
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            
            # Log activity
            UserActivity.objects.create(
                user=user,
                activity_type='login',
                description='User logged in',
                ip_address=request.META.get('REMOTE_ADDR')
            )
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            })
        
        return Response(
            {'detail': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(generics.GenericAPIView):
    """User logout endpoint"""
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            # Log activity
            UserActivity.objects.create(
                user=request.user,
                activity_type='logout',
                description='User logged out'
            )
            
            return Response({'detail': 'Successfully logged out'})
        except Exception as e:
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class CurrentUserView(generics.RetrieveAPIView):
    """Get current authenticated user"""
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user


class ProfileView(generics.RetrieveUpdateAPIView):
    """User profile management"""
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user


class VerifyUserView(generics.GenericAPIView):
    """Verify a user (admin only)"""
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, pk):
        if not request.user.is_staff:
            return Response(
                {'detail': 'Only admins can verify users'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            user = User.objects.get(pk=pk)
            user.verified_status = True
            user.save()
            return Response({'detail': 'User verified successfully'})
        except User.DoesNotExist:
            return Response(
                {'detail': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class LocationViewSet(viewsets.ModelViewSet):
    """Location CRUD operations"""
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search locations by query"""
        query = request.query_params.get('q', '')
        locations = Location.objects.filter(
            district__icontains=query
        ) | Location.objects.filter(
            sector__icontains=query
        ) | Location.objects.filter(
            village__icontains=query
        )
        serializer = self.get_serializer(locations, many=True)
        return Response(serializer.data)
