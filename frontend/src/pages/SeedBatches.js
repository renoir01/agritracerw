import React, { useState } from 'react';

const SeedBatches = () => {
  const [formData, setFormData] = useState({
    batch_number: '',
    seed_variety: '',
    quantity: '',
    iron_content: '',
    germination_rate: '',
    production_date: '',
    certification_number: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log('Seed batch registered:', formData);
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>🌱 Seed Batch Management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Register and manage biofortified seed batches
      </p>

      {/* Register New Batch */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-header">Register New Seed Batch</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Batch Number *</label>
                <input
                  type="text"
                  name="batch_number"
                  className="form-control"
                  placeholder="e.g., SB-2025-001"
                  value={formData.batch_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Seed Variety *</label>
                <select
                  name="seed_variety"
                  className="form-control"
                  value={formData.seed_variety}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select variety</option>
                  <option value="Iron Bean">Iron Bean</option>
                  <option value="Vitamin A Maize">Vitamin A Maize</option>
                  <option value="Zinc Rice">Zinc Rice</option>
                  <option value="Iron Pearl Millet">Iron Pearl Millet</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Quantity (kg) *</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  placeholder="e.g., 1000"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Iron Content (ppm) *</label>
                <input
                  type="number"
                  name="iron_content"
                  className="form-control"
                  placeholder="e.g., 45"
                  value={formData.iron_content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Germination Rate (%) *</label>
                <input
                  type="number"
                  name="germination_rate"
                  className="form-control"
                  placeholder="e.g., 95"
                  value={formData.germination_rate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Production Date *</label>
                <input
                  type="date"
                  name="production_date"
                  className="form-control"
                  value={formData.production_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Certification Number</label>
                <input
                  type="text"
                  name="certification_number"
                  className="form-control"
                  placeholder="e.g., CERT-2025-001"
                  value={formData.certification_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Register Seed Batch
            </button>
          </form>
        </div>
      </div>

      {/* Seed Batches List */}
      <div className="card">
        <div className="card-header">My Seed Batches</div>
        <div className="card-body">
          <div className="alert alert-info">
            No seed batches registered yet. Register your first batch above.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedBatches;
