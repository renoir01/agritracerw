import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      
      <main className="App-main">
        <Outlet />
      </main>
      
      <footer className="App-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AGRITRACE</h3>
              <p>Blockchain-Based Traceability for Biofortified Crops in Rwanda</p>
              <p style={{ marginTop: '15px' }}>
                <strong>📞 Support:</strong> +250 780 866 714<br />
                <strong>📧 Email:</strong> r.kaze@alustudent.com<br />
                <strong>📍 Location:</strong> Kigali, Rwanda
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/verify">Verify Product</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/help">Help Center</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect With Us</h4>
              <p>Follow us on social media for updates</p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '24px' }}>
                <a href="https://twitter.com/agritrace" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
                <a href="https://facebook.com/agritrace" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
                <a href="https://linkedin.com/company/agritrace" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
                <a href="https://instagram.com/agritrace" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AGRITRACE. All rights reserved. | Empowering Rwanda's Agricultural Supply Chain</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
