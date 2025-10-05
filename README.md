# AGRITRACE: Blockchain-Based Traceability for Biofortified Crops

**BSc. in Software Engineering Project**  
**Author:** Renoir KAZE  
**Supervisor:** Neza David Tuyishimire  
**Date:** 16/09/2025

## Overview

AGRITRACE is a blockchain-based digital traceability platform designed to address authentication and supply chain transparency gaps for biofortified crops in Rwanda. The system enables stakeholders to verify crop authenticity from seed to consumer while improving trust, reducing fraud, and maximizing the nutritional impact of biofortification programs.

## Problem Statement

Despite significant investments in biofortification programs, Rwanda faces critical challenges in ensuring the integrity and traceability of biofortified crops throughout the supply chain. AGRITRACE addresses the absence of a comprehensive, mobile-friendly blockchain-based traceability system specifically designed for biofortified crops in smallholder farming contexts.

## Key Features

- **Blockchain Integration**: Ethereum-based smart contracts for immutable record-keeping
- **Mobile-First Design**: Progressive Web App (PWA) supporting both smartphones and feature phones
- **USSD Support**: Feature phone compatibility for users without smartphones (63.8% of users)
- **QR Code Verification**: Quick authentication of biofortified products
- **Offline Functionality**: Works in areas with limited connectivity
- **Multi-Language Support**: English, Kinyarwanda, and French
- **Supply Chain Tracking**: Real-time tracking from seed to consumer
- **Analytics Dashboard**: Comprehensive reporting and monitoring

## System Architecture

### Technology Stack

**Frontend:**
- React.js with Progressive Web App (PWA) capabilities
- Offline-first architecture
- QR code scanning functionality

**Backend:**
- Django REST Framework
- PostgreSQL database
- Redis caching layer

**Blockchain:**
- Ethereum (Ropsten Testnet)
- Smart contracts for verification
- IPFS for distributed file storage

**Mobile Integration:**
- Africa's Talking API for USSD/SMS
- Push notifications
- Geolocation services

**DevOps:**
- Docker containerization
- AWS/Azure cloud hosting
- GitHub Actions CI/CD
- Sentry error monitoring

## Project Structure

```
agritracerw/
├── backend/              # Django REST API
│   ├── api/             # API endpoints
│   ├── blockchain/      # Blockchain integration
│   ├── users/           # User management
│   ├── products/        # Product tracking
│   ├── transactions/    # Supply chain transactions
│   └── analytics/       # Reporting and analytics
├── frontend/            # React PWA
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Application pages
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
├── blockchain/          # Smart contracts
│   ├── contracts/       # Solidity contracts
│   ├── migrations/      # Deployment scripts
│   └── test/           # Contract tests
├── ussd/               # USSD integration
└── docs/               # Documentation

```

## Target Users

1. **Farmers** (100 users): Register and track biofortified crop production
2. **Traders/Aggregators** (20 users): Verify authenticity and manage inventory
3. **Processors/Retailers** (25 users): Track supply chain and generate certificates
4. **Consumers** (50 users): Verify product authenticity via QR codes
5. **Administrators** (5 users): Monitor system and generate analytics

## Geographic Scope

**Pilot Region:** Musanze District, Northern Province, Rwanda
- Area: 530 km²
- Target: 2,000 smallholder farmers
- Cooperatives: 15
- Processing facilities: 5

## Development Timeline

| Phase | Activities | Duration |
|-------|-----------|----------|
| Phase 1 | Literature Review & Requirements | Week 1-2 |
| Phase 2 | System Design & Development | Week 3-7 |
| Phase 3 | Testing, Validation & Documentation | Week 8-12 |

## Installation & Setup

### Prerequisites

- Python 3.9+
- Node.js 16+
- SQLite (included) or PostgreSQL 13+
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\Activate.ps1
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create admin user
python create_admin.py
# Or use: python manage.py createsuperuser

# Start development server
python manage.py runserver
```

**Backend will run on:** http://localhost:8000

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend will run on:** http://localhost:3001

### Blockchain Setup

```bash
cd blockchain
npm install
truffle compile
truffle migrate --network ropsten
```

### Docker Setup

```bash
docker-compose up --build
```

## Environment Variables

Create `.env` files in respective directories:

**Backend (.env):**
```
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/agritrace
ETHEREUM_NODE_URL=https://ropsten.infura.io/v3/your-project-id
IPFS_API_URL=https://ipfs.infura.io:5001
AFRICAS_TALKING_API_KEY=your-api-key
AFRICAS_TALKING_USERNAME=your-username
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BLOCKCHAIN_NETWORK=ropsten
```

## API Documentation

API documentation is available at:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

## Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Blockchain Tests
```bash
cd blockchain
truffle test
```

## Ethical Considerations

AGRITRACE implements comprehensive ethical safeguards:

- **Data Privacy**: AES-256 encryption, off-chain personal data storage
- **Informed Consent**: Multilingual consent forms (Kinyarwanda, English, French)
- **Digital Equity**: USSD support for feature phones, subsidized data costs
- **Gender Inclusion**: Partnerships with women's cooperatives
- **Fair Value Distribution**: Transparent pricing mechanisms

## Success Metrics

- **Fraud Reduction**: Target 75% reduction in counterfeit biofortified products
- **Supply Chain Transparency**: 90% traceability from farm to fork
- **Stakeholder Trust**: Measured through pre/post-implementation surveys
- **Platform Adoption**: 200 stakeholders across 5 user categories

## Contributing

This is an academic research project. For inquiries, please contact:
- **Author:** Renoir KAZE
- **Supervisor:** Neza David Tuyishimire

## License

This project is developed as part of a BSc. in Software Engineering program.

## References

See the full research proposal document for comprehensive references and literature review.

## Acknowledgments

- Rwanda Agriculture and Animal Resources Development Board (RAB)
- National Institute of Statistics of Rwanda (NISR)
- Smallholder farmers in Musanze District
- African Leadership University

---

**Version:** 1.0.0  
**Last Updated:** September 2025
