import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="alert alert-error">{error || 'Product not found'}</div>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <button onClick={() => navigate('/products')} className="btn btn-outline" style={{ marginBottom: '20px' }}>
        ← Back to Products
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Product Image and QR Code */}
        <div>
          {product.product_image ? (
            <img
              src={product.product_image}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '300px',
              background: '#f0f0f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '48px' }}>🌾</span>
            </div>
          )}

          <div className="card">
            <div className="card-header">QR Code</div>
            <div className="card-body text-center">
              <div style={{
                background: '#f0f0f0',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{product.qr_code}</p>
              </div>
              <Link to={`/supply-chain/${product.qr_code}`} className="btn btn-primary" style={{ width: '100%' }}>
                View Supply Chain
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
            <h1 style={{ margin: 0 }}>{product.name}</h1>
            {product.biofortified && (
              <span style={{
                background: 'var(--success-color)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                ✓ Biofortified
              </span>
            )}
          </div>

          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">Product Information</div>
            <div className="card-body">
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <strong>Variety:</strong>
                  <p style={{ margin: '5px 0 0 0' }}>{product.variety}</p>
                </div>
                <div>
                  <strong>Iron Content:</strong>
                  <p style={{ margin: '5px 0 0 0' }}>{product.iron_content} ppm</p>
                </div>
                <div>
                  <strong>Quantity:</strong>
                  <p style={{ margin: '5px 0 0 0' }}>{product.quantity} kg</p>
                </div>
                <div>
                  <strong>Harvest Date:</strong>
                  <p style={{ margin: '5px 0 0 0' }}>{new Date(product.harvest_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <strong>Status:</strong>
                  <p style={{ margin: '5px 0 0 0', textTransform: 'capitalize' }}>{product.status}</p>
                </div>
                {product.batch && (
                  <div>
                    <strong>Batch Number:</strong>
                    <p style={{ margin: '5px 0 0 0' }}>{product.batch.batch_number}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {product.creator && (
            <div className="card" style={{ marginBottom: '20px' }}>
              <div className="card-header">Creator Information</div>
              <div className="card-body">
                <p><strong>Name:</strong> {product.creator.first_name} {product.creator.last_name}</p>
                <p><strong>Type:</strong> {product.creator.user_type}</p>
                {product.creator.cooperative_name && (
                  <p><strong>Cooperative:</strong> {product.creator.cooperative_name}</p>
                )}
              </div>
            </div>
          )}

          {product.blockchain_hash && (
            <div className="card">
              <div className="card-header">Blockchain Verification</div>
              <div className="card-body">
                <p style={{ fontSize: '12px', wordBreak: 'break-all', color: 'var(--text-secondary)' }}>
                  <strong>Transaction Hash:</strong><br />
                  {product.blockchain_hash}
                </p>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>
                  Verify on Blockchain
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
