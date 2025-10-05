import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { biofortified: filter === 'biofortified' } : {};
      const response = await productAPI.getProducts(params);
      setProducts(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Backend may not be running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.qr_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Products</h1>
        <Link to="/products/register" className="btn btn-primary">
          + Register New Product
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {/* Filters and Search */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, variety, or QR code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Filter by Type</label>
              <select
                className="form-control"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Products</option>
                <option value="biofortified">Biofortified Only</option>
                <option value="conventional">Conventional Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <p>No products found. {products.length === 0 ? 'Register your first product!' : 'Try adjusting your filters.'}</p>
            <Link to="/products/register" className="btn btn-primary">
              Register Product
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              {product.product_image && (
                <img
                  src={product.product_image}
                  alt={product.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                />
              )}
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>{product.name}</h3>
                  {product.biofortified && (
                    <span style={{
                      background: 'var(--success-color)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      Biofortified
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  <strong>Variety:</strong> {product.variety}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  <strong>Iron Content:</strong> {product.iron_content} ppm
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  <strong>Quantity:</strong> {product.quantity} kg
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '14px' }}>
                  <strong>QR Code:</strong> {product.qr_code}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '14px' }}>
                  <strong>Status:</strong> <span style={{ textTransform: 'capitalize' }}>{product.status}</span>
                </p>
                <Link to={`/products/${product.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
