import React, { useState } from 'react';

const BuyFromFarmers = () => {
  const [qrCode, setQrCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handlePurchase = (e) => {
    e.preventDefault();
    console.log('Purchase:', { qrCode, quantity, price });
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>🛒 Buy from Farmers</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Purchase biofortified products directly from farmers
      </p>

      {/* Purchase Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-header">Record New Purchase</div>
        <div className="card-body">
          <form onSubmit={handlePurchase}>
            <div className="form-group">
              <label className="form-label">Product QR Code *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Scan or enter product QR code"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                required
              />
              <small style={{ color: 'var(--text-secondary)' }}>
                Scan the farmer's product QR code to verify authenticity
              </small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Quantity (kg) *</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Purchase Price (RWF/kg) *</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ background: '#f0f9ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <strong>Total Amount:</strong> {quantity && price ? (quantity * price).toLocaleString() : '0'} RWF
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Complete Purchase
            </button>
          </form>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="card">
        <div className="card-header">Recent Purchases</div>
        <div className="card-body">
          <div className="alert alert-info">
            No purchases recorded yet. Start buying from farmers above.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyFromFarmers;
