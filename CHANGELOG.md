# Changelog

All notable changes to the AGRITRACE project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- API view implementations for all endpoints
- Frontend page components (Dashboard, Product Registration, etc.)
- QR code generation and scanning functionality
- USSD menu system completion
- Analytics visualizations
- Comprehensive testing suite
- Production deployment

## [0.1.0] - 2025-09-30

### Added - Foundation Release

#### Backend
- Django 4.2.7 project structure with REST Framework
- Custom User model with role-based types (farmer, trader, processor, consumer, seed_producer, admin)
- Location model for Rwandan administrative divisions
- Product and Batch models for crop tracking
- Transaction and SupplyChain models for supply chain management
- Certification and Verification models for product authentication
- Payment model for transaction settlements
- User activity tracking
- PostgreSQL database configuration
- Redis caching setup
- Celery task queue configuration
- JWT authentication with Simple JWT
- Multi-language support (English, Kinyarwanda, French)
- Admin interface for all models
- API URL routing structure
- Serializers for User, Location, Product, Batch, Certification, Verification
- Environment variable configuration with django-environ

#### Frontend
- React 18.2.0 with Create React App
- Progressive Web App (PWA) setup
- React Router v6 for navigation
- Axios API client with interceptors
- API service layer with all endpoint definitions
- Authentication flow structure
- Protected route component
- App.js with routing configuration
- Service worker for offline functionality
- Environment variable configuration

#### Blockchain
- AgriTrace.sol smart contract (Solidity 0.8.19)
- Product registration on blockchain
- Batch management on blockchain
- Transaction recording functionality
- Supply chain step tracking
- Product verification system
- User verification (admin-controlled)
- OpenZeppelin integration (Ownable, Pausable)
- Truffle configuration for multiple networks (development, ropsten, goerli, sepolia, mainnet)
- Migration scripts for contract deployment
- Web3.py client for backend integration
- Comprehensive smart contract methods

#### USSD Integration
- Africa's Talking API client
- SMS sending functionality
- USSD callback handler structure
- Multi-level USSD menu framework
- Product verification via USSD
- Transaction history via USSD

#### Analytics
- Analytics app structure
- Dashboard statistics endpoints
- Product analytics
- Transaction analytics
- User statistics
- Supply chain analytics
- Data export functionality

#### DevOps & Infrastructure
- Docker configuration for backend
- Docker configuration for frontend
- Docker Compose for multi-container orchestration
- PostgreSQL service
- Redis service
- IPFS service
- Environment variable templates (.env.example)
- .gitignore configuration

#### Documentation
- Comprehensive README.md
- SETUP_GUIDE.md with detailed installation instructions
- PROJECT_SUMMARY.md with complete project overview
- DEVELOPMENT_ROADMAP.md with 12-week plan
- QUICK_START.md for rapid setup
- CONTRIBUTING.md with contribution guidelines
- LICENSE (MIT with academic research notice)
- API documentation structure (Swagger/OpenAPI ready)

#### Security
- JWT token authentication
- Password hashing
- CORS configuration
- HTTPS/SSL ready configuration
- Data encryption support (AES-256)
- Role-based access control structure
- Secure environment variable handling

#### Ethical Features
- Data consent management
- Multi-language consent forms
- Off-chain personal data storage
- Blockchain immutability with privacy balance
- Gender-inclusive design considerations
- Digital divide mitigation (USSD support)

### Technical Specifications
- Python 3.9+ backend
- Node.js 16+ frontend
- PostgreSQL 13+ database
- Redis 7+ caching
- Ethereum blockchain (Goerli/Sepolia testnet)
- Solidity 0.8.19
- React 18.2.0
- Django 4.2.7
- Docker containerization

### Database Schema
- 8 core models implemented
- Foreign key relationships established
- Indexes for performance optimization
- Blockchain hash references
- IPFS hash storage
- Comprehensive field validation

### API Endpoints Structure
- `/api/v1/users/` - User management
- `/api/v1/products/` - Product operations
- `/api/v1/transactions/` - Transaction management
- `/api/v1/blockchain/` - Blockchain integration
- `/api/v1/analytics/` - Analytics and reporting
- `/api/v1/ussd/` - USSD callbacks

### Smart Contract Functions
- `registerProduct()` - Register products on blockchain
- `registerBatch()` - Register crop batches
- `recordTransaction()` - Record supply chain transactions
- `addSupplyChainStep()` - Add supply chain steps
- `verifyProduct()` - Mark products as verified
- `verifyUser()` - Admin user verification
- `getProduct()` - Retrieve product details
- `getSupplyChainHistory()` - Get complete supply chain
- `isProductVerified()` - Check verification status

### Known Limitations
- API views not yet implemented (structure only)
- Frontend pages not yet implemented (structure only)
- Smart contracts not yet deployed to testnet
- QR code generation not yet implemented
- USSD menu system incomplete
- Analytics visualizations not yet implemented
- No test coverage yet
- Documentation incomplete in some areas

### Dependencies
- Backend: 30+ Python packages (see requirements.txt)
- Frontend: React ecosystem packages (see package.json)
- Blockchain: Truffle, Web3, OpenZeppelin (see blockchain/package.json)

## Research Alignment

This release establishes the complete foundation for the research objectives:

1. ✅ **Literature Review Integration**: System design based on reviewed literature
2. ✅ **Comprehensive Solution**: All required components structured
3. ✅ **Measurable Metrics**: Analytics framework for data collection
4. ✅ **Ethical Framework**: Privacy and consent mechanisms implemented
5. ✅ **Technical Feasibility**: Proven technology stack

## Next Steps

See [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) for detailed next steps.

Priority for next release (0.2.0):
1. Implement all API views
2. Create frontend components
3. Deploy smart contracts to testnet
4. Implement QR code functionality
5. Complete USSD menu system
6. Add comprehensive tests

---

**Project**: AGRITRACE - Blockchain-Based Traceability for Biofortified Crops  
**Author**: Renoir KAZE  
**Institution**: African Leadership University  
**Supervisor**: Neza David Tuyishimire
