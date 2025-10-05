# AGRITRACE - Administrator Guide

## 🔐 Administrator Login

Administrators use the **same login page** as regular users but have additional privileges and access to more features.

### Login URL
```
http://localhost:3001/login
```

## 👤 Creating an Administrator Account

### Method 1: Using Django Admin (Recommended)

1. **Create a superuser** (first time setup):
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
python manage.py createsuperuser
```

Follow the prompts:
- **Username**: admin (or your choice)
- **Email**: r.kaze@alustudent.com
- **Password**: (choose a strong password)

2. **Access Django Admin Panel**:
```
http://localhost:8000/admin/
```

3. **Create Additional Admins**:
   - Login to Django Admin
   - Go to "Users"
   - Click "Add User"
   - Fill in details:
     - Username: (e.g., admin_renoir)
     - Password: (strong password)
     - User type: **Administrator**
     - Is staff: ✓ (checked)
     - Is superuser: ✓ (checked for full access)

### Method 2: Using Registration Page

1. **Register normally** at `http://localhost:3001/register`
2. **Fill in the form**:
   - Username: admin_username
   - Email: r.kaze@alustudent.com
   - Password: (strong password)
   - **User Type**: Select **"Administrator"**
   - Phone: +250 780 866 714
   - Other details as required

3. **Upgrade to superuser** (via Django shell):
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
python manage.py shell
```

Then run:
```python
from users.models import User
user = User.objects.get(username='admin_username')
user.is_staff = True
user.is_superuser = True
user.save()
print(f"User {user.username} is now a superuser!")
exit()
```

## 🎯 Administrator Features

### Frontend Access (React App)
After logging in as an administrator, you have access to:

1. **Dashboard** - Overview of all system activity
2. **Products** - View, create, edit all products
3. **Transactions** - Monitor all transactions
4. **Analytics** - System-wide analytics and reports
5. **User Management** - View user activities
6. **Supply Chain** - Track all supply chains
7. **Verification** - Verify any product

### Backend Access (Django Admin)
Administrators with `is_staff=True` can access:

```
http://localhost:8000/admin/
```

Features:
- **User Management**: Create, edit, delete users
- **Product Management**: Manage all products
- **Transaction Management**: View and manage transactions
- **Batch Management**: Manage crop batches
- **Certification Management**: Approve certifications
- **Location Management**: Manage locations
- **System Settings**: Configure system parameters

## 🔑 Default Admin Credentials (For Testing)

After running migrations, you can create a test admin:

**Username**: admin  
**Email**: r.kaze@alustudent.com  
**Password**: (set during createsuperuser)  
**User Type**: Administrator  
**Phone**: +250 780 866 714

## 📊 Administrator Privileges

### User Types Hierarchy
1. **Administrator** (Highest)
   - Full system access
   - User management
   - System configuration
   - All CRUD operations

2. **Seed Producer**
   - Register seed batches
   - Track seed distribution

3. **Farmer**
   - Register products
   - View own products
   - Create transactions

4. **Trader/Aggregator**
   - Purchase from farmers
   - Sell to processors
   - Track inventory

5. **Processor/Retailer**
   - Process products
   - Sell to consumers
   - Quality control

6. **Consumer** (Lowest)
   - Verify products
   - View product history
   - Read-only access

## 🛡️ Security Best Practices

### For Administrators:

1. **Strong Passwords**:
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Example: `Admin@2024!Secure`

2. **Two-Factor Authentication** (Future):
   - Enable 2FA when available
   - Use authenticator app

3. **Regular Password Changes**:
   - Change password every 90 days
   - Don't reuse old passwords

4. **Secure Access**:
   - Only login from trusted devices
   - Always logout after use
   - Don't share credentials

5. **Monitor Activity**:
   - Check user activity logs regularly
   - Review system changes
   - Audit transactions

## 🔧 Administrator Tasks

### Daily Tasks:
- [ ] Review new user registrations
- [ ] Monitor product verifications
- [ ] Check system health
- [ ] Review flagged transactions

### Weekly Tasks:
- [ ] Generate analytics reports
- [ ] Review user feedback
- [ ] Update system documentation
- [ ] Backup database

### Monthly Tasks:
- [ ] Security audit
- [ ] Performance review
- [ ] User training sessions
- [ ] System updates

## 📱 Admin Contact Information

**Primary Admin**: Renoir KAZE  
**Email**: r.kaze@alustudent.com  
**Phone**: +250 780 866 714  
**Location**: Kigali, Rwanda

## 🚨 Emergency Procedures

### If Admin Account is Locked:

1. **Reset via Django Shell**:
```bash
python manage.py shell
```

```python
from users.models import User
user = User.objects.get(username='admin')
user.set_password('NewSecurePassword123!')
user.save()
```

2. **Create New Superuser**:
```bash
python manage.py createsuperuser
```

### If Database is Corrupted:

1. **Backup current database**:
```bash
copy db.sqlite3 db.sqlite3.backup
```

2. **Restore from backup** or **recreate**:
```bash
del db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

## 📖 Quick Reference

### Create Admin User
```bash
python manage.py createsuperuser
```

### Access Django Admin
```
http://localhost:8000/admin/
```

### Access React Admin Dashboard
```
http://localhost:3001/dashboard
```

### Check User Permissions
```python
from users.models import User
user = User.objects.get(username='admin')
print(f"Is Staff: {user.is_staff}")
print(f"Is Superuser: {user.is_superuser}")
print(f"User Type: {user.user_type}")
```

### Grant Admin Rights
```python
from users.models import User
user = User.objects.get(username='username')
user.user_type = 'admin'
user.is_staff = True
user.is_superuser = True
user.save()
```

## 🎓 Training Resources

### For New Administrators:

1. **System Overview** - Understanding AGRITRACE architecture
2. **User Management** - Creating and managing users
3. **Product Management** - Registering and tracking products
4. **Blockchain Basics** - Understanding verification
5. **Analytics** - Generating reports
6. **Troubleshooting** - Common issues and solutions

### Documentation:
- User Manual: `/docs/user-manual.pdf`
- API Documentation: `http://localhost:8000/api/docs/`
- Video Tutorials: Coming soon

## 📞 Support

For administrator support:

**Email**: r.kaze@alustudent.com  
**Phone**: +250 780 866 714  
**Hours**: Monday - Friday, 8:00 AM - 6:00 PM (EAT)

---

**Last Updated**: October 1, 2025  
**Version**: 1.0.0
