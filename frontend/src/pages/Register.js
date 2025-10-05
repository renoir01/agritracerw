import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    user_type: 'farmer',
    preferred_language: 'rw',
    data_consent: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!formData.data_consent) {
      setError('You must agree to the data consent policy');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Better error handling
        const errorMessage = result.error?.detail 
          || result.error?.message 
          || JSON.stringify(result.error)
          || 'Registration failed. Please try again.';
        setError(errorMessage);
        console.error('Registration error:', result.error);
      }
    } catch (err) {
      setError('Backend API not running. Please start the Django backend server.');
      console.error('Registration exception:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ maxWidth: '600px', paddingTop: '60px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
            <h2 style={{ color: 'var(--success-color)' }}>Registration Successful!</h2>
            <p>Redirecting to login page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '700px', paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0, textAlign: 'center' }}>Register for AGRITRACE</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '10px' }}>
            Join the blockchain-verified agricultural platform
          </p>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-error">{error}</div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone_number"
                className="form-control"
                placeholder="+250..."
                value={formData.phone_number}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">User Type *</label>
                <select
                  name="user_type"
                  className="form-control"
                  value={formData.user_type}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="farmer">Farmer</option>
                  <option value="trader">Trader/Aggregator</option>
                  <option value="processor">Processor/Retailer</option>
                  <option value="consumer">Consumer</option>
                  <option value="seed_producer">Seed Producer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Language *</label>
                <select
                  name="preferred_language"
                  className="form-control"
                  value={formData.preferred_language}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="rw">Kinyarwanda</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={8}
                />
                <small style={{ color: 'var(--text-secondary)' }}>Min. 8 characters</small>
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="password_confirm"
                  className="form-control"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'start', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="data_consent"
                  checked={formData.data_consent}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ marginTop: '4px' }}
                />
                <span style={{ fontSize: '14px' }}>
                  I agree to the data consent policy and understand that my information will be used for agricultural traceability purposes. *
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
