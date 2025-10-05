# Quick Administrator Setup Guide

## 🚀 Create Your First Admin User (3 Easy Steps)

### Step 1: Open Terminal in Backend Directory
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
```

### Step 2: Run the Admin Creation Script
```bash
python create_admin.py
```

### Step 3: Follow the Prompts
```
Username: admin (or your choice)
Email: r.kaze@alustudent.com
First Name: Renoir
Last Name: KAZE
Phone: +250780866714
Password: (enter a strong password, min 8 characters)
```

## ✅ Done! Now Login

### Option 1: React App (Main Interface)
1. Go to: http://localhost:3001/login
2. Enter your username and password
3. Access full dashboard and features

### Option 2: Django Admin (Backend Management)
1. Go to: http://localhost:8000/admin/
2. Enter your username and password
3. Manage users, products, and system settings

## 🔑 Default Credentials (Recommended)

**Username**: admin  
**Email**: r.kaze@alustudent.com  
**Password**: (choose a strong one!)  
**Phone**: +250 780 866 714  
**User Type**: Administrator

## 📋 What Administrators Can Do

### In React App (Frontend):
- ✅ View all products and transactions
- ✅ Register new products
- ✅ Verify products via QR scanner
- ✅ Access analytics dashboard
- ✅ View supply chain tracking
- ✅ Manage profile

### In Django Admin (Backend):
- ✅ Create/edit/delete users
- ✅ Manage all products
- ✅ View all transactions
- ✅ Approve certifications
- ✅ Configure system settings
- ✅ Export data

## 🆘 Troubleshooting

### "User already exists" Error
The admin user is already created. To reset password:
```bash
python create_admin.py
# Choose "yes" when asked to reset password
```

### "Module not found" Error
Make sure virtual environment is activated:
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
```

### "Database not found" Error
Run migrations first:
```bash
python manage.py migrate
```

## 🔐 Security Tips

1. **Use a strong password**: Mix uppercase, lowercase, numbers, and symbols
2. **Don't share credentials**: Each admin should have their own account
3. **Change password regularly**: Update every 90 days
4. **Logout when done**: Always logout from shared computers

## 📞 Need Help?

**Contact**: Renoir KAZE  
**Email**: r.kaze@alustudent.com  
**Phone**: +250 780 866 714

---

**Quick Reference**:
- React Login: http://localhost:3001/login
- Django Admin: http://localhost:8000/admin/
- Create Admin: `python create_admin.py`
