"""
Web3 client for interacting with Ethereum blockchain
"""
from web3 import Web3
from django.conf import settings
import json
import os


class Web3Client:
    """Client for interacting with AgriTrace smart contract"""
    
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(settings.ETHEREUM_NODE_URL))
        self.account = None
        
        if settings.ETHEREUM_PRIVATE_KEY:
            self.account = self.w3.eth.account.from_key(settings.ETHEREUM_PRIVATE_KEY)
        
        # Load contract ABI
        contract_path = os.path.join(
            os.path.dirname(__file__),
            'contracts',
            'build',
            'AgriTrace.json'
        )
        
        if os.path.exists(contract_path):
            with open(contract_path, 'r') as f:
                contract_json = json.load(f)
                self.contract_abi = contract_json.get('abi', [])
        else:
            self.contract_abi = []
        
        # Initialize contract
        if settings.CONTRACT_ADDRESS and self.contract_abi:
            self.contract = self.w3.eth.contract(
                address=settings.CONTRACT_ADDRESS,
                abi=self.contract_abi
            )
        else:
            self.contract = None
    
    def is_connected(self):
        """Check if connected to Ethereum node"""
        return self.w3.is_connected()
    
    def get_balance(self, address=None):
        """Get ETH balance of address"""
        if address is None and self.account:
            address = self.account.address
        
        if address:
            balance = self.w3.eth.get_balance(address)
            return self.w3.from_wei(balance, 'ether')
        return 0
    
    def register_product(self, qr_code, name, variety, iron_content, biofortified, 
                        quantity, harvest_date, ipfs_hash):
        """Register a product on blockchain"""
        if not self.contract or not self.account:
            raise Exception("Contract or account not initialized")
        
        try:
            # Build transaction
            tx = self.contract.functions.registerProduct(
                qr_code,
                name,
                variety,
                iron_content,
                biofortified,
                quantity,
                harvest_date,
                ipfs_hash
            ).build_transaction({
                'from': self.account.address,
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
                'gas': 500000,
                'gasPrice': self.w3.eth.gas_price
            })
            
            # Sign transaction
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            
            # Send transaction
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            
            # Wait for receipt
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': receipt['status'] == 1,
                'tx_hash': tx_hash.hex(),
                'block_number': receipt['blockNumber']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def register_batch(self, batch_number, seed_variety, planting_date, total_quantity):
        """Register a batch on blockchain"""
        if not self.contract or not self.account:
            raise Exception("Contract or account not initialized")
        
        try:
            tx = self.contract.functions.registerBatch(
                batch_number,
                seed_variety,
                planting_date,
                total_quantity
            ).build_transaction({
                'from': self.account.address,
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
                'gas': 300000,
                'gasPrice': self.w3.eth.gas_price
            })
            
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': receipt['status'] == 1,
                'tx_hash': tx_hash.hex(),
                'block_number': receipt['blockNumber']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def record_transaction(self, to_address, qr_code, quantity, price, transaction_type):
        """Record a transaction on blockchain"""
        if not self.contract or not self.account:
            raise Exception("Contract or account not initialized")
        
        try:
            tx = self.contract.functions.recordTransaction(
                to_address,
                qr_code,
                quantity,
                price,
                transaction_type
            ).build_transaction({
                'from': self.account.address,
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
                'gas': 400000,
                'gasPrice': self.w3.eth.gas_price
            })
            
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': receipt['status'] == 1,
                'tx_hash': tx_hash.hex(),
                'block_number': receipt['blockNumber']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def add_supply_chain_step(self, qr_code, action, description, location):
        """Add a supply chain step on blockchain"""
        if not self.contract or not self.account:
            raise Exception("Contract or account not initialized")
        
        try:
            tx = self.contract.functions.addSupplyChainStep(
                qr_code,
                action,
                description,
                location
            ).build_transaction({
                'from': self.account.address,
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
                'gas': 350000,
                'gasPrice': self.w3.eth.gas_price
            })
            
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': receipt['status'] == 1,
                'tx_hash': tx_hash.hex(),
                'block_number': receipt['blockNumber']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def verify_product(self, qr_code):
        """Verify a product on blockchain"""
        if not self.contract or not self.account:
            raise Exception("Contract or account not initialized")
        
        try:
            tx = self.contract.functions.verifyProduct(qr_code).build_transaction({
                'from': self.account.address,
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
                'gas': 200000,
                'gasPrice': self.w3.eth.gas_price
            })
            
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': receipt['status'] == 1,
                'tx_hash': tx_hash.hex(),
                'block_number': receipt['blockNumber']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_product(self, qr_code):
        """Get product details from blockchain"""
        if not self.contract:
            raise Exception("Contract not initialized")
        
        try:
            product = self.contract.functions.getProduct(qr_code).call()
            return {
                'name': product[0],
                'variety': product[1],
                'iron_content': product[2],
                'biofortified': product[3],
                'creator': product[4],
                'quantity': product[5],
                'harvest_date': product[6],
                'ipfs_hash': product[7]
            }
        except Exception as e:
            return None
    
    def get_supply_chain_history(self, qr_code):
        """Get supply chain history from blockchain"""
        if not self.contract:
            raise Exception("Contract not initialized")
        
        try:
            history = self.contract.functions.getSupplyChainHistory(qr_code).call()
            return [
                {
                    'actor': step[0],
                    'action': step[1],
                    'description': step[2],
                    'timestamp': step[3],
                    'location': step[4]
                }
                for step in history
            ]
        except Exception as e:
            return []
    
    def is_product_verified(self, qr_code):
        """Check if product is verified on blockchain"""
        if not self.contract:
            raise Exception("Contract not initialized")
        
        try:
            return self.contract.functions.isProductVerified(qr_code).call()
        except Exception as e:
            return False


# Singleton instance
web3_client = Web3Client()
