# Admin User Not Showing "Users" Link - Debugging Guide

## 🔍 **Possible Issues:**

### 1. **Backend Not Running**
The most likely issue! If Django backend isn't running, you can't login properly.

**Solution:**
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

---

### 2. **User Type Mismatch**
The navigation checks for `user?.user_type === 'admin'` (lowercase).

**Check your user object in browser console:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `localStorage.getItem('user')`
4. Check if `user_type` is `'admin'` (lowercase)

**Expected:**
```json
{
  "id": 1,
  "username": "renoir01",
  "email": "r.kaze@alustudent.com",
  "user_type": "admin",  ← Must be lowercase "admin"
  "first_name": "kaz",
  "last_name": "renoi"
}
```

---

### 3. **Not Logged In**
If you're not logged in, the "Users" link won't show.

**Solution:**
1. Go to http://localhost:3001/login
2. Login with:
   - Username: `renoir01`
   - Password: `Renoir@654`

---

### 4. **User Object Not Loading**
The user object might not be loading from localStorage.

**Check in browser console:**
```javascript
// Check if user is in localStorage
console.log(JSON.parse(localStorage.getItem('user')));

// Check if user_type is correct
const user = JSON.parse(localStorage.getItem('user'));
console.log('User type:', user?.user_type);
console.log('Is admin?', user?.user_type === 'admin');
```

---

## ✅ **Quick Fix Steps:**

### Step 1: Start Backend
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

### Step 2: Login as Admin
1. Go to http://localhost:3001/login
2. Username: `renoir01`
3. Password: `Renoir@654`

### Step 3: Check Navigation
After login, you should see:
- Dashboard
- Verify
- **All Products**
- **Users** ← This should appear!
- Transactions
- Analytics

---

## 🔧 **If Still Not Working:**

### Verify Admin User in Database
```bash
cd e:\agritracerw\backend
.\venv\Scripts\Activate.ps1
python manage.py shell
```

Then run:
```python
from users.models import User

# Check if admin user exists
admin = User.objects.get(username='renoir01')
print(f"Username: {admin.username}")
print(f"User Type: {admin.user_type}")
print(f"Is Staff: {admin.is_staff}")
print(f"Is Superuser: {admin.is_superuser}")

# Should print:
# Username: renoir01
# User Type: admin
# Is Staff: True
# Is Superuser: True
```

### If user_type is wrong, fix it:
```python
from users.models import User

admin = User.objects.get(username='renoir01')
admin.user_type = 'admin'  # lowercase!
admin.save()
print("Fixed! User type is now:", admin.user_type)
```

---

## 🎯 **Expected Behavior:**

### When logged in as Admin, you should see:

**Desktop Navigation:**
```
[AGRITRACE Logo] Dashboard | Verify | All Products | Users | Transactions | Analytics
```

**Mobile Navigation:**
```
☰ Menu
  - Dashboard
  - Verify
  - All Products
  - Users          ← Should be here!
  - Transactions
  - Analytics
  - Profile
  - Logout
```

---

## 📞 **Still Having Issues?**

1. **Clear browser cache and localStorage:**
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage → Clear site data
   - Refresh page

2. **Try a different browser** (Chrome, Edge, Firefox)

3. **Check browser console for errors** (F12 → Console tab)

4. **Verify backend is running:**
   - Go to http://localhost:8000/admin/
   - Should see Django admin login

---

## 🔐 **Admin Credentials:**

**Username:** renoir01  
**Email:** r.kaze@alustudent.com  
**Password:** Renoir@654  
**User Type:** admin  
**Phone:** 0780866714

---

**Most Common Issue:** Backend not running! Start it first! 🚀
