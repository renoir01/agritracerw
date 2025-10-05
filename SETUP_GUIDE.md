# AGRITRACE Setup Guide

This guide will help you set up the AGRITRACE platform on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **PostgreSQL 13+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Docker & Docker Compose** (Optional) - [Download Docker](https://www.docker.com/products/docker-desktop)

## Quick Start with Docker

The easiest way to get started is using Docker:

```bash
# Clone the repository
git clone <repository-url>
cd agritracerw

# Start all services
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/api/docs/

## Manual Setup

### 1. Database Setup

Create a PostgreSQL database:

```bash
# On Windows (PowerShell)
psql -U postgres

# In PostgreSQL shell
CREATE DATABASE agritrace;
CREATE USER agritrace_user WITH PASSWORD 'agritrace_password';
GRANT ALL PRIVILEGES ON DATABASE agritrace TO agritrace_user;
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Windows CMD:
venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # Windows
# Edit .env with your configuration

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver
```

### 3. Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # Windows
# Edit .env with your configuration

# Start development server
npm start
```

### 4. Blockchain Setup

```bash
# Open new terminal
cd blockchain

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # Windows

# Compile contracts
npx truffle compile

# Deploy to local network (Ganache)
# First, start Ganache on port 7545
npx truffle migrate --network development

# Or deploy to testnet (Goerli/Sepolia)
npx truffle migrate --network goerli
```

## Environment Variables

### Backend (.env)

Create `backend/.env` file:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://agritrace_user:agritrace_password@localhost:5432/agritrace

# Redis
REDIS_URL=redis://localhost:6379/0

# Blockchain
ETHEREUM_NODE_URL=https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID
ETHEREUM_PRIVATE_KEY=your-private-key-here
CONTRACT_ADDRESS=deployed-contract-address

# IPFS
IPFS_API_URL=http://localhost:5001

# Africa's Talking
AFRICAS_TALKING_USERNAME=sandbox
AFRICAS_TALKING_API_KEY=your-api-key-here

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Sentry (Optional)
SENTRY_DSN=your-sentry-dsn
```

### Frontend (.env)

Create `frontend/.env` file:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_BLOCKCHAIN_NETWORK=goerli
REACT_APP_CONTRACT_ADDRESS=deployed-contract-address
```

### Blockchain (.env)

Create `blockchain/.env` file:

```env
MNEMONIC=your twelve word mnemonic phrase here
INFURA_PROJECT_ID=your-infura-project-id
ETHERSCAN_API_KEY=your-etherscan-api-key
```

## Getting API Keys

### 1. Infura (Ethereum Node Provider)

1. Visit [Infura.io](https://infura.io/)
2. Create free account
3. Create new project
4. Copy Project ID

### 2. Africa's Talking (SMS/USSD)

1. Visit [Africa's Talking](https://africastalking.com/)
2. Create account
3. Get sandbox credentials
4. For production, apply for live credentials

### 3. Etherscan (Contract Verification)

1. Visit [Etherscan.io](https://etherscan.io/)
2. Create account
3. Generate API key in account settings

## Running Tests

### Backend Tests

```bash
cd backend
python manage.py test

# With coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Tests

```bash
cd frontend
npm test

# With coverage
npm test -- --coverage
```

### Blockchain Tests

```bash
cd blockchain
npx truffle test
```

## Common Issues & Solutions

### Issue: Port already in use

**Solution:**
```bash
# Find process using port (Windows PowerShell)
netstat -ano | findstr :8000

# Kill process
taskkill /PID <process-id> /F
```

### Issue: Database connection error

**Solution:**
- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists

### Issue: Blockchain deployment fails

**Solution:**
- Ensure Ganache is running (for local)
- Check you have test ETH (for testnets)
- Verify Infura project ID is correct

### Issue: CORS errors in frontend

**Solution:**
- Add frontend URL to CORS_ALLOWED_ORIGINS in backend .env
- Restart backend server

## Development Workflow

1. **Start Backend:**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Start Redis (for caching):**
   ```bash
   redis-server
   ```

4. **Start Celery (for background tasks):**
   ```bash
   cd backend
   celery -A agritrace worker -l info
   ```

## Production Deployment

For production deployment, refer to:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [SECURITY.md](./SECURITY.md) - Security best practices

## Additional Resources

- [API Documentation](http://localhost:8000/api/docs/)
- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://reactjs.org/docs/)
- [Truffle Documentation](https://trufflesuite.com/docs/)
- [Solidity Documentation](https://docs.soliditylang.org/)

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: contact@agritrace.rw

## Next Steps

After setup:
1. Explore the API documentation
2. Create test users with different roles
3. Register sample products
4. Test QR code verification
5. Review blockchain transactions

---

**Happy Coding! 🚀**
