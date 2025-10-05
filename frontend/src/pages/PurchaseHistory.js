import React from 'react';

const PurchaseHistory = () => {
  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>🛍️ My Purchase History</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        View your verified product purchases and nutritional tracking
      </p>

      {/* Purchase Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Products Verified</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Purchases Made</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⭐</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Reviews Given</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💊</div>
            <h3 style={{ marginBottom: '5px' }}>0 mg</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Iron Consumed</p>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="card">
        <div className="card-header">Recent Purchases</div>
        <div className="card-body">
          <div className="alert alert-info">
            No purchase history yet. Start verifying products to track your purchases.
          </div>
        </div>
      </div>

      {/* Nutritional Tracking */}
      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-header">Nutritional Tracking</div>
        <div className="card-body">
          <p style={{ color: 'var(--text-secondary)' }}>
            Track your iron and nutrient intake from biofortified products. Feature coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
