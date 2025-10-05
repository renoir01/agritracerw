import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import { productAPI } from '../services/api';

const ProductVerify = () => {
  const [manualCode, setManualCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [useManual, setUseManual] = useState(false);
  const navigate = useNavigate();

  const verifyProduct = async (qrCode) => {
    setVerifying(true);
    setError('');
    setResult(null);

    try {
      const response = await productAPI.getProductByQRCode(qrCode);
      setResult({
        success: true,
        product: response.data,
        message: 'Product verified successfully!'
      });
    } catch (err) {
      setError('Product not found or verification failed. Please check the QR code and try again.');
      setResult({
        success: false,
        message: 'Verification failed'
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleScanSuccess = (decodedText) => {
    console.log('QR Code scanned:', decodedText);
    verifyProduct(decodedText);
  };

  const handleScanError = (error) => {
    console.error('QR Scan error:', error);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      verifyProduct(manualCode.trim());
    }
  };

  const viewProductDetails = () => {
    if (result?.product?.id) {
      navigate(`/products/${result.product.id}`);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: 'calc(100vh - 200px)', paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
          <h1 style={{ fontSize: '42px', marginBottom: '15px', color: '#2c3e50' }}>Verify Product Authenticity</h1>
          <p style={{ fontSize: '18px', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>
            Scan a QR code or enter it manually to verify product authenticity and view complete supply chain history on the blockchain
          </p>
        </div>

        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${!useManual ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setUseManual(false)}
            style={{ padding: '15px 40px', fontSize: '16px', minWidth: '200px' }}
          >
            📷 Scan QR Code
          </button>
          <button 
            className={`btn ${useManual ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setUseManual(true)}
            style={{ padding: '15px 40px', fontSize: '16px', minWidth: '200px' }}
          >
            ⌨️ Enter Manually
          </button>
        </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {result && result.success && (
        <div className="alert alert-success">
          <strong>✓ Verified!</strong> {result.message}
        </div>
      )}

      {!result && (
        <div className="card">
          <div className="card-body">
            {!useManual ? (
              <QRScanner 
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
              />
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '64px', 
                  marginBottom: '20px',
                  color: 'var(--primary-color)'
                }}>
                  🔢
                </div>
                <h3>Enter QR Code</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                  Type or paste the QR code from the product label
                </p>
                <form onSubmit={handleManualSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter QR Code (e.g., AGRI-2024-001)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      required
                      disabled={verifying}
                      style={{ textAlign: 'center', fontSize: '18px' }}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={verifying || !manualCode.trim()}
                    style={{ width: '100%' }}
                  >
                    {verifying ? 'Verifying...' : 'Verify Product'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {verifying && (
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner" style={{ margin: '20px auto' }}></div>
            <p>Verifying product on blockchain...</p>
          </div>
        </div>
      )}

      {result && result.success && result.product && (
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Product Information</span>
              {result.product.biofortified && (
                <span style={{
                  background: 'var(--success-color)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  ✓ Biofortified
                </span>
              )}
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <strong>Product Name:</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', color: 'var(--primary-color)' }}>
                  {result.product.name}
                </p>
              </div>
              <div>
                <strong>QR Code:</strong>
                <p style={{ margin: '5px 0 0 0', fontFamily: 'monospace' }}>
                  {result.product.qr_code}
                </p>
              </div>
              <div>
                <strong>Variety:</strong>
                <p style={{ margin: '5px 0 0 0' }}>{result.product.variety}</p>
              </div>
              <div>
                <strong>Iron Content:</strong>
                <p style={{ margin: '5px 0 0 0' }}>{result.product.iron_content} ppm</p>
              </div>
              <div>
                <strong>Quantity:</strong>
                <p style={{ margin: '5px 0 0 0' }}>{result.product.quantity} kg</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p style={{ margin: '5px 0 0 0', textTransform: 'capitalize' }}>
                  {result.product.status}
                </p>
              </div>
            </div>

            {result.product.blockchain_hash && (
              <div style={{ 
                background: '#f0f9ff', 
                padding: '15px', 
                borderRadius: '8px',
                borderLeft: '4px solid var(--primary-color)',
                marginBottom: '20px'
              }}>
                <strong>🔗 Blockchain Verified</strong>
                <p style={{ 
                  margin: '10px 0 0 0', 
                  fontSize: '12px', 
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  color: 'var(--text-secondary)'
                }}>
                  {result.product.blockchain_hash}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={viewProductDetails}
                className="btn btn-primary"
              >
                View Full Details
              </button>
              <button 
                onClick={() => navigate(`/supply-chain/${result.product.qr_code}`)}
                className="btn btn-secondary"
              >
                View Supply Chain
              </button>
              <button 
                onClick={() => {
                  setResult(null);
                  setManualCode('');
                }}
                className="btn btn-outline"
              >
                Verify Another Product
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-header">How to Verify</div>
        <div className="card-body">
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Scan QR Code:</strong> Use your device camera to scan the QR code on the product label
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Manual Entry:</strong> Alternatively, type the QR code manually if scanning is not available
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Verification:</strong> The system checks the blockchain for product authenticity
            </li>
            <li>
              <strong>Results:</strong> View product details, supply chain history, and blockchain verification
            </li>
          </ol>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductVerify;
