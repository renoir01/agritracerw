# Quick Start Instructions

## ✅ You have Docker installed! (Easiest method)

### Start the application:
```powershell
docker-compose up --build
```

### Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/docs/
- **Admin Panel**: http://localhost:8000/admin/

### Stop the application:
Press `Ctrl+C` in the terminal, then run:
```powershell
docker-compose down
```

---

## 🔧 Manual Setup (Alternative)

If Docker doesn't work, you can run each component separately:

### 1. Start Backend (Terminal 1)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 2. Start Frontend (Terminal 2)
```powershell
cd frontend
npm install
npm start
```

---

## 📝 First Time Setup

After starting with Docker, create an admin user:

```powershell
docker-compose exec backend python manage.py createsuperuser
```

Follow the prompts to create your admin account.

---

## 🎯 What's Running?

When you start with Docker Compose, these services start:

1. **PostgreSQL** (port 5432) - Database
2. **Redis** (port 6379) - Cache
3. **Django Backend** (port 8000) - REST API
4. **React Frontend** (port 3000) - Web Interface
5. **IPFS** (ports 4001, 5001, 8080) - File storage

---

## 🚀 Next Steps

1. Open http://localhost:3000 in your browser
2. Explore the home page
3. Try the Login page (backend needs to be fully started)
4. Access the admin panel at http://localhost:8000/admin/
5. View API docs at http://localhost:8000/api/docs/

---

## ⚠️ Troubleshooting

### Ports already in use?
```powershell
# Check what's using the ports
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Kill the process
taskkill /PID <process-id> /F
```

### Docker issues?
```powershell
# Clean up Docker
docker-compose down -v
docker system prune -a

# Restart Docker Desktop
```

### Database issues?
```powershell
# Reset database
docker-compose down -v
docker-compose up --build
```

---

## 📖 Documentation

- Full setup guide: `SETUP_GUIDE.md`
- Quick start: `QUICK_START.md`
- Project summary: `PROJECT_SUMMARY.md`
- Development roadmap: `DEVELOPMENT_ROADMAP.md`
