import React, { useState } from 'react';

const FarmManagement = () => {
  const [farmData, setFarmData] = useState({
    farm_name: '',
    farm_size: '',
    location: '',
    soil_type: '',
    irrigation: ''
  });

  const handleChange = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Farm data:', farmData);
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>🚜 Farm Management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Manage your farm information and track activities
      </p>

      {/* Farm Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌾</div>
            <h3 style={{ marginBottom: '5px' }}>0 kg</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Harvest</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📦</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Products Registered</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💰</div>
            <h3 style={{ marginBottom: '5px' }}>0 RWF</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Revenue</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📍</div>
            <h3 style={{ marginBottom: '5px' }}>0 ha</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Farm Size</p>
          </div>
        </div>
      </div>

      {/* Farm Information */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-header">Farm Information</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Farm Name *</label>
                <input
                  type="text"
                  name="farm_name"
                  className="form-control"
                  placeholder="e.g., Green Valley Farm"
                  value={farmData.farm_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Farm Size (hectares) *</label>
                <input
                  type="number"
                  name="farm_size"
                  className="form-control"
                  placeholder="e.g., 5"
                  value={farmData.farm_size}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g., Musanze District"
                  value={farmData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Soil Type</label>
                <select
                  name="soil_type"
                  className="form-control"
                  value={farmData.soil_type}
                  onChange={handleChange}
                >
                  <option value="">Select soil type</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Loam">Loam</option>
                  <option value="Silt">Silt</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Irrigation System</label>
                <select
                  name="irrigation"
                  className="form-control"
                  value={farmData.irrigation}
                  onChange={handleChange}
                >
                  <option value="">Select irrigation</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Flood">Flood Irrigation</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Save Farm Information
            </button>
          </form>
        </div>
      </div>

      {/* Planting Calendar */}
      <div className="card">
        <div className="card-header">Planting Calendar</div>
        <div className="card-body">
          <div className="alert alert-info">
            Track your planting and harvest schedule here. Feature coming soon.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmManagement;
