# 🗄️ AGRITRACE - Database Schema Documentation

## Database Overview

**Database Type**: SQLite (Development) / PostgreSQL (Production)
**ORM**: Django ORM
**Migrations**: Managed via Django migrations

---

## Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id (PK)         │
│ username        │
│ email           │
│ password        │
│ first_name      │
│ last_name       │
│ phone_number    │
│ user_type       │◄────┐
│ location        │     │
│ is_verified     │     │
│ created_at      │     │
└─────────────────┘     │
         │              │
         │ owns         │
         │              │
         ▼              │
┌─────────────────┐     │
│    Product      │     │
├─────────────────┤     │
│ id (PK)         │     │
│ owner_id (FK)   │─────┘
│ product_name    │
│ variety         │
│ quantity        │
│ unit            │
│ harvest_date    │
│ qr_code         │◄────┐
│ biofortified    │     │
│ blockchain_hash │     │
│ created_at      │     │
└─────────────────┘     │
         │              │
         │ involves     │
         │              │
         ▼              │
┌─────────────────┐     │
│  Transaction    │     │
├─────────────────┤     │
│ id (PK)         │     │
│ product_id (FK) │─────┘
│ sender_id (FK)  │─────┐
│ receiver_id(FK) │     │
│ quantity        │     │
│ unit_price      │     │
│ total_price     │     │
│ transaction_type│     │
│ transaction_hash│     │
│ blockchain_hash │     │
│ timestamp       │     │
└─────────────────┘     │
         │              │
         │              │
         ▼              │
┌─────────────────┐     │
│   SeedBatch     │     │
├─────────────────┤     │
│ id (PK)         │     │
│ producer_id(FK) │─────┘
│ variety         │
│ quantity        │
│ certification_no│
│ production_date │
│ qr_code         │
│ blockchain_hash │
│ created_at      │
└─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│   Location      │
├─────────────────┤
│ id (PK)         │
│ province        │
│ district        │
│ sector          │
│ cell            │
│ village         │
│ latitude        │
│ longitude       │
└─────────────────┘
```

---

## Table Definitions

### 1. users_user (Custom User Model)

**Purpose**: Store user account information for all stakeholder types

```sql
CREATE TABLE users_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    phone_number VARCHAR(20) UNIQUE,
    user_type VARCHAR(20) NOT NULL,
    -- farmer, trader, processor, consumer, seed_producer, admin
    national_id VARCHAR(20),
    location_id INTEGER,
    is_verified BOOLEAN DEFAULT FALSE,
    preferred_language VARCHAR(5) DEFAULT 'rw',
    -- rw, en, fr
    data_consent BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE,
    is_superuser BOOLEAN DEFAULT FALSE,
    date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (location_id) REFERENCES users_location(id)
);

-- Indexes
CREATE INDEX idx_user_type ON users_user(user_type);
CREATE INDEX idx_phone_number ON users_user(phone_number);
CREATE INDEX idx_is_verified ON users_user(is_verified);
```

**User Types**:
- `farmer`: Agricultural producers
- `trader`: Crop buyers and sellers
- `processor`: Food processing companies
- `consumer`: End consumers
- `seed_producer`: Seed suppliers
- `admin`: System administrators

---

### 2. products_product

**Purpose**: Store agricultural product information

```sql
CREATE TABLE products_product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    variety VARCHAR(200),
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    harvest_date DATE,
    planting_date DATE,
    qr_code VARCHAR(100) UNIQUE NOT NULL,
    biofortified BOOLEAN DEFAULT FALSE,
    certification_number VARCHAR(100),
    description TEXT,
    blockchain_hash VARCHAR(255),
    status VARCHAR(20) DEFAULT 'available',
    -- available, sold, processing, consumed
    location_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users_user(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES users_location(id)
);

-- Indexes
CREATE INDEX idx_product_owner ON products_product(owner_id);
CREATE INDEX idx_product_qr ON products_product(qr_code);
CREATE INDEX idx_product_biofortified ON products_product(biofortified);
CREATE INDEX idx_product_status ON products_product(status);
```

**Product Status Values**:
- `available`: Ready for sale
- `sold`: Sold to buyer
- `processing`: Being processed
- `consumed`: Consumed by end user

---

### 3. transactions_transaction

**Purpose**: Record product ownership transfers and trades

```sql
CREATE TABLE transactions_transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    unit_price DECIMAL(10, 2),
    total_price DECIMAL(12, 2),
    transaction_type VARCHAR(20) NOT NULL,
    -- sale, transfer, processing, distribution
    transaction_hash VARCHAR(255) UNIQUE NOT NULL,
    blockchain_hash VARCHAR(255),
    notes TEXT,
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending',
    -- pending, completed, failed
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users_user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users_user(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_transaction_product ON transactions_transaction(product_id);
CREATE INDEX idx_transaction_sender ON transactions_transaction(sender_id);
CREATE INDEX idx_transaction_receiver ON transactions_transaction(receiver_id);
CREATE INDEX idx_transaction_type ON transactions_transaction(transaction_type);
CREATE INDEX idx_transaction_timestamp ON transactions_transaction(timestamp);
```

**Transaction Types**:
- `sale`: Product sale
- `transfer`: Ownership transfer
- `processing`: Sent for processing
- `distribution`: Distribution to retailer/consumer

---

### 4. products_seedbatch

**Purpose**: Track seed production and distribution

```sql
CREATE TABLE products_seedbatch (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producer_id INTEGER NOT NULL,
    variety VARCHAR(200) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    certification_number VARCHAR(100),
    germination_rate DECIMAL(5, 2),
    production_date DATE,
    expiry_date DATE,
    qr_code VARCHAR(100) UNIQUE NOT NULL,
    biofortified BOOLEAN DEFAULT FALSE,
    blockchain_hash VARCHAR(255),
    status VARCHAR(20) DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES users_user(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_seedbatch_producer ON products_seedbatch(producer_id);
CREATE INDEX idx_seedbatch_qr ON products_seedbatch(qr_code);
CREATE INDEX idx_seedbatch_variety ON products_seedbatch(variety);
```

---

### 5. users_location

**Purpose**: Store geographic location data

```sql
CREATE TABLE users_location (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    province VARCHAR(100),
    district VARCHAR(100),
    sector VARCHAR(100),
    cell VARCHAR(100),
    village VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_location_province ON users_location(province);
CREATE INDEX idx_location_district ON users_location(district);
```

**Rwanda Administrative Divisions**:
- Province (5 provinces)
- District (30 districts)
- Sector
- Cell
- Village

---

### 6. blockchain_block

**Purpose**: Store blockchain blocks

```sql
CREATE TABLE blockchain_block (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    index INTEGER UNIQUE NOT NULL,
    timestamp DATETIME NOT NULL,
    data TEXT NOT NULL,
    previous_hash VARCHAR(255) NOT NULL,
    hash VARCHAR(255) UNIQUE NOT NULL,
    nonce INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_block_hash ON blockchain_block(hash);
CREATE INDEX idx_block_index ON blockchain_block(index);
```

---

### 7. analytics_metric

**Purpose**: Store analytics and statistics

```sql
CREATE TABLE analytics_metric (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_type VARCHAR(50) NOT NULL,
    -- user_count, product_count, transaction_count, etc.
    metric_value DECIMAL(15, 2) NOT NULL,
    user_type VARCHAR(20),
    date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_metric_type ON analytics_metric(metric_type);
CREATE INDEX idx_metric_date ON analytics_metric(date);
```

---

## Relationships

### One-to-Many Relationships

1. **User → Products**
   - One user can own many products
   - `products_product.owner_id` → `users_user.id`

2. **User → Transactions (as sender)**
   - One user can initiate many transactions
   - `transactions_transaction.sender_id` → `users_user.id`

3. **User → Transactions (as receiver)**
   - One user can receive many transactions
   - `transactions_transaction.receiver_id` → `users_user.id`

4. **Product → Transactions**
   - One product can have many transactions
   - `transactions_transaction.product_id` → `products_product.id`

5. **User → SeedBatches**
   - One seed producer can produce many seed batches
   - `products_seedbatch.producer_id` → `users_user.id`

### Many-to-One Relationships

1. **User → Location**
   - Many users can belong to one location
   - `users_user.location_id` → `users_location.id`

2. **Product → Location**
   - Many products can originate from one location
   - `products_product.location_id` → `users_location.id`

---

## Sample Queries

### Get all products by a farmer
```sql
SELECT p.*, u.username, u.first_name, u.last_name
FROM products_product p
JOIN users_user u ON p.owner_id = u.id
WHERE u.user_type = 'farmer'
AND u.id = 1;
```

### Get transaction history for a product
```sql
SELECT t.*, 
       s.username as sender_name,
       r.username as receiver_name
FROM transactions_transaction t
JOIN users_user s ON t.sender_id = s.id
JOIN users_user r ON t.receiver_id = r.id
WHERE t.product_id = 1
ORDER BY t.timestamp DESC;
```

### Get total biofortified products by province
```sql
SELECT l.province, COUNT(p.id) as product_count
FROM products_product p
JOIN users_location l ON p.location_id = l.id
WHERE p.biofortified = TRUE
GROUP BY l.province;
```

---

## Data Integrity Constraints

### Primary Keys
- Auto-incrementing integer IDs for all tables
- Ensures unique record identification

### Foreign Keys
- Cascading deletes where appropriate
- Referential integrity enforced

### Unique Constraints
- Username, email, phone_number (users)
- QR codes (products, seed batches)
- Transaction hashes

### Check Constraints
```python
# Django model constraints
class Product(models.Model):
    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(quantity__gt=0),
                name='quantity_positive'
            )
        ]
```

---

## Database Migrations

All schema changes are managed through Django migrations:

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# View migration SQL
python manage.py sqlmigrate app_name migration_number
```

---

## Performance Considerations

### Indexes
- Strategic indexes on frequently queried columns
- Composite indexes for common query patterns

### Query Optimization
- Use select_related() for foreign keys
- Use prefetch_related() for reverse foreign keys
- Limit query result sets

### Denormalization (where needed)
- Cached aggregate values
- Pre-calculated statistics

---

## Backup Strategy

### Development
- SQLite file backup
- Daily automated backups

### Production
- PostgreSQL continuous archiving
- Point-in-time recovery
- Regular full backups
- Transaction log backups

---

## Security

### Password Storage
- PBKDF2 algorithm with SHA256 hash
- Unique salt per password
- 260,000 iterations

### Data Encryption
- Sensitive data encrypted at rest
- SSL/TLS for data in transit

### Access Control
- Row-level security for sensitive data
- Role-based database permissions

---

## Conclusion

The AGRITRACE database schema is designed for:
- ✅ Scalability (handles growth)
- ✅ Integrity (enforced constraints)
- ✅ Performance (optimized queries)
- ✅ Traceability (complete audit trail)
- ✅ Flexibility (extensible design)
