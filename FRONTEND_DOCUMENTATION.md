# 🎨 AGRITRACE - Frontend Development Documentation

## User Interface Design Process

### Design Philosophy
AGRITRACE's frontend is designed with **rural farmers and agricultural stakeholders** in mind, prioritizing:
- **Simplicity**: Clean, intuitive interfaces
- **Accessibility**: Works on low-end devices
- **Multi-language**: English, Kinyarwanda, French
- **Mobile-first**: Responsive design for all screen sizes

---

## 1. Wireframes & Design Process

### Initial Wireframes
The design process followed these stages:

**Stage 1: User Research**
- Identified target users: Farmers, Traders, Processors, Consumers
- Analyzed agricultural workflow in Rwanda
- Considered literacy levels and tech familiarity

**Stage 2: Low-Fidelity Wireframes**
- Sketched basic layouts for key screens
- Focused on simple navigation flow
- Prioritized essential features

**Stage 3: High-Fidelity Mockups**
- Created detailed designs with branding
- Established color palette and typography
- Designed interactive components

---

## 2. Style Guide

### Color Palette
```css
/* Primary Colors - Agricultural Theme */
--primary-green: #2E7D32;      /* Main brand color */
--primary-dark: #1B5E20;        /* Darker shade */
--primary-light: #4CAF50;       /* Lighter shade */

/* Secondary Colors */
--secondary-orange: #FF9800;    /* Highlights, CTAs */
--secondary-yellow: #FFC107;    /* Warnings, notifications */

/* Neutral Colors */
--background: #FFFFFF;          /* Main background */
--surface: #F5F5F5;             /* Cards, surfaces */
--text-primary: #212121;        /* Main text */
--text-secondary: #757575;      /* Secondary text */

/* Status Colors */
--success: #4CAF50;             /* Success messages */
--error: #F44336;               /* Error messages */
--warning: #FF9800;             /* Warnings */
--info: #2196F3;                /* Information */
```

### Typography
```css
/* Font Family */
font-family: 'Roboto', 'Arial', sans-serif;

/* Font Sizes */
--font-size-h1: 36px;           /* Page titles */
--font-size-h2: 28px;           /* Section headings */
--font-size-h3: 22px;           /* Subsections */
--font-size-body: 16px;         /* Body text */
--font-size-small: 14px;        /* Labels, captions */

/* Font Weights */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

### Spacing System
```css
/* 8px grid system */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-xxl: 48px;
```

---

## 3. Key Frontend Components

### 3.1 Navigation Bar
**Purpose**: Consistent navigation across all pages

**Features**:
- Logo and app name
- User role badge
- Language selector
- Profile dropdown
- Logout button

**Code Snippet** (React):
```jsx
const Navbar = () => {
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">🌾</span>
        <h1>AGRITRACE</h1>
      </div>
      
      <div className="navbar-actions">
        <LanguageSelector />
        <UserBadge role={user.userType} />
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};
```

### 3.2 Dashboard Cards
**Purpose**: Display key metrics and statistics

**Features**:
- Icon representing metric
- Large numeric value
- Descriptive label
- Color-coded by category

**Code Snippet** (React):
```jsx
const StatCard = ({ icon, value, label, color }) => {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};
```

### 3.3 Product Cards
**Purpose**: Display product information in a scannable format

**Features**:
- Product image
- QR code thumbnail
- Product name and variety
- Biofortified badge
- Action buttons

**Code Snippet** (React):
```jsx
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.productName}</h3>
        {product.biofortified && (
          <span className="badge badge-biofortified">
            🌟 Biofortified
          </span>
        )}
      </div>
      
      <div className="product-details">
        <p><strong>Variety:</strong> {product.variety}</p>
        <p><strong>Quantity:</strong> {product.quantity} kg</p>
        <img src={product.qrCodeUrl} alt="QR Code" />
      </div>
      
      <div className="product-actions">
        <button>View Details</button>
        <button>Track History</button>
      </div>
    </div>
  );
};
```

---

## 4. Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Mobile: 320px - 767px (default) */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { /* Tablet styles */ }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { /* Desktop styles */ }
```

### Grid System
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

---

## 5. DOM Manipulation Examples

### 5.1 Dynamic Form Validation
```javascript
const validateForm = (formData) => {
  const errors = {};
  
  // Real-time validation
  if (!formData.productName || formData.productName.length < 3) {
    errors.productName = 'Product name must be at least 3 characters';
  }
  
  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }
  
  // Update DOM with error messages
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
      errorElement.textContent = errors[field];
      errorElement.style.display = 'block';
    }
  });
  
  return Object.keys(errors).length === 0;
};
```

### 5.2 QR Code Display
```javascript
const displayQRCode = async (productId) => {
  const qrContainer = document.getElementById('qr-container');
  qrContainer.innerHTML = '<div class="loading">Generating QR Code...</div>';
  
  try {
    const response = await fetch(`/api/v1/products/${productId}/qr/`);
    const data = await response.json();
    
    qrContainer.innerHTML = `
      <img src="${data.qr_code_url}" alt="Product QR Code" />
      <button onclick="downloadQR('${data.qr_code_url}')">
        Download QR Code
      </button>
    `;
  } catch (error) {
    qrContainer.innerHTML = '<div class="error">Failed to generate QR code</div>';
  }
};
```

### 5.3 Real-time Search Filter
```javascript
const searchInput = document.getElementById('search-products');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  productCards.forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    const variety = card.querySelector('.variety').textContent.toLowerCase();
    
    if (productName.includes(searchTerm) || variety.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
```

---

## 6. Accessibility Features

### ARIA Labels
```jsx
<button 
  aria-label="Register new product"
  aria-describedby="register-help-text"
>
  Register Product
</button>
```

### Keyboard Navigation
- All interactive elements accessible via Tab
- Enter key submits forms
- Escape key closes modals

### Screen Reader Support
- Semantic HTML elements
- Descriptive alt text for images
- ARIA roles for dynamic content

---

## 7. Performance Optimizations

### Code Splitting
```javascript
// Lazy load heavy components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductList = lazy(() => import('./pages/ProductList'));
```

### Image Optimization
- WebP format for modern browsers
- Lazy loading for images below fold
- Responsive images with srcset

### CSS Optimization
- Minified CSS in production
- Critical CSS inlined
- Unused CSS removed

---

## 8. Screenshots of Key Interfaces

*Include in `/designs/screenshots/` folder:*
1. Landing Page
2. Login Screen
3. Registration Form
4. Dashboard (Farmer view)
5. Product List
6. Product Registration
7. QR Code Generation
8. Product Verification
9. Transaction History
10. Analytics Dashboard

---

## 9. User Flow Diagrams

### Registration Flow
```
Landing Page → Register Button → 
  → Choose User Type → 
  → Fill Form → 
  → Submit → 
  → Email Verification (optional) → 
  → Login
```

### Product Registration Flow
```
Dashboard → Register Product → 
  → Fill Product Details → 
  → Upload Images (optional) → 
  → Generate QR Code → 
  → Save to Blockchain → 
  → View Product
```

---

## 10. Tools & Technologies

### Frontend Stack
- **Framework**: React 18.x
- **Styling**: CSS3, Flexbox, Grid
- **State Management**: Context API
- **Routing**: React Router v6
- **Icons**: React Icons
- **Charts**: Chart.js
- **QR Codes**: qrcode.react
- **HTTP Client**: Axios

### Development Tools
- **Package Manager**: npm
- **Bundler**: Webpack (via Create React App)
- **Linter**: ESLint
- **Formatter**: Prettier
- **Version Control**: Git

---

## Conclusion

The AGRITRACE frontend demonstrates:
- ✅ Clean, user-centered design
- ✅ Responsive across all devices
- ✅ Accessible to diverse user groups
- ✅ Performance-optimized
- ✅ Maintainable and scalable codebase
