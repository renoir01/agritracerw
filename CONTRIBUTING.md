# Contributing to AGRITRACE

Thank you for your interest in contributing to AGRITRACE! This document provides guidelines for contributing to the project.

## Code of Conduct

This project is part of an academic research initiative focused on improving agricultural traceability in Rwanda. All contributors are expected to:

- Be respectful and inclusive
- Focus on constructive feedback
- Prioritize the project's mission: improving food security through technology
- Respect data privacy and ethical considerations

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/agritracerw.git
   cd agritracerw
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Set up development environment** (see SETUP_GUIDE.md)

## Development Guidelines

### Code Style

#### Python (Backend)
- Follow PEP 8 style guide
- Use Black for code formatting
- Use type hints where appropriate
- Write docstrings for all functions and classes

```python
def register_product(qr_code: str, name: str, iron_content: int) -> dict:
    """
    Register a new biofortified product.
    
    Args:
        qr_code: Unique QR code identifier
        name: Product name
        iron_content: Iron content in ppm
    
    Returns:
        Dictionary with registration status
    """
    pass
```

#### JavaScript/React (Frontend)
- Use ESLint configuration
- Follow Airbnb style guide
- Use functional components with hooks
- Write PropTypes or TypeScript types

```javascript
/**
 * Product verification component
 * @param {string} qrCode - QR code to verify
 * @param {function} onVerify - Callback after verification
 */
const ProductVerify = ({ qrCode, onVerify }) => {
  // Component implementation
};
```

#### Solidity (Smart Contracts)
- Follow Solidity style guide
- Use NatSpec comments
- Optimize for gas efficiency
- Include comprehensive tests

```solidity
/**
 * @dev Register a new product on blockchain
 * @param qrCode Unique QR code identifier
 * @param name Product name
 * @param ironContent Iron content in ppm
 */
function registerProduct(
    string memory qrCode,
    string memory name,
    uint256 ironContent
) external onlyVerifiedUser {
    // Implementation
}
```

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(products): add QR code generation

Implement automatic QR code generation for new products
using qrcode library with customizable size and error correction.

Closes #123
```

```
fix(blockchain): handle transaction timeout

Add retry logic and timeout handling for blockchain transactions
to prevent hanging requests.

Fixes #456
```

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

Examples:
- `feature/ussd-menu-system`
- `fix/qr-code-validation`
- `docs/api-documentation`

### Testing Requirements

All contributions must include tests:

#### Backend Tests
```python
# tests/test_products.py
from django.test import TestCase
from products.models import Product

class ProductTestCase(TestCase):
    def test_product_creation(self):
        """Test product creation with valid data"""
        product = Product.objects.create(
            name="Iron-Biofortified Beans",
            iron_content=85,
            biofortified=True
        )
        self.assertEqual(product.name, "Iron-Biofortified Beans")
        self.assertTrue(product.biofortified)
```

#### Frontend Tests
```javascript
// src/components/__tests__/ProductCard.test.js
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

test('renders product name', () => {
  render(<ProductCard name="Iron Beans" />);
  const nameElement = screen.getByText(/Iron Beans/i);
  expect(nameElement).toBeInTheDocument();
});
```

#### Smart Contract Tests
```javascript
// test/AgriTrace.test.js
const AgriTrace = artifacts.require("AgriTrace");

contract("AgriTrace", accounts => {
  it("should register a product", async () => {
    const instance = await AgriTrace.deployed();
    await instance.registerProduct(
      "QR-123",
      "Iron Beans",
      "RWA-001",
      85,
      true,
      1000,
      Date.now(),
      "ipfs-hash"
    );
    const product = await instance.getProduct("QR-123");
    assert.equal(product[0], "Iron Beans");
  });
});
```

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run all tests** locally
   ```bash
   # Backend
   python manage.py test
   
   # Frontend
   npm test
   
   # Blockchain
   truffle test
   ```
4. **Update CHANGELOG.md** with your changes
5. **Create pull request** with clear description
6. **Link related issues** using keywords (Closes #123)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No new warnings

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

## Areas for Contribution

### High Priority
- [ ] API view implementations
- [ ] Frontend page components
- [ ] QR code generation/scanning
- [ ] USSD menu system
- [ ] Analytics visualizations
- [ ] Test coverage improvements

### Medium Priority
- [ ] Documentation improvements
- [ ] Performance optimizations
- [ ] UI/UX enhancements
- [ ] Internationalization (Kinyarwanda translations)
- [ ] Error handling improvements

### Low Priority
- [ ] Additional features
- [ ] Code refactoring
- [ ] Developer tools
- [ ] Example implementations

## Internationalization

When adding user-facing strings:

**Backend (Django):**
```python
from django.utils.translation import gettext_lazy as _

class Product(models.Model):
    name = models.CharField(_('Product Name'), max_length=200)
```

**Frontend (React):**
```javascript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('welcome_message')}</h1>;
}
```

## Security Considerations

- **Never commit sensitive data** (API keys, private keys, passwords)
- **Use environment variables** for configuration
- **Validate all user inputs**
- **Sanitize data** before database operations
- **Follow OWASP guidelines**
- **Report security issues privately** to contact@agritrace.rw

## Documentation

Update documentation when:
- Adding new features
- Changing APIs
- Modifying setup process
- Adding dependencies
- Changing configuration

## Questions?

- **Technical Questions**: Create an issue with `question` label
- **Feature Requests**: Create an issue with `enhancement` label
- **Bug Reports**: Create an issue with `bug` label
- **General Inquiries**: Email contact@agritrace.rw

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Research paper acknowledgments (with permission)
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to AGRITRACE! Your work helps improve food security in Rwanda. 🌾**
