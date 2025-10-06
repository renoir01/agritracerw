import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductRegister = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    iron_content: '',
    quantity: '',
    harvest_date: '',
    biofortified: true,
    product_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('name', formData.name);
      data.append('variety', formData.variety);
      data.append('iron_content', formData.iron_content);
      data.append('quantity', formData.quantity);
      data.append('harvest_date', formData.harvest_date);
      data.append('biofortified', formData.biofortified);
      
      if (formData.product_image) {
        data.append('product_image', formData.product_image);
      }

      const response = await productAPI.createProduct(data);
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/products/${response.data.id}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register product. Please try again.');
      console.error('Product registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '40px', paddingBottom: '40px' }}>
      <h1 style={{ marginBottom: '10px' }}>Register Product</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Register your biofortified crop and generate a unique QR code for blockchain traceability.
      </p>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          ✅ Product registered successfully! Redirecting to product details...
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Iron-Rich Beans"
                required
              />
            </div>

            {/* Variety */}
            <div className="form-group">
              <label htmlFor="variety" className="form-label">
                Variety <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                id="variety"
                name="variety"
                className="form-control"
                value={formData.variety}
                onChange={handleChange}
                placeholder="e.g., Iron Bean, Orange Maize"
                required
              />
            </div>

            {/* Iron Content */}
            <div className="form-group">
              <label htmlFor="iron_content" className="form-label">
                Iron Content (ppm) <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                id="iron_content"
                name="iron_content"
                className="form-control"
                value={formData.iron_content}
                onChange={handleChange}
                placeholder="e.g., 45"
                min="0"
                max="200"
                step="0.01"
                required
              />
              <small style={{ color: '#666', fontSize: '14px' }}>
                Enter iron content in parts per million (0-200 ppm)
              </small>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantity (kg) <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 100"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Harvest Date */}
            <div className="form-group">
              <label htmlFor="harvest_date" className="form-label">
                Harvest Date <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                id="harvest_date"
                name="harvest_date"
                className="form-control"
                value={formData.harvest_date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Biofortified Checkbox */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  name="biofortified"
                  checked={formData.biofortified}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                <span>This is a biofortified product</span>
              </label>
            </div>

            {/* Product Image */}
            <div className="form-group">
              <label htmlFor="product_image" className="form-label">
                Product Image (Optional)
              </label>
              <input
                type="file"
                id="product_image"
                name="product_image"
                className="form-control"
                onChange={handleChange}
                accept="image/*"
                style={{ padding: '8px' }}
              />
              <small style={{ color: '#666', fontSize: '14px' }}>
                Upload a photo of your product (JPG, PNG, max 5MB)
              </small>
            </div>

            {/* Submit Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Registering...' : '✓ Register Product'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/products')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Information Section */}
      <div className="card" style={{ marginTop: '20px', backgroundColor: '#f8f9fa' }}>
        <div className="card-body">
          <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>📋 What Happens Next?</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>A unique QR code will be generated for your product</li>
            <li>Product data will be recorded on the blockchain</li>
            <li>You can download and print the QR code label</li>
            <li>Buyers can scan the QR code to verify authenticity</li>
            <li>The entire supply chain will be tracked transparently</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductRegister;
