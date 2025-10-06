import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="logo-icon">🌾</span>
          AGRITRACE
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links desktop-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/verify" className="nav-link">Verify</Link>
              
              {/* Seed Producer specific */}
              {user?.user_type === 'seed_producer' && (
                <>
                  <Link to="/seed-batches" className="nav-link">Seed Batches</Link>
                  <Link to="/seed-inventory" className="nav-link">Inventory</Link>
                </>
              )}
              
              {/* Farmer specific */}
              {user?.user_type === 'farmer' && (
                <>
                  <Link to="/farm-management" className="nav-link">My Farm</Link>
                  <Link to="/products/register" className="nav-link">Register Product</Link>
                  <Link to="/products" className="nav-link">My Products</Link>
                </>
              )}
              
              {/* Trader specific */}
              {user?.user_type === 'trader' && (
                <>
                  <Link to="/buy-from-farmers" className="nav-link">Buy</Link>
                  <Link to="/trader-inventory" className="nav-link">Inventory</Link>
                </>
              )}
              
              {/* Processor specific */}
              {user?.user_type === 'processor' && (
                <>
                  <Link to="/processing-records" className="nav-link">Processing</Link>
                  <Link to="/products" className="nav-link">Products</Link>
                </>
              )}
              
              {/* Consumer specific */}
              {user?.user_type === 'consumer' && (
                <Link to="/purchase-history" className="nav-link">My Purchases</Link>
              )}
              
              {/* Admin specific */}
              {user?.user_type === 'admin' && (
                <>
                  <Link to="/products" className="nav-link">All Products</Link>
                  <Link to="/users" className="nav-link">Users</Link>
                </>
              )}
              
              {/* Show Transactions for all except Consumer */}
              {user?.user_type !== 'consumer' && (
                <Link to="/transactions" className="nav-link">Transactions</Link>
              )}
              
              {/* Show Analytics for all except Consumer */}
              {user?.user_type !== 'consumer' && (
                <Link to="/analytics" className="nav-link">Analytics</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/verify" className="nav-link">Verify</Link>
            </>
          )}
        </div>

        {/* User Menu */}
        <div className="navbar-actions desktop-menu">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">
                Hello, {user?.first_name || user?.username}
              </span>
              <Link to="/profile" className="btn btn-sm btn-secondary">
                Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-sm btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/verify" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Verify
                </Link>
                
                {/* Seed Producer specific */}
                {user?.user_type === 'seed_producer' && (
                  <>
                    <Link to="/seed-batches" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Seed Batches
                    </Link>
                    <Link to="/seed-inventory" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Inventory
                    </Link>
                  </>
                )}
                
                {/* Farmer specific */}
                {user?.user_type === 'farmer' && (
                  <>
                    <Link to="/farm-management" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      My Farm
                    </Link>
                    <Link to="/products/register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Register Product
                    </Link>
                    <Link to="/products" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      My Products
                    </Link>
                  </>
                )}
                
                {/* Trader specific */}
                {user?.user_type === 'trader' && (
                  <>
                    <Link to="/buy-from-farmers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Buy from Farmers
                    </Link>
                    <Link to="/trader-inventory" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      My Inventory
                    </Link>
                  </>
                )}
                
                {/* Processor specific */}
                {user?.user_type === 'processor' && (
                  <>
                    <Link to="/processing-records" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Processing
                    </Link>
                    <Link to="/products" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Products
                    </Link>
                  </>
                )}
                
                {/* Consumer specific */}
                {user?.user_type === 'consumer' && (
                  <Link to="/purchase-history" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    My Purchases
                  </Link>
                )}
                
                {/* Admin specific */}
                {user?.user_type === 'admin' && (
                  <>
                    <Link to="/products" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      All Products
                    </Link>
                    <Link to="/users" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Users
                    </Link>
                  </>
                )}
                
                {/* Show Transactions for all except Consumer */}
                {user?.user_type !== 'consumer' && (
                  <Link to="/transactions" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    Transactions
                  </Link>
                )}
                
                {/* Show Analytics for all except Consumer */}
                {user?.user_type !== 'consumer' && (
                  <Link to="/analytics" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    Analytics
                  </Link>
                )}
                
                <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="mobile-nav-link" style={{ width: '100%', textAlign: 'left' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/verify" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Verify
                </Link>
                <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .navbar {
          background: var(--primary-color);
          color: white;
          padding: 0.75rem 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 0 20px;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.3s;
        }

        .navbar-brand:hover {
          opacity: 0.9;
        }

        .logo-icon {
          font-size: 1.8rem;
        }

        .navbar-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-weight: 500;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        .navbar-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .user-menu {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .user-greeting {
          margin-right: 0.5rem;
          font-weight: 500;
          color: rgba(255,255,255,0.95);
        }

        .btn-sm {
          padding: 0.5rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 6px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid white;
          color: white;
        }

        .btn-outline:hover {
          background: white;
          color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .btn-secondary {
          background: var(--secondary-color);
          border: 2px solid var(--secondary-color);
          color: white;
        }

        .btn-secondary:hover {
          background: var(--secondary-dark);
          border-color: var(--secondary-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .mobile-menu-btn {
          display: none;
          background: rgba(255,255,255,0.1);
          border: 2px solid white;
          border-radius: 6px;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }

        .mobile-menu {
          display: none;
        }

        .desktop-menu {
          display: flex;
        }

        @media (max-width: 1024px) {
          .navbar-links {
            gap: 0.25rem;
          }
          
          .nav-link {
            padding: 0.4rem 0.75rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu {
            display: flex;
            flex-direction: column;
            padding: 1rem 0;
            margin-top: 1rem;
            border-top: 2px solid rgba(255,255,255,0.2);
            width: 100%;
          }

          .mobile-nav-link {
            color: white;
            text-decoration: none;
            padding: 0.75rem 1rem;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .mobile-nav-link:hover {
            background: rgba(255,255,255,0.15);
            transform: translateX(5px);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
