# 🚀 AGRITRACE - Deployment Plan

## 📋 Deployment Strategy

### Phase 1: Development (Current) ✅
- **Environment:** Local development
- **Backend:** http://localhost:8000
- **Frontend:** http://localhost:3001
- **Database:** SQLite (local)
- **Status:** COMPLETE

### Phase 2: Staging (Week 8-9)
- **Environment:** Cloud staging server
- **Purpose:** Testing and validation
- **Users:** Internal testing team
- **Duration:** 2 weeks

### Phase 3: Production (Week 10-12)
- **Environment:** Cloud production
- **Purpose:** Live deployment
- **Users:** Pilot users in Musanze District
- **Monitoring:** 24/7 system monitoring

---

## ☁️ Cloud Infrastructure

### Option 1: AWS (Recommended)
**Services:**
- **EC2:** Application servers
- **RDS:** PostgreSQL database
- **S3:** Static file storage
- **CloudFront:** CDN for frontend
- **Route 53:** DNS management
- **Certificate Manager:** SSL/TLS certificates
- **CloudWatch:** Monitoring and logging

**Estimated Cost:** $50-100/month

### Option 2: Azure
**Services:**
- **App Service:** Web applications
- **Azure Database:** PostgreSQL
- **Blob Storage:** File storage
- **CDN:** Content delivery
- **Application Insights:** Monitoring

**Estimated Cost:** $60-120/month

### Option 3: Heroku (Easiest)
**Services:**
- **Dynos:** Application hosting
- **Heroku Postgres:** Database
- **Heroku Redis:** Caching
- **Papertrail:** Logging

**Estimated Cost:** $25-50/month

---

## 🐳 Docker Deployment

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: agritrace
      POSTGRES_USER: agritrace_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Redis Cache
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  # Django Backend
  backend:
    build: ./backend
    command: gunicorn agritrace.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./backend:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/mediafiles
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    depends_on:
      - db
      - redis

  # React Frontend
  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3001:3001"
    environment:
      - REACT_APP_API_URL=http://backend:8000/api

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/static
      - media_volume:/media
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
      - frontend

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

### Build and Run
```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔧 Environment Configuration

### Backend (.env)
```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=agritrace.rw,www.agritrace.rw

# Database
DATABASE_URL=postgresql://user:password@db:5432/agritrace

# Redis
REDIS_URL=redis://redis:6379/0

# Blockchain
ETHEREUM_NODE_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
IPFS_API_URL=https://ipfs.infura.io:5001

# Africa's Talking
AFRICAS_TALKING_API_KEY=your-api-key
AFRICAS_TALKING_USERNAME=your-username

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=noreply@agritrace.rw
EMAIL_HOST_PASSWORD=your-email-password

# AWS S3 (for media files)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=agritrace-media
AWS_S3_REGION_NAME=us-east-1

# Security
CORS_ALLOWED_ORIGINS=https://agritrace.rw,https://www.agritrace.rw
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://api.agritrace.rw
REACT_APP_BLOCKCHAIN_NETWORK=mainnet
REACT_APP_GOOGLE_MAPS_API_KEY=your-maps-key
```

---

## 📦 Deployment Steps

### Step 1: Prepare Code
```bash
# Update dependencies
pip freeze > backend/requirements.txt
cd frontend && npm run build

# Run tests
python backend/manage.py test
npm test --prefix frontend

# Collect static files
python backend/manage.py collectstatic --noinput
```

### Step 2: Database Migration
```bash
# Backup current database
python manage.py dumpdata > backup.json

# Run migrations on production
python manage.py migrate --settings=agritrace.settings.production

# Create superuser
python manage.py createsuperuser
```

### Step 3: Deploy to AWS

#### Using AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p python-3.9 agritrace --region us-east-1

# Create environment
eb create agritrace-prod

# Deploy
eb deploy

# Open application
eb open
```

#### Using AWS EC2 (Manual)
```bash
# SSH to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Clone repository
git clone https://github.com/renoir01/agritracerw.git
cd agritracerw

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic

# Setup Gunicorn
gunicorn agritrace.wsgi:application --bind 0.0.0.0:8000

# Setup Nginx
sudo nano /etc/nginx/sites-available/agritrace
sudo ln -s /etc/nginx/sites-available/agritrace /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Setup Supervisor (process manager)
sudo nano /etc/supervisor/conf.d/agritrace.conf
sudo supervisorctl reread
sudo supervisorctl update
```

### Step 4: Configure Domain & SSL
```bash
# Point domain to server
# agritrace.rw -> EC2 IP address

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d agritrace.rw -d www.agritrace.rw

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🔍 Monitoring & Logging

### Application Monitoring
```python
# Install Sentry
pip install sentry-sdk

# Configure in settings.py
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
)
```

### Server Monitoring
```bash
# Install monitoring tools
sudo apt install htop
sudo apt install netdata

# View system stats
htop

# Netdata dashboard
http://your-server-ip:19999
```

### Log Management
```bash
# Application logs
tail -f /var/log/agritrace/app.log

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Database logs
tail -f /var/log/postgresql/postgresql-13-main.log
```

---

## 🔐 Security Checklist

- [ ] SSL/TLS certificate installed
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Firewall configured (UFW/Security Groups)
- [ ] Database password strong and rotated
- [ ] Secret keys in environment variables
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection (ORM)
- [ ] XSS protection enabled
- [ ] CSRF tokens validated
- [ ] File upload restrictions
- [ ] Regular security updates
- [ ] Backup strategy implemented
- [ ] DDoS protection (CloudFlare)
- [ ] API authentication (JWT)

---

## 📊 Performance Optimization

### Backend Optimization
```python
# Database indexing
class Product(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['qr_code']),
            models.Index(fields=['owner', 'created_at']),
        ]

# Query optimization
products = Product.objects.select_related('owner', 'batch').all()

# Caching
from django.core.cache import cache
cache.set('products_list', products, 300)  # 5 minutes
```

### Frontend Optimization
```javascript
// Code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Image optimization
<img src="image.jpg" loading="lazy" />

// Service worker caching
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst()
);
```

### CDN Configuration
```nginx
# Nginx caching
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /media/ {
    expires 30d;
    add_header Cache-Control "public";
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          python manage.py test
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to AWS
        run: |
          eb deploy agritrace-prod
```

---

## 📈 Scaling Strategy

### Horizontal Scaling
- **Load Balancer:** AWS ELB or Nginx
- **Multiple App Servers:** Auto-scaling groups
- **Database Replication:** Master-slave setup
- **Redis Cluster:** For distributed caching

### Vertical Scaling
- **Upgrade Server:** Increase CPU/RAM
- **Database Optimization:** Query tuning, indexing
- **CDN:** CloudFront for static assets

---

## 💾 Backup Strategy

### Database Backups
```bash
# Daily automated backups
0 2 * * * pg_dump agritrace > /backups/agritrace_$(date +\%Y\%m\%d).sql

# Backup to S3
aws s3 cp /backups/agritrace_$(date +\%Y\%m\%d).sql s3://agritrace-backups/
```

### Application Backups
```bash
# Code repository: GitHub (automatic)
# Media files: S3 versioning enabled
# Configuration: Encrypted in AWS Secrets Manager
```

---

## 🎯 Deployment Timeline

| Week | Activity | Status |
|------|----------|--------|
| 8 | Setup staging environment | Pending |
| 8 | Deploy to staging | Pending |
| 9 | Internal testing | Pending |
| 9 | Bug fixes and optimization | Pending |
| 10 | Setup production environment | Pending |
| 10 | Deploy to production | Pending |
| 11 | Pilot user onboarding | Pending |
| 11 | Monitor and support | Pending |
| 12 | Performance tuning | Pending |
| 12 | Final documentation | Pending |

---

## 📞 Support & Maintenance

### Support Channels
- **Email:** support@agritrace.rw
- **Phone:** +250 780 866 714
- **Hours:** Monday-Friday, 8AM-6PM (EAT)

### Maintenance Windows
- **Weekly:** Sunday 2AM-4AM (EAT)
- **Monthly:** First Sunday of month, 2AM-6AM

### SLA Targets
- **Uptime:** 99.5%
- **Response Time:** < 200ms
- **Support Response:** < 4 hours

---

**Deployment Plan Version:** 1.0  
**Last Updated:** October 1, 2025  
**Status:** Ready for Implementation 🚀
