import React from 'react';

const SeedInventory = () => {
  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>📦 Seed Inventory</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Track your seed stock levels and distribution
      </p>

      {/* Inventory Summary */}
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
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
            <h3 style={{ marginBottom: '5px' }}>0 kg</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Available</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📤</div>
            <h3 style={{ marginBottom: '5px' }}>0 kg</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Distributed</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Low Stock Items</p>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="card-header">Inventory by Variety</div>
        <div className="card-body">
          <div className="alert alert-info">
            No inventory data available. Register seed batches to track inventory.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedInventory;
