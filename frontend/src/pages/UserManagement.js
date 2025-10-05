import React, { useState } from 'react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  return (
    <div className="container" style={{ maxWidth: '1400px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>👥 User Management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Manage all system users and their permissions
      </p>

      {/* User Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>👥</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Users</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>👨‍🌾</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Farmers</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🚚</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Traders</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏭</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Processors</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Consumers</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Active Today</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '15px', alignItems: 'end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Search Users</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Filter by Role</label>
              <select
                className="form-control"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="admin">Administrators</option>
                <option value="farmer">Farmers</option>
                <option value="trader">Traders</option>
                <option value="processor">Processors</option>
                <option value="consumer">Consumers</option>
                <option value="seed_producer">Seed Producers</option>
              </select>
            </div>

            <button className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>All Users</span>
          <button className="btn btn-sm btn-primary">
            + Add New User
          </button>
        </div>
        <div className="card-body">
          <div className="alert alert-info">
            No users found. Start by creating users or connect to the backend to load existing users.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
