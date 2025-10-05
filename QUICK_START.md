# AGRITRACE Quick Start Guide

Get AGRITRACE running on your local machine in under 10 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Python 3.9+ installed
- ✅ Node.js 16+ installed
- ✅ PostgreSQL 13+ installed
- ✅ Git installed

## Option 1: Docker Quick Start (Recommended)

### Step 1: Clone and Start

```bash
# Clone the repository
git clone <repository-url>
cd agritracerw

# Start all services with Docker
docker-compose up --build
```

### Step 2: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs/
- **Admin Panel**: http://localhost:8000/admin/

### Step 3: Create Admin User

```bash
# In a new terminal
docker-compose exec backend python manage.py createsuperuser
```

That's it! You're ready to go! 🚀

## Option 2: Manual Setup

### Step 1: Database Setup

```bash
# Start PostgreSQL and create database
psql -U postgres
CREATE DATABASE agritrace;
CREATE USER agritrace_user WITH PASSWORD 'agritrace_password';
GRANT ALL PRIVILEGES ON DATABASE agritrace TO agritrace_user;
\q
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### Step 3: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Start development server
npm start
```

### Step 4: Blockchain Setup (Optional)

```bash
# Open new terminal
cd blockchain

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Compile contracts
npx truffle compile

# Start local blockchain (Ganache)
# Download and start Ganache on port 7545

# Deploy contracts
npx truffle migrate --network development
```

## Quick Test

### Test Backend API

```bash
# Check API health
curl http://localhost:8000/api/v1/

# View API documentation
# Open browser: http://localhost:8000/api/docs/
```

### Test Frontend

```bash
# Open browser: http://localhost:3000
# You should see the AGRITRACE landing page
```

## Default Credentials

After creating a superuser, you can access:

**Admin Panel**: http://localhost:8000/admin/
- Username: (what you created)
- Password: (what you created)

## Common Issues

### Issue: Port already in use

**Solution**:
```bash
# Windows PowerShell
netstat -ano | findstr :8000
taskkill /PID <process-id> /F
```

### Issue: Database connection error

**Solution**:
- Ensure PostgreSQL is running
- Check credentials in `.env` file
- Verify database exists

### Issue: Module not found

**Solution**:
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

## Next Steps

1. **Explore the API**: Visit http://localhost:8000/api/docs/
2. **Create Test Users**: Use admin panel to create users with different roles
3. **Register Products**: Test product registration flow
4. **Verify Products**: Test QR code verification
5. **View Analytics**: Check dashboard statistics

## Development Workflow

```bash
# Terminal 1: Backend
cd backend
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm start

# Terminal 3: Celery (for background tasks)
cd backend
celery -A agritrace worker -l info

# Terminal 4: Redis (for caching)
redis-server
```

## Useful Commands

### Backend
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Collect static files
python manage.py collectstatic
```

### Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Blockchain
```bash
# Compile contracts
npx truffle compile

# Deploy contracts
npx truffle migrate

# Run tests
npx truffle test

# Open console
npx truffle console
```

## Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://agritrace_user:agritrace_password@localhost:5432/agritrace
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### Blockchain (.env)
```env
MNEMONIC=your twelve word mnemonic
INFURA_PROJECT_ID=your-infura-id
```

## Getting Help

- **Documentation**: See `README.md` and `SETUP_GUIDE.md`
- **API Docs**: http://localhost:8000/api/docs/
- **Issues**: Create an issue on GitHub
- **Email**: contact@agritrace.rw

## What's Next?

- Read the full [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- Check [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)
- Explore the API documentation
- Start implementing features!

---

**Happy Coding! 🎉**
