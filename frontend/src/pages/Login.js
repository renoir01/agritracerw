import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Backend API not running. Please start the Django backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0, textAlign: 'center' }}>Login to AGRITRACE</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '10px' }}>
            Access your blockchain-verified agricultural platform
          </p>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-error">{error}</div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username or Phone Number</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username or phone"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register here</Link></p>
            <p style={{ marginTop: '10px' }}>
              <Link to="/forgot-password" style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'underline' }}>Forgot password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
