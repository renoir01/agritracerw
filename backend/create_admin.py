"""
Quick script to create an administrator user for AGRITRACE
Run: python create_admin.py
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agritrace.settings')
django.setup()

from users.models import User

def create_admin():
    """Create an administrator user"""
    
    print("=" * 50)
    print("AGRITRACE - Create Administrator User")
    print("=" * 50)
    print()
    
    # Check if admin already exists
    if User.objects.filter(username='admin').exists():
        print("⚠️  Admin user already exists!")
        response = input("Do you want to reset the password? (yes/no): ")
        if response.lower() != 'yes':
            print("Cancelled.")
            return
        
        user = User.objects.get(username='admin')
        print(f"Resetting password for user: {user.username}")
    else:
        print("Creating new administrator user...")
        print()
        
        # Get user input
        username = input("Username (default: admin): ").strip() or 'admin'
        email = input("Email (default: r.kaze@alustudent.com): ").strip() or 'r.kaze@alustudent.com'
        first_name = input("First Name (default: Admin): ").strip() or 'Admin'
        last_name = input("Last Name (default: User): ").strip() or 'User'
        phone = input("Phone (default: +250780866714): ").strip() or '+250780866714'
        
        # Create user
        user = User.objects.create(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone,
            user_type='admin',
            is_staff=True,
            is_superuser=True,
            is_active=True,
            verified_status=True,
            data_consent=True
        )
    
    # Set password
    print()
    password = input("Enter password (min 8 characters): ").strip()
    
    if len(password) < 8:
        print("❌ Password must be at least 8 characters!")
        return
    
    user.set_password(password)
    user.save()
    
    print()
    print("=" * 50)
    print("✅ Administrator user created successfully!")
    print("=" * 50)
    print()
    print("Login Details:")
    print(f"  Username: {user.username}")
    print(f"  Email: {user.email}")
    print(f"  User Type: Administrator")
    print(f"  Phone: {user.phone_number}")
    print()
    print("Access Points:")
    print("  React App: http://localhost:3001/login")
    print("  Django Admin: http://localhost:8000/admin/")
    print()
    print("🔐 Keep these credentials secure!")
    print()

if __name__ == '__main__':
    try:
        create_admin()
    except KeyboardInterrupt:
        print("\n\nCancelled by user.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure:")
        print("1. Virtual environment is activated")
        print("2. Database migrations are run")
        print("3. You're in the backend directory")
