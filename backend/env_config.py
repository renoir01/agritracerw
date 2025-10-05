# Environment configuration for development
import os

# Create .env file if it doesn't exist
env_content = """# Django Settings
SECRET_KEY=django-insecure-dev-key-for-development-only-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Database (SQLite for development)
DATABASE_URL=sqlite:///db.sqlite3

# Redis
REDIS_URL=redis://localhost:6379/0

# Blockchain (Optional for now)
ETHEREUM_NODE_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
ETHEREUM_PRIVATE_KEY=
CONTRACT_ADDRESS=

# IPFS
IPFS_API_URL=http://localhost:5001

# Africa's Talking
AFRICAS_TALKING_USERNAME=sandbox
AFRICAS_TALKING_API_KEY=

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
"""

env_path = os.path.join(os.path.dirname(__file__), '.env')
if not os.path.exists(env_path):
    with open(env_path, 'w') as f:
        f.write(env_content)
    print(f"Created .env file at {env_path}")
else:
    print(".env file already exists")

if __name__ == '__main__':
    # Run this to create .env file
    pass
