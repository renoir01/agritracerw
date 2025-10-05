import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement actual password reset API call
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ maxWidth: '500px', paddingTop: '60px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
            <h2>Check Your {method === 'email' ? 'Email' : 'Phone'}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '20px 0' }}>
              {method === 'email' 
                ? `We've sent password reset instructions to ${email}`
                : `We've sent a reset code to ${phone}`
              }
            </p>
            <p style={{ marginBottom: '20px' }}>
              Follow the instructions to reset your password.
            </p>
            <Link to="/login" className="btn btn-primary">
              Back to Login
            </Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Didn't receive it? <button 
              onClick={() => setSuccess(false)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-color)', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '500px', paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="card">
        <div className="card-body">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '64px', marginBottom: '10px' }}>🔐</div>
            <h1>Forgot Password?</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
              No worries! Enter your details below and we'll send you reset instructions.
            </p>
          </div>

          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <button
              className={`btn ${method === 'email' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setMethod('email')}
              style={{ flex: 1 }}
            >
              📧 Email
            </button>
            <button
              className={`btn ${method === 'phone' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setMethod('phone')}
              style={{ flex: 1 }}
            >
              📱 Phone
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {method === 'email' ? (
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '5px' }}>
                  We'll send reset instructions to this email
                </small>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+250 780 866 714"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
                />
                <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '5px' }}>
                  We'll send a reset code via SMS
                </small>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || (method === 'email' ? !email : !phone)}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              Remember your password? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Back to Login</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-body">
          <h4 style={{ marginBottom: '15px' }}>Need Help?</h4>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
            If you're having trouble resetting your password, contact our support team:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <strong>📞 Phone:</strong> <a href="tel:+250780866714" style={{ color: 'var(--primary-color)' }}>+250 780 866 714</a>
            </div>
            <div>
              <strong>📧 Email:</strong> <a href="mailto:r.kaze@alustudent.com" style={{ color: 'var(--primary-color)' }}>r.kaze@alustudent.com</a>
            </div>
            <div>
              <strong>🕐 Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM (EAT)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
