"""
Africa's Talking integration for USSD and SMS
"""
import africastalking
from django.conf import settings


class AfricasTalkingClient:
    """Client for Africa's Talking API"""
    
    def __init__(self):
        self.username = settings.AFRICAS_TALKING_USERNAME
        self.api_key = settings.AFRICAS_TALKING_API_KEY
        
        # Initialize SDK
        africastalking.initialize(self.username, self.api_key)
        
        # Get services
        self.sms = africastalking.SMS
        self.ussd = africastalking.USSD
    
    def send_sms(self, recipients, message, sender_id=None):
        """
        Send SMS to recipients
        
        Args:
            recipients: List of phone numbers or single phone number
            message: SMS message content
            sender_id: Optional sender ID
        
        Returns:
            Response from Africa's Talking API
        """
        try:
            if isinstance(recipients, str):
                recipients = [recipients]
            
            params = {
                'recipients': recipients,
                'message': message
            }
            
            if sender_id:
                params['sender_id'] = sender_id
            
            response = self.sms.send(message, recipients)
            return {
                'success': True,
                'response': response
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def handle_ussd_request(self, session_id, service_code, phone_number, text):
        """
        Handle USSD request
        
        Args:
            session_id: Unique session ID
            service_code: USSD service code
            phone_number: User's phone number
            text: User input text
        
        Returns:
            USSD response string
        """
        response = ""
        
        if text == "":
            # Main menu
            response = "CON Welcome to AGRITRACE\n"
            response += "1. Verify Product\n"
            response += "2. Register Product\n"
            response += "3. Check My Products\n"
            response += "4. Transaction History\n"
            response += "5. Help"
        
        elif text == "1":
            # Verify product
            response = "CON Enter QR Code to verify:"
        
        elif text.startswith("1*"):
            # Process verification
            qr_code = text.split("*")[1]
            # TODO: Implement product verification logic
            response = f"END Product {qr_code} verification in progress. You will receive SMS confirmation."
        
        elif text == "2":
            # Register product
            response = "CON Product Registration\n"
            response += "1. Biofortified Beans\n"
            response += "2. Other Crops"
        
        elif text == "3":
            # Check products
            # TODO: Implement product listing
            response = "END You have 5 registered products. Check SMS for details."
        
        elif text == "4":
            # Transaction history
            # TODO: Implement transaction history
            response = "END Your last 5 transactions sent via SMS."
        
        elif text == "5":
            # Help
            response = "END AGRITRACE Help:\n"
            response += "Call: +250 XXX XXX XXX\n"
            response += "Email: support@agritrace.rw"
        
        else:
            response = "END Invalid option. Please try again."
        
        return response


# Singleton instance
africas_talking_client = AfricasTalkingClient()
