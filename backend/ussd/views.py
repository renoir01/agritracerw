"""
Views for USSD app
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .africas_talking import africas_talking_client


class USSDCallbackView(APIView):
    """Handle USSD callbacks from Africa's Talking"""
    permission_classes = (AllowAny,)
    
    def post(self, request):
        session_id = request.data.get('sessionId')
        service_code = request.data.get('serviceCode')
        phone_number = request.data.get('phoneNumber')
        text = request.data.get('text', '')
        
        response_text = africas_talking_client.handle_ussd_request(
            session_id=session_id,
            service_code=service_code,
            phone_number=phone_number,
            text=text
        )
        
        return Response(response_text, content_type='text/plain')


class SendSMSView(APIView):
    """Send SMS to users"""
    permission_classes = (AllowAny,)
    
    def post(self, request):
        recipients = request.data.get('recipients', [])
        message = request.data.get('message', '')
        
        result = africas_talking_client.send_sms(recipients, message)
        
        if result.get('success'):
            return Response({'detail': 'SMS sent successfully'})
        else:
            return Response(
                {'detail': result.get('error', 'Failed to send SMS')},
                status=400
            )
