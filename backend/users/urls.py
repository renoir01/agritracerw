"""
URL patterns for Users app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'locations', views.LocationViewSet, basename='location')

urlpatterns = [
    # Authentication
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User management
    path('me/', views.CurrentUserView.as_view(), name='current_user'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('<int:pk>/verify/', views.VerifyUserView.as_view(), name='verify_user'),
    
    # Router URLs
    path('', include(router.urls)),
]
