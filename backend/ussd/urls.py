"""
URL patterns for USSD app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('callback/', views.USSDCallbackView.as_view(), name='ussd_callback'),
    path('sms/', views.SendSMSView.as_view(), name='send_sms'),
]
