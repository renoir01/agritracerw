import React from 'react';

const Dashboard = () => {
  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1>Dashboard</h1>
      <div className="alert alert-info">
        Dashboard displays user statistics, recent activities, and quick actions.
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card">
          <div className="card-header">Total Products</div>
          <div className="card-body">
            <h2>0</h2>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">Verifications</div>
          <div className="card-body">
            <h2>0</h2>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">Transactions</div>
          <div className="card-body">
            <h2>0</h2>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">Active Users</div>
          <div className="card-body">
            <h2>0</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
