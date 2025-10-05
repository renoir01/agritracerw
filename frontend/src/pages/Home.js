import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>🌾 AGRITRACE</h1>
          <p style={{ fontSize: '24px', marginBottom: '10px' }}>
            Blockchain-Based Traceability for Biofortified Crops in Rwanda
          </p>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '30px' }}>
            Ensuring food security through transparent, traceable, and nutritious agricultural supply chains
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '18px' }}>
                  Get Started Free
                </Link>
                <Link to="/verify" className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '18px' }}>
                  Verify Product
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '18px' }}>
                  Go to Dashboard
                </Link>
                <Link to="/verify" className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '18px' }}>
                  Verify Product
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '40px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary-color)' }}>100%</div>
              <div style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Traceable</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary-color)' }}>🔗</div>
              <div style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Blockchain Secured</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary-color)' }}>24/7</div>
              <div style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Available</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary-color)' }}>🇷🇼</div>
              <div style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Made in Rwanda</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '36px' }}>Why Choose AGRITRACE?</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '18px' }}>
            Empowering Rwanda's agricultural sector with cutting-edge technology
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="card">
              <div className="card-body">
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔗</div>
                <h3 style={{ marginBottom: '10px' }}>Blockchain Verification</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Immutable records ensure product authenticity from seed to consumer. Every transaction is permanently recorded on the blockchain.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📱</div>
                <h3 style={{ marginBottom: '10px' }}>Mobile-First Design</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Access from any device - smartphones, tablets, or computers. Works on feature phones via USSD for maximum accessibility.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌾</div>
                <h3 style={{ marginBottom: '10px' }}>Supply Chain Tracking</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Track biofortified crops through every step - from farm to fork. Complete transparency for all stakeholders.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                <h3 style={{ marginBottom: '10px' }}>QR Code Scanning</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Instant product verification with QR code technology. Scan with your phone camera or enter codes manually.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌍</div>
                <h3 style={{ marginBottom: '10px' }}>Multi-Language Support</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Available in English, Kinyarwanda, and French. Accessible to all Rwandans regardless of language preference.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
                <h3 style={{ marginBottom: '10px' }}>Analytics Dashboard</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Real-time insights and reporting for all stakeholders. Make data-driven decisions to improve your operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--primary-color)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '32px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>1</div>
              <h3 style={{ marginBottom: '10px' }}>Register</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Create your account as a farmer, trader, processor, or consumer
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--primary-color)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '32px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>2</div>
              <h3 style={{ marginBottom: '10px' }}>Record</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Register products with QR codes and record them on the blockchain
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--primary-color)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '32px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>3</div>
              <h3 style={{ marginBottom: '10px' }}>Track</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Monitor products through the supply chain with complete transparency
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--primary-color)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '32px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>4</div>
              <h3 style={{ marginBottom: '10px' }}>Verify</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Consumers scan QR codes to verify product authenticity instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Use */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px' }}>Who Can Use AGRITRACE?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {[
              { icon: '👨‍🌾', title: 'Farmers', desc: 'Register biofortified crops and track sales' },
              { icon: '🚚', title: 'Traders & Aggregators', desc: 'Manage inventory and supply chain' },
              { icon: '🏭', title: 'Processors & Retailers', desc: 'Process products and ensure quality' },
              { icon: '🛒', title: 'Consumers', desc: 'Verify product authenticity and nutrition' },
              { icon: '🌱', title: 'Seed Producers', desc: 'Track seed distribution and quality' },
              { icon: '👔', title: 'Administrators', desc: 'Manage system and monitor operations' }
            ].map((user, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <div style={{ fontSize: '64px', marginBottom: '15px' }}>{user.icon}</div>
                  <h3 style={{ marginBottom: '10px' }}>{user.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '42px', marginBottom: '20px' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.9 }}>
            Join thousands of farmers, traders, and consumers using AGRITRACE to ensure food security in Rwanda
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn" style={{ 
              background: 'white', 
              color: 'var(--primary-color)', 
              padding: '15px 40px', 
              fontSize: '18px',
              border: 'none'
            }}>
              Create Free Account
            </Link>
            <Link to="/contact" className="btn" style={{ 
              background: 'transparent', 
              color: 'white', 
              padding: '15px 40px', 
              fontSize: '18px',
              border: '2px solid white'
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: '40px 0', background: '#f8f9fa' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>Need Help?</h3>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <strong>📞 Phone:</strong> <a href="tel:+250780866714" style={{ color: 'var(--primary-color)' }}>+250 780 866 714</a>
            </div>
            <div>
              <strong>📧 Email:</strong> <a href="mailto:r.kaze@alustudent.com" style={{ color: 'var(--primary-color)' }}>r.kaze@alustudent.com</a>
            </div>
            <div>
              <strong>📍 Location:</strong> Kigali, Rwanda
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
