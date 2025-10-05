"""
Views for Blockchain app
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .web3_client import web3_client


class BlockchainStatusView(APIView):
    """Check blockchain connection status"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        is_connected = web3_client.is_connected()
        balance = web3_client.get_balance() if is_connected else 0
        
        return Response({
            'connected': is_connected,
            'balance': float(balance),
            'network': 'Goerli Testnet',
            'contract_address': web3_client.contract.address if web3_client.contract else None
        })


class RegisterProductView(APIView):
    """Register product on blockchain"""
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        try:
            data = request.data
            result = web3_client.register_product(
                qr_code=data.get('qr_code'),
                name=data.get('name'),
                variety=data.get('variety'),
                iron_content=int(data.get('iron_content', 0)),
                biofortified=data.get('biofortified', True),
                quantity=int(data.get('quantity', 0)),
                harvest_date=int(data.get('harvest_date', 0)),
                ipfs_hash=data.get('ipfs_hash', '')
            )
            
            if result.get('success'):
                return Response({
                    'detail': 'Product registered on blockchain',
                    'tx_hash': result.get('tx_hash'),
                    'block_number': result.get('block_number')
                })
            else:
                return Response(
                    {'detail': result.get('error', 'Registration failed')},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'detail': f'Blockchain error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RegisterBatchView(APIView):
    """Register batch on blockchain"""
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        try:
            data = request.data
            result = web3_client.register_batch(
                batch_number=data.get('batch_number'),
                seed_variety=data.get('seed_variety'),
                planting_date=int(data.get('planting_date', 0)),
                total_quantity=int(data.get('total_quantity', 0))
            )
            
            if result.get('success'):
                return Response({
                    'detail': 'Batch registered on blockchain',
                    'tx_hash': result.get('tx_hash')
                })
            else:
                return Response(
                    {'detail': result.get('error', 'Registration failed')},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'detail': f'Blockchain error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VerifyProductView(APIView):
    """Verify product on blockchain"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, qr_code):
        try:
            is_verified = web3_client.is_product_verified(qr_code)
            product_data = web3_client.get_product(qr_code)
            
            return Response({
                'verified': is_verified,
                'product': product_data,
                'blockchain_verified': True
            })
        except Exception as e:
            return Response(
                {'detail': f'Verification error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetProductView(APIView):
    """Get product from blockchain"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, qr_code):
        try:
            product = web3_client.get_product(qr_code)
            if product:
                return Response(product)
            return Response(
                {'detail': 'Product not found on blockchain'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'detail': f'Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetSupplyChainView(APIView):
    """Get supply chain from blockchain"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, qr_code):
        try:
            history = web3_client.get_supply_chain_history(qr_code)
            return Response({'supply_chain': history})
        except Exception as e:
            return Response(
                {'detail': f'Error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
