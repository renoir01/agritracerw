import React from 'react';

const TraderInventory = () => {
  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>📦 My Inventory</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Track products bought from farmers and ready for sale
      </p>

      {/* Inventory Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
            <h3 style={{ marginBottom: '5px' }}>0 kg</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Stock</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💰</div>
            <h3 style={{ marginBottom: '5px' }}>0 RWF</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Inventory Value</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>👨‍🌾</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Suppliers</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📈</div>
            <h3 style={{ marginBottom: '5px' }}>0%</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Profit Margin</p>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="card-header">Current Stock</div>
        <div className="card-body">
          <div className="alert alert-info">
            No inventory yet. Purchase products from farmers to build your stock.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderInventory;
